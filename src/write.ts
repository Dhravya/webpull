import { mkdir } from "node:fs/promises"
import { dirname, isAbsolute, join, relative, resolve } from "node:path"
import { Effect } from "effect"
import type { Page } from "./convert"

export const write = (page: Page, outDir: string) =>
	Effect.gen(function* () {
		const parsed = new URL(page.url)
		let p = parsed.pathname
		// Handle hash-routed URLs (e.g. #/page/export -> /page/export)
		if (parsed.hash && parsed.hash.length > 2) {
			p = parsed.hash.replace(/^#\/?/, "/")
		}
		if (p.endsWith("/")) p += "index"
		p = p.replace(/\.html?$/, "").replace(/^\//, "")
		if (!p.endsWith(".md")) p += ".md"

		const full = join(outDir, p)
		// Prevent path traversal attacks from malicious hash fragments
		const rel = relative(resolve(outDir), resolve(full))
		if (rel.startsWith("..") || isAbsolute(rel)) {
			return yield* Effect.fail(new Error(`path escape: ${p}`))
		}
		yield* Effect.tryPromise({
			try: () => mkdir(dirname(full), { recursive: true }),
			catch: () => new Error(`mkdir: ${full}`),
		})
		yield* Effect.tryPromise({
			try: () => Bun.write(full, page.markdown),
			catch: () => new Error(`write: ${full}`),
		})
		return full
	})
