/**
 * Detect whether an HTML response is an SPA shell (empty body with JS rendering)
 */
export function isSPAShell(html: string): boolean {
	// Quick check: if there's substantial text content, it's not an SPA shell
	const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
	if (!bodyMatch) return false

	const bodyContent = (bodyMatch[1] ?? "")
		.replace(/<script[\s\S]*?<\/script>/gi, "")
		.replace(/<link[^>]*>/gi, "")
		.replace(/<style[\s\S]*?<\/style>/gi, "")
		.replace(/<!--[\s\S]*?-->/g, "")
		.trim()

	// Extract text content (strip all tags)
	const textContent = bodyContent.replace(/<[^>]+>/g, "").trim()

	// SPA shell: very little text content and has a root mounting div
	if (textContent.length > 200) return false

	// Check for common SPA root patterns
	const hasRootDiv =
		/<div\s+id=["'](root|app|__next|__nuxt|__svelte)["']\s*>\s*<\/div>/i.test(bodyContent) ||
		/<div\s+id=["'][^"']+["']\s*>\s*<\/div>/i.test(bodyContent)

	// Check for framework indicators in the full HTML
	const hasFrameworkScript =
		/type=["']module["']/i.test(html) ||
		/__NEXT_DATA__/.test(html) ||
		/__NUXT__/.test(html)

	return hasRootDiv && (textContent.length < 50 || hasFrameworkScript)
}

/**
 * Check if content extracted from a page is trivially empty
 */
export function isEmptyContent(content: string): boolean {
	const stripped = content.replace(/\s+/g, " ").trim()
	return stripped.length < 50
}
