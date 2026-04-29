import { describe, expect, test } from "bun:test"
import { OutputPathAllocator, urlToOutputPath } from "./path"

describe("urlToOutputPath", () => {
	test("maps root and directory URLs to index markdown files", () => {
		expect(urlToOutputPath("https://example.com/")).toBe("index.md")
		expect(urlToOutputPath("https://example.com/docs/")).toBe("docs/index.md")
	})

	test("strips html extensions and preserves markdown extensions", () => {
		expect(urlToOutputPath("https://example.com/docs/start.html")).toBe("docs/start.md")
		expect(urlToOutputPath("https://example.com/docs/start.htm")).toBe("docs/start.md")
		expect(urlToOutputPath("https://example.com/docs/start.md")).toBe("docs/start.md")
	})

	test("ignores query strings and fragments for the default path", () => {
		expect(urlToOutputPath("https://example.com/docs/start?utm_source=x#intro")).toBe("docs/start.md")
	})
})

describe("OutputPathAllocator", () => {
	test("suffixes colliding output paths", () => {
		const paths = new OutputPathAllocator()

		expect(paths.allocate("https://example.com/foo")).toBe("foo.md")
		expect(paths.allocate("https://example.com/foo.html")).toBe("foo_2.md")
		expect(paths.allocate("https://example.com/foo?tab=js")).toBe("foo_3.md")
	})

	test("suffixes nested collisions in the same directory", () => {
		const paths = new OutputPathAllocator()

		expect(paths.allocate("https://example.com/docs/foo")).toBe("docs/foo.md")
		expect(paths.allocate("https://example.com/docs/foo.html")).toBe("docs/foo_2.md")
	})
})
