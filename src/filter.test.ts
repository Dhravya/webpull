import { describe, expect, test } from "bun:test"
import { filterUrls, matchesPattern } from "./filter"

describe("matchesPattern", () => {
	test("supports glob and regex patterns", () => {
		expect(matchesPattern("https://example.com/docs/start", "*/docs/*")).toBe(true)
		expect(matchesPattern("https://example.com/blog/start", "*/docs/*")).toBe(false)
		expect(matchesPattern("https://example.com/docs/start", "/\\/docs\\//")).toBe(true)
	})
})

describe("filterUrls", () => {
	test("applies include before exclude", () => {
		expect(
			filterUrls(
				["https://example.com/docs/start", "https://example.com/docs/private", "https://example.com/blog/start"],
				["*/docs/*"],
				["*/private"],
			),
		).toEqual(["https://example.com/docs/start"])
	})
})
