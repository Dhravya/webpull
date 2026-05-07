import { mkdir } from "node:fs/promises"
import { dirname, isAbsolute, join, relative, resolve } from "node:path"
import { Effect } from "effect"
import type { Page } from "./convert"
import { urlToOutputPath } from "./path"

export const write = (page: Page, outDir: string, outputPath = urlToOutputPath(page.url)) =>
	Effect.gen(function* () {
		const full = join(outDir, outputPath)
		const rel = relative(resolve(outDir), resolve(full))
		if (rel.startsWith("..") || isAbsolute(rel)) {
			return yield* Effect.fail(new Error(`path escape: ${outputPath}`))
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
