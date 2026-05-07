import { describe, expect, test } from "bun:test"
import { extractLinks, isAllowedByRobots, parseLocs, parseRobots } from "./discover"

describe("parseLocs", () => {
	test("parses XML loc elements and decodes entities", () => {
		expect(
			parseLocs(`
				<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
					<url><loc>https://example.com/docs/a&amp;b</loc></url>
					<url><loc>https://example.com/docs/c</loc></url>
				</urlset>
			`),
		).toEqual(["https://example.com/docs/a&b", "https://example.com/docs/c"])
	})
})

describe("robots helpers", () => {
	test("parses wildcard disallow and crawl delay", () => {
		expect(
			parseRobots(`
				User-agent: other
				Disallow: /ignored
				User-agent: *
				Disallow: /private
				Crawl-delay: 2
			`),
		).toEqual({ disallow: ["/private"], crawlDelayMs: 2000 })
	})

	test("checks path prefixes against disallow rules", () => {
		const rules = parseRobots("User-agent: *\nDisallow: /private")
		expect(isAllowedByRobots("https://example.com/docs", rules)).toBe(true)
		expect(isAllowedByRobots("https://example.com/private/page", rules)).toBe(false)
	})
})

describe("extractLinks", () => {
	test("extracts same-host anchor hrefs and ignores script text", () => {
		const html = `
			<html lang="en">
				<head><title>Links fixture</title></head>
				<body>
					<main>
						<h1>Links fixture</h1>
						<a href="/docs/a">A</a>
						<a href="https://other.example/docs/b">B</a>
						<script>const x = '<a href="/docs/from-script">bad</a>'</script>
					</main>
				</body>
			</html>
		`

		expect(extractLinks(html, new URL("https://example.com/docs/"), new Set())).toEqual(["https://example.com/docs/a"])
	})

	test("skips visited, hash-only, mailto, javascript, and ignored assets", () => {
		const html = `
			<html lang="en">
				<head><title>Ignored links fixture</title></head>
				<body>
					<main>
						<h1>Ignored links fixture</h1>
						<a href="#top">Top</a>
						<a href="mailto:test@example.com">Mail</a>
						<a href="javascript:void(0)">JS</a>
						<a href="/docs/seen">Seen</a>
						<a href="/docs/logo.png">Logo</a>
						<a href="/docs/new">New</a>
					</main>
				</body>
			</html>
		`

		expect(
			extractLinks(html, new URL("https://example.com/docs/"), new Set(["https://example.com/docs/seen"])),
		).toEqual(["https://example.com/docs/new"])
	})
})
