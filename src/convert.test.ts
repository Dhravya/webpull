import { describe, expect, test } from "bun:test"
import { extractHtmlMetadata, fallbackMarkdown, frontmatter } from "./convert"

describe("frontmatter", () => {
	test("escapes YAML-sensitive strings", () => {
		expect(frontmatter({ title: 'A "quoted"\nTitle', url: "https://example.com/a?x=1&y=two" })).toBe(
			'---\ntitle: "A \\"quoted\\"\\nTitle"\nurl: "https://example.com/a?x=1&y=two"\n---\n\n',
		)
	})

	test("includes optional metadata fields", () => {
		expect(
			frontmatter({
				title: "Guide",
				url: "https://example.com/final",
				sourceUrl: "https://example.com/start",
				fetchedAt: "2026-04-29T00:00:00.000Z",
				status: 200,
				contentType: "text/html",
				description: "Docs",
			}),
		).toContain('source_url: "https://example.com/start"')
	})
})

describe("fallbackMarkdown", () => {
	test("preserves common block and inline structure", () => {
		const result = fallbackMarkdown(`
			<html>
				<head><title>Guide</title></head>
				<body>
					<main>
						<h1>Guide</h1>
						<p>Read <a href="/docs">docs</a> and <strong>ship</strong>.</p>
						<ul><li>One</li><li>Two</li></ul>
						<pre><code>const ok = true</code></pre>
					</main>
				</body>
			</html>
		`)

		expect(result.title).toBe("Guide")
		expect(result.content).toContain("# Guide")
		expect(result.content).toContain("[docs](/docs)")
		expect(result.content).toContain("**ship**")
		expect(result.content).toContain("- One")
		expect(result.content).toContain("```")
	})
})

describe("extractHtmlMetadata", () => {
	test("extracts description, canonical URL, and noindex", () => {
		expect(
			extractHtmlMetadata(
				`
				<meta name="description" content="Docs">
				<meta name="robots" content="noindex, follow">
				<link rel="canonical" href="/canonical">
			`,
				"https://example.com/docs/start",
			),
		).toEqual({
			description: "Docs",
			canonicalUrl: "https://example.com/canonical",
			noindex: true,
		})
	})
})
