import { describe, expect, test } from "bun:test"
import { mkdtemp, readFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { Effect } from "effect"
import { write } from "./write"

describe("write", () => {
	test("writes to the provided output path", async () => {
		const outDir = await mkdtemp(join(tmpdir(), "webpull-write-"))
		try {
			const fullPath = await Effect.runPromise(
				write(
					{
						url: "https://example.com/docs/start",
						title: "Start",
						markdown: "# Start\n",
					},
					outDir,
					"custom/start.md",
				),
			)

			expect(fullPath).toBe(join(outDir, "custom/start.md"))
			expect(await readFile(fullPath, "utf8")).toBe("# Start\n")
		} finally {
			await rm(outDir, { recursive: true, force: true })
		}
	})
})
