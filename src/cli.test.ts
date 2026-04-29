import { describe, expect, test } from "bun:test"
import { mkdtemp, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
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
			changedOnly: false,
			concurrency: 8,
			convertTimeoutMs: 0,
			delayMs: 0,
			timeoutMs: 10_000,
			dryRun: false,
			diff: false,
			exclude: [],
			headers: {},
			include: [],
			json: false,
			jsonlFile: undefined,
			overwrite: true,
			quiet: false,
			resume: false,
			respectRobots: false,
			respectNoindex: false,
			verbose: false,
		})
	})

	test("parses output, max, concurrency, timeout, and output flags", () => {
		expect(
			parseArgs([
				"https://example.com",
				"--changed-only",
				"--diff",
				"--manifest",
				"manifest.json",
				"--out",
				"docs",
				"--max",
				"10",
				"--concurrency",
				"2",
				"--convert-timeout",
				"5000",
				"--timeout",
				"3000",
				"--delay",
				"25",
				"--dry-run",
				"--include",
				"*/docs/*",
				"--exclude",
				"*/blog/*",
				"--max-depth",
				"3",
				"--json",
				"--jsonl",
				"pages.jsonl",
				"--single-file",
				"bundle.md",
				"--llms-txt",
				"llms.txt",
				"--quiet",
				"--verbose",
				"--resume",
				"--failures",
				"failures.json",
				"--header",
				"Authorization: Bearer test",
				"--user-agent",
				"webpull-test",
				"--respect-robots",
				"--respect-noindex",
			]),
		).toMatchObject({
			url: "https://example.com/",
			max: 10,
			changedOnly: true,
			concurrency: 2,
			convertTimeoutMs: 5000,
			delayMs: 25,
			timeoutMs: 3000,
			dryRun: true,
			diff: true,
			exclude: ["*/blog/*"],
			headers: { Authorization: "Bearer test" },
			include: ["*/docs/*"],
			json: true,
			jsonlFile: expect.stringContaining("pages.jsonl"),
			manifestFile: expect.stringContaining("manifest.json"),
			maxDepth: 3,
			overwrite: false,
			quiet: true,
			resume: true,
			respectRobots: true,
			respectNoindex: true,
			singleFile: expect.stringContaining("bundle.md"),
			llmsTxtFile: expect.stringContaining("llms.txt"),
			userAgent: "webpull-test",
			verbose: true,
		})
	})

	test("rejects invalid numbers and unknown flags", () => {
		expect(() => parseArgs(["https://example.com", "--max", "abc"])).toThrow("--max must be a positive integer")
		expect(() => parseArgs(["https://example.com", "--concurrency", "0"])).toThrow(
			"--concurrency must be a positive integer",
		)
		expect(() => parseArgs(["https://example.com", "--convert-timeout", "-1"])).toThrow(
			"--convert-timeout must be a non-negative integer",
		)
		expect(() => parseArgs(["https://example.com", "--timeout", "-1"])).toThrow("--timeout must be a positive integer")
		expect(() => parseArgs(["https://example.com", "--delay", "0"])).toThrow("--delay must be a positive integer")
		expect(() => parseArgs(["https://example.com", "--header", "bad"])).toThrow(
			'--header must use "Name: value" format',
		)
		expect(() => parseArgs(["https://example.com", "--wat"])).toThrow("Unknown option: --wat")
	})

	test("loads config files with CLI overrides", async () => {
		const dir = await mkdtemp(join(tmpdir(), "webpull-config-"))
		const configPath = join(dir, "config.json")
		await writeFile(
			configPath,
			JSON.stringify({
				url: "https://configured.example",
				max: 3,
				concurrency: 2,
				include: ["*/docs/*"],
			}),
		)

		try {
			expect(parseArgs(["--config", configPath, "--max", "5"])).toMatchObject({
				url: "https://configured.example/",
				max: 5,
				concurrency: 2,
				include: ["*/docs/*"],
			})
		} finally {
			await rm(dir, { recursive: true, force: true })
		}
	})
})
