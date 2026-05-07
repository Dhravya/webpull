import { describe, expect, test } from "bun:test"
import { emptyManifest, manifestDiff } from "./manifest"

describe("manifestDiff", () => {
	test("reports added, known, and removed URLs", () => {
		const manifest = emptyManifest()
		manifest.entries["https://example.com/known"] = {
			url: "https://example.com/known",
			outputPath: "known.md",
			ok: true,
		}
		manifest.entries["https://example.com/removed"] = {
			url: "https://example.com/removed",
			outputPath: "removed.md",
			ok: true,
		}

		expect(manifestDiff(["https://example.com/known", "https://example.com/new"], manifest)).toEqual({
			added: ["https://example.com/new"],
			known: ["https://example.com/known"],
			removed: ["https://example.com/removed"],
		})
	})
})
