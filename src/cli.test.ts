import { describe, expect, test } from "bun:test"
import { parseArgs } from "./cli"

describe("parseArgs", () => {
	test("returns help and version sentinels", () => {
		expect(parseArgs([])).toBe("help")
		expect(parseArgs(["--help"])).toBe("help")
		expect(parseArgs(["--version"])).toBe("version")
	})

	test("normalizes URL and defaults", () => {
		expect(parseArgs(["example.com/docs"])).toMatchObject({
			url: "https://example.com/docs",
			max: 500,
			concurrency: 8,
			timeoutMs: 10_000,
			dryRun: false,
			exclude: [],
			headers: {},
			include: [],
			json: false,
			overwrite: true,
			quiet: false,
			resume: false,
		})
	})

	test("parses output, max, concurrency, timeout, and output flags", () => {
		expect(
			parseArgs([
				"https://example.com",
				"--out",
				"docs",
				"--max",
				"10",
				"--concurrency",
				"2",
				"--timeout",
				"3000",
				"--dry-run",
				"--include",
				"*/docs/*",
				"--exclude",
				"*/blog/*",
				"--max-depth",
				"3",
				"--json",
				"--quiet",
				"--resume",
				"--failures",
				"failures.json",
				"--header",
				"Authorization: Bearer test",
				"--user-agent",
				"webpull-test",
			]),
		).toMatchObject({
			url: "https://example.com/",
			max: 10,
			concurrency: 2,
			timeoutMs: 3000,
			dryRun: true,
			exclude: ["*/blog/*"],
			headers: { Authorization: "Bearer test" },
			include: ["*/docs/*"],
			json: true,
			maxDepth: 3,
			overwrite: false,
			quiet: true,
			resume: true,
			userAgent: "webpull-test",
		})
	})

	test("rejects invalid numbers and unknown flags", () => {
		expect(() => parseArgs(["https://example.com", "--max", "abc"])).toThrow("--max must be a positive integer")
		expect(() => parseArgs(["https://example.com", "--concurrency", "0"])).toThrow(
			"--concurrency must be a positive integer",
		)
		expect(() => parseArgs(["https://example.com", "--timeout", "-1"])).toThrow("--timeout must be a positive integer")
		expect(() => parseArgs(["https://example.com", "--header", "bad"])).toThrow(
			'--header must use "Name: value" format',
		)
		expect(() => parseArgs(["https://example.com", "--wat"])).toThrow("Unknown option: --wat")
	})
})
