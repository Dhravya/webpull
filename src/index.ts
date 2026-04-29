#!/usr/bin/env bun
import { existsSync } from "node:fs"
import { mkdir } from "node:fs/promises"
import { dirname, join } from "node:path"
import { Effect } from "effect"
import { CliError, helpText, parseArgs, readVersion } from "./cli"
import { frontmatter, type Page } from "./convert"
import { discover } from "./discover"
import { filterUrls } from "./filter"
import { defaultManifestPath, manifestDiff, readManifest, writeManifest } from "./manifest"
import { OutputPathAllocator } from "./path"
import { WorkerPool } from "./pool"
import { createUI } from "./ui"
import { write } from "./write"

const writeTextFile = async (path: string, content: string) => {
	await mkdir(dirname(path), { recursive: true })
	await Bun.write(path, content)
}

const program = Effect.gen(function* () {
	const parsed = parseArgs(process.argv.slice(2))
	if (parsed === "help") {
		console.log(helpText)
		return
	}
	if (parsed === "version") {
		console.log(readVersion())
		return
	}

	const config = parsed
	const t0 = performance.now()
	const workerCount = config.concurrency
	const pool = new WorkerPool(workerCount, {
		convertTimeoutMs: config.convertTimeoutMs,
		delayMs: config.delayMs,
		headers: config.headers,
		jobTimeoutMs: config.timeoutMs,
		respectNoindex: config.respectNoindex,
		userAgent: config.userAgent,
	})
	let interrupted = false
	let resolveInterrupted: (() => void) | undefined
	const interruptedPromise = new Promise<void>((resolve) => {
		resolveInterrupted = resolve
	})
	const onSigint = () => {
		interrupted = true
		pool.terminate()
		process.stderr.write("\n  Interrupted. Stopping workers...\n")
		resolveInterrupted?.()
	}
	process.once("SIGINT", onSigint)

	process.stderr.write(`\n  \x1b[1m⚡ webpull\x1b[0m \x1b[90m· discovering pages...\x1b[0m\n\n`)

	try {
		const discoveredUrls = yield* discover(config.url, config.max, {
			delayMs: config.delayMs,
			headers: config.headers,
			maxDepth: config.maxDepth,
			respectRobots: config.respectRobots,
			timeoutMs: config.timeoutMs,
			userAgent: config.userAgent,
		})
		const urls = filterUrls(discoveredUrls, config.include, config.exclude).slice(0, config.max)
		if (config.verbose)
			process.stderr.write(`  Discovered ${discoveredUrls.length} URLs, ${urls.length} after filters.\n`)
		if (!urls.length) {
			process.stderr.write("  No pages found.\n")
			process.exit(1)
		}
		const manifestPath = config.manifestFile ?? defaultManifestPath(config.out)
		const manifest = readManifest(manifestPath)
		const outputPaths = new OutputPathAllocator()
		for (const url of urls) {
			const outputPath = manifest.entries[url]?.outputPath
			if (outputPath) outputPaths.reserve(outputPath)
		}
		const planned = urls.map((url) => ({
			url,
			outputPath: manifest.entries[url]?.outputPath ?? outputPaths.allocate(url),
		}))
		if (config.diff) {
			const diff = manifestDiff(
				planned.map((page) => page.url),
				manifest,
			)
			console.log(JSON.stringify(diff, null, 2))
			return
		}
		const skipExisting = config.resume || config.changedOnly || !config.overwrite
		const skipped = skipExisting
			? planned
					.filter((page) => {
						const entry = manifest.entries[page.url]
						const outputPath = entry?.outputPath ?? page.outputPath
						const fileExists = existsSync(join(config.out, outputPath))
						if (config.changedOnly) return entry?.ok && fileExists
						return fileExists
					})
					.map((page) => page.url)
			: []
		const pages = skipExisting ? planned.filter((page) => !skipped.includes(page.url)) : planned
		if (config.verbose && skipped.length)
			process.stderr.write(`  Skipping ${skipped.length} existing/unchanged URLs.\n`)

		if (config.dryRun) {
			for (const url of urls) console.log(url)
			return
		}
		if (!pages.length) {
			const summary = {
				url: config.url,
				out: config.out,
				total: urls.length,
				ok: 0,
				err: 0,
				skipped: skipped.length,
				elapsedSeconds: Number(((performance.now() - t0) / 1000).toFixed(1)),
				pagesPerSecond: 0,
				failures: [],
			}
			if (config.json) console.log(JSON.stringify(summary, null, 2))
			if (!config.quiet) process.stderr.write(`  Nothing to fetch. ${skipped.length} existing files skipped.\n`)
			yield* Effect.tryPromise(() => writeManifest(manifestPath, manifest))
			return
		}

		const tDisc = performance.now()
		const total = pages.length
		const ui = config.quiet ? { finish() {}, render() {} } : createUI(config.url, config.out, workerCount)

		let ok = 0
		let err = 0
		const failures: { error: string; outputPath?: string; url: string }[] = []
		const bundlePages: { contentType?: string; markdown: string; outputPath: string; title: string; url: string }[] = []
		const recentFiles: string[] = []
		const workerStates = new Array<"idle" | "busy">(workerCount).fill("idle")
		const workerMap = new Map<number, number>()
		const writes: Promise<void>[] = []
		let lastRender = 0

		const tick = () => {
			const now = performance.now()
			if (now - lastRender < 80) return
			lastRender = now
			ui.render({ total, ok, err, elapsed: (now - tDisc) / 1000, workerStates, recentFiles })
		}

		yield* Effect.tryPromise(() => {
			const pullPromise = pool.pullAll(
				pages.map((page) => page.url),
				(idx, workerId) => {
					workerMap.set(idx, workerId)
					workerStates[workerId] = "busy"
					tick()
				},
				(result, idx, workerId) => {
					const slot = workerMap.get(idx) ?? 0
					workerStates[slot] = "idle"
					workerStates[workerId] = "idle"
					workerMap.delete(idx)

					if (result.ok) {
						const finalUrl = result.url ?? pages[idx]!.url
						const title = result.title || new URL(finalUrl).pathname
						const filepath = pages[idx]!.outputPath
						const page: Page = {
							url: finalUrl,
							title,
							contentType: result.contentType,
							description: result.description,
							fetchedAt: new Date().toISOString(),
							markdown: "",
							sourceUrl: result.sourceUrl,
							status: result.status,
						}
						page.markdown = frontmatter(page) + (result.content ?? "")

						writes.push(
							Effect.runPromise(write(page, config.out, filepath))
								.then(() => {
									ok++
									bundlePages.push({
										title,
										url: finalUrl,
										outputPath: filepath,
										markdown: page.markdown,
										contentType: result.contentType,
									})
									manifest.entries[pages[idx]!.url] = {
										url: pages[idx]!.url,
										outputPath: filepath,
										ok: true,
										title,
										status: result.status,
										contentType: result.contentType,
										fetchedAt: page.fetchedAt,
									}
									recentFiles.push(filepath)
								})
								.catch((error) => {
									err++
									const message = error instanceof Error ? error.message : String(error)
									failures.push({ url: finalUrl, outputPath: filepath, error: message })
									manifest.entries[pages[idx]!.url] = {
										url: pages[idx]!.url,
										outputPath: filepath,
										ok: false,
										error: message,
										fetchedAt: new Date().toISOString(),
									}
									if (!config.quiet) process.stderr.write(`\n  \x1b[31mwrite failed\x1b[0m ${filepath}: ${message}\n`)
								})
								.finally(tick),
						)
					} else {
						err++
						const error = result.error ?? "Unknown error"
						failures.push({ url: pages[idx]!.url, error })
						manifest.entries[pages[idx]!.url] = {
							url: pages[idx]!.url,
							outputPath: pages[idx]!.outputPath,
							ok: false,
							error,
							fetchedAt: new Date().toISOString(),
						}
					}
					tick()
				},
			)
			return Promise.race([pullPromise, interruptedPromise])
		})
		yield* Effect.tryPromise(() => Promise.all(writes).then(() => undefined))

		ui.render({ total, ok, err, elapsed: (performance.now() - tDisc) / 1000, workerStates, recentFiles })
		ui.finish()

		const elapsed = ((performance.now() - t0) / 1000).toFixed(1)
		const pps = Math.round(ok / ((performance.now() - tDisc) / 1000))
		const summary = {
			url: config.url,
			out: config.out,
			total,
			ok,
			err,
			skipped: skipped.length,
			elapsedSeconds: Number(elapsed),
			pagesPerSecond: pps,
			failures,
		}

		if (config.failuresFile) {
			yield* Effect.tryPromise(() => Bun.write(config.failuresFile!, JSON.stringify(failures, null, 2)))
		}
		if (config.singleFile) {
			yield* Effect.tryPromise(() =>
				writeTextFile(config.singleFile!, `${bundlePages.map((page) => page.markdown.trim()).join("\n\n---\n\n")}\n`),
			)
		}
		if (config.llmsTxtFile) {
			const llms = bundlePages
				.map((page) =>
					[`# ${page.title}`, `Source: ${page.url}`, "", page.markdown.replace(/^---[\s\S]*?---\n\n/, "").trim()].join(
						"\n",
					),
				)
				.join("\n\n")
			yield* Effect.tryPromise(() => writeTextFile(config.llmsTxtFile!, `${llms}\n`))
		}
		if (config.jsonlFile) {
			const jsonl = bundlePages
				.map((page) =>
					JSON.stringify({
						url: page.url,
						title: page.title,
						path: page.outputPath,
						contentType: page.contentType,
					}),
				)
				.join("\n")
			yield* Effect.tryPromise(() => writeTextFile(config.jsonlFile!, `${jsonl}\n`))
		}
		yield* Effect.tryPromise(() => writeManifest(manifestPath, manifest))
		if (config.json) console.log(JSON.stringify(summary, null, 2))
		if (config.verbose && failures.length) {
			for (const failure of failures) process.stderr.write(`  failed ${failure.url}: ${failure.error}\n`)
		}

		if (!config.quiet) {
			process.stderr.write(
				`\n  \x1b[32m\x1b[1mDone!\x1b[0m ${ok} pages in ${elapsed}s \x1b[90m(${pps} pages/sec)\x1b[0m\n`,
			)
			if (err) process.stderr.write(`  \x1b[31m${err} failed\x1b[0m\n`)
			process.stderr.write("\n")
		}
		if (interrupted) {
			process.exitCode = 130
			return
		}
	} finally {
		process.off("SIGINT", onSigint)
		pool.terminate()
	}
})

Effect.runPromise(program).catch((e) => {
	if (e instanceof CliError) {
		console.error(`Error: ${e.message}`)
		console.error(helpText)
		process.exit(1)
	}
	console.error(e)
	process.exit(1)
})
