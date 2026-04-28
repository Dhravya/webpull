import { mkdir } from "node:fs/promises"
import { dirname, join } from "node:path"
import { Effect } from "effect"
import type { Page } from "./convert"

export const write = (page: Page, outDir: string) =>
	Effect.gen(function* () {
		let p = new URL(page.url).pathname
		if (p.endsWith("/")) p += "index"
		p = p.replace(/\.html?$/, "").replace(/^\//, "")
		if (!p.endsWith(".md")) p += ".md"

		const full = join(outDir, p)
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
