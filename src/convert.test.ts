import { describe, expect, test } from "bun:test"
import { frontmatter } from "./convert"

describe("frontmatter", () => {
	test("escapes YAML-sensitive strings", () => {
		expect(frontmatter('A "quoted"\nTitle', "https://example.com/a?x=1&y=two")).toBe(
			'---\ntitle: "A \\"quoted\\"\\nTitle"\nurl: "https://example.com/a?x=1&y=two"\n---\n\n',
		)
	})
})
