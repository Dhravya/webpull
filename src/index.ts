#!/usr/bin/env bun
import { cpus } from "node:os"
import { resolve } from "node:path"
import { Effect } from "effect"
import { frontmatter } from "./convert"
import { isSPAShell } from "./detect"
import { discover } from "./discover"
import { WorkerPool } from "./pool"
import { closeBrowser } from "./renderer"
import { createUI } from "./ui"
import { write } from "./write"

interface Config {
	url: string
	out: string
	max: number
}

const parseArgs = (args: string[]): Config => {
	if (!args.length || args.includes("-h") || args.includes("--help")) {
		console.log(`
  webpull - Pull docs into markdown

  Usage:  webpull <url> [options]

    -o, --out <dir>   Output directory (default: ./<hostname>)
    -m, --max <n>     Max pages (default: 500)
`)
		process.exit(0)
	}

	let raw = args[0]!
	if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`

	let url: URL
	try {
		url = new URL(raw)
	} catch {
		console.error(`Bad URL: ${args[0]}`)
		process.exit(1)
	}

	let out = `./${url.hostname}`
	let max = 500

	for (let i = 1; i < args.length; i++) {
		const arg = args[i]
		const next = args[i + 1]
		if (("-o" === arg || "--out" === arg) && next) {
			out = next
			i++
		} else if (("-m" === arg || "--max" === arg) && next) {
			max = +next
			i++
		}
	}

	return { url: url.href, out: resolve(out), max }
}

const program = Effect.gen(function* () {
	const config = parseArgs(process.argv.slice(2))
	const t0 = performance.now()
	let workerCount = Math.max(8, cpus().length * 2)
	let pool: WorkerPool | null = null

	process.stderr.write(`\n  \x1b[1m⚡ webpull\x1b[0m \x1b[90m· discovering pages...\x1b[0m\n\n`)

	try {
		const urls = yield* discover(config.url, config.max)
		if (!urls.length) {
			process.stderr.write("  No pages found.\n")
			process.exit(1)
		}

		// Detect if we need browser rendering for content extraction
		const sampleHtml = yield* Effect.tryPromise({
			try: () => fetch(config.url, { redirect: "follow" }).then((r) => r.text()),
			catch: () => new Error("Failed to detect SPA"),
		}).pipe(Effect.catchAll(() => Effect.succeed("")))
		const needsBrowser = isSPAShell(sampleHtml)
		if (needsBrowser) {
			// Limit concurrency to avoid spawning too many Chromium instances
			workerCount = Math.min(workerCount, 4)
		}

		const activePool = new WorkerPool(workerCount)
		if (needsBrowser) activePool.useBrowser = true
		pool = activePool

		const tDisc = performance.now()
		const total = urls.length
		const ui = createUI(config.url, config.out, workerCount)

		let ok = 0
		let err = 0
		const recentFiles: string[] = []
		const workerStates = new Array<"idle" | "busy">(workerCount).fill("idle")
		const workerMap = new Map<number, number>()
		let nextSlot = 0
		let lastRender = 0

		const tick = () => {
			const now = performance.now()
			if (now - lastRender < 80) return
			lastRender = now
			ui.render({ total, ok, err, elapsed: (now - tDisc) / 1000, workerStates, recentFiles })
		}

		yield* Effect.tryPromise(() =>
			activePool.pullAll(
				urls,
				(idx) => {
					const slot = nextSlot++ % workerCount
					workerMap.set(idx, slot)
					workerStates[slot] = "busy"
					tick()
				},
				(result, idx) => {
					const slot = workerMap.get(idx) ?? 0
					workerStates[slot] = "idle"
					workerMap.delete(idx)

					if (result.ok) {
						ok++
						const finalUrl = result.url ?? urls[idx]!
						const title = result.title || new URL(finalUrl).pathname
						const page = {
							url: finalUrl,
							title,
							markdown: frontmatter(title, finalUrl) + (result.content ?? ""),
						}

						const parsedUrl = new URL(finalUrl)
						let filepath = parsedUrl.pathname
						// Handle hash-routed URLs (e.g. #/page/export -> page/export)
						if (parsedUrl.hash && parsedUrl.hash.length > 1) {
							filepath = parsedUrl.hash.replace(/^#\/?/, "/")
						}
						if (filepath.endsWith("/")) filepath += "index"
						filepath = filepath.replace(/\.html?$/, "").replace(/^\//, "")
						if (!filepath.endsWith(".md")) filepath += ".md"
						recentFiles.push(filepath)

						Effect.runPromise(write(page, config.out))
					} else {
						err++
					}
					tick()
				},
			),
		)

		ui.render({ total, ok, err, elapsed: (performance.now() - tDisc) / 1000, workerStates, recentFiles })
		ui.finish()

		const elapsed = ((performance.now() - t0) / 1000).toFixed(1)
		const pps = Math.round(ok / ((performance.now() - tDisc) / 1000))

		process.stderr.write(
			`\n  \x1b[32m\x1b[1mDone!\x1b[0m ${ok} pages in ${elapsed}s \x1b[90m(${pps} pages/sec)\x1b[0m\n`,
		)
		if (err) process.stderr.write(`  \x1b[31m${err} failed\x1b[0m\n`)
		process.stderr.write("\n")
	} finally {
		pool?.terminate()
	}
})

Effect.runPromise(program)
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(() => closeBrowser())
