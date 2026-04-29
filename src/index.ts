#!/usr/bin/env bun
import { existsSync } from "node:fs"
import { join } from "node:path"
import { Effect } from "effect"
import { CliError, helpText, parseArgs, readVersion } from "./cli"
import { frontmatter } from "./convert"
import { discover } from "./discover"
import { filterUrls } from "./filter"
import { OutputPathAllocator } from "./path"
import { WorkerPool } from "./pool"
import { createUI } from "./ui"
import { write } from "./write"

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
		headers: config.headers,
		jobTimeoutMs: config.timeoutMs,
		userAgent: config.userAgent,
	})

	process.stderr.write(`\n  \x1b[1m⚡ webpull\x1b[0m \x1b[90m· discovering pages...\x1b[0m\n\n`)

	try {
		const discoveredUrls = yield* discover(config.url, config.max, {
			headers: config.headers,
			maxDepth: config.maxDepth,
			timeoutMs: config.timeoutMs,
			userAgent: config.userAgent,
		})
		const urls = filterUrls(discoveredUrls, config.include, config.exclude).slice(0, config.max)
		if (!urls.length) {
			process.stderr.write("  No pages found.\n")
			process.exit(1)
		}
		const outputPaths = new OutputPathAllocator()
		const planned = urls.map((url) => ({ url, outputPath: outputPaths.allocate(url) }))
		const skipExisting = config.resume || !config.overwrite
		const skipped = skipExisting
			? planned.filter((page) => existsSync(join(config.out, page.outputPath))).map((page) => page.url)
			: []
		const pages = skipExisting ? planned.filter((page) => !existsSync(join(config.out, page.outputPath))) : planned

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
			return
		}

		const tDisc = performance.now()
		const total = pages.length
		const ui = config.quiet ? { finish() {}, render() {} } : createUI(config.url, config.out, workerCount)

		let ok = 0
		let err = 0
		const failures: { error: string; outputPath?: string; url: string }[] = []
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

		yield* Effect.tryPromise(() =>
			pool.pullAll(
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
						const page = {
							url: finalUrl,
							title,
							markdown: frontmatter(title, finalUrl) + (result.content ?? ""),
						}

						writes.push(
							Effect.runPromise(write(page, config.out, filepath))
								.then(() => {
									ok++
									recentFiles.push(filepath)
								})
								.catch((error) => {
									err++
									const message = error instanceof Error ? error.message : String(error)
									failures.push({ url: finalUrl, outputPath: filepath, error: message })
									if (!config.quiet) process.stderr.write(`\n  \x1b[31mwrite failed\x1b[0m ${filepath}: ${message}\n`)
								})
								.finally(tick),
						)
					} else {
						err++
						failures.push({ url: pages[idx]!.url, error: result.error ?? "Unknown error" })
					}
					tick()
				},
			),
		)
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
		if (config.json) console.log(JSON.stringify(summary, null, 2))

		if (!config.quiet) {
			process.stderr.write(
				`\n  \x1b[32m\x1b[1mDone!\x1b[0m ${ok} pages in ${elapsed}s \x1b[90m(${pps} pages/sec)\x1b[0m\n`,
			)
			if (err) process.stderr.write(`  \x1b[31m${err} failed\x1b[0m\n`)
			process.stderr.write("\n")
		}
	} finally {
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
