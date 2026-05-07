/**
 * Extract routes from JavaScript bundles for SPA sites.
 * Parses React Router, Vue Router, Next.js, and similar patterns.
 */

// Ignore routes that are clearly not content pages
const IGNORED_ROUTES = /^\/(api|_|\*|:|\.)|\.(js|css|json|ico|png|jpg|svg|woff)$/

function extractPaths(code: string): string[] {
	const paths: string[] = []
	let m: RegExpExecArray | null

	// Match path: "/docs/foo" or path: '/docs/foo' or path:
	const pathRegex = /path:\s*["'\x60](\/[^"'\x60\s]{1,200})["'\x60]/g
	for (m = pathRegex.exec(code); m !== null; m = pathRegex.exec(code)) {
		if (m[1]) paths.push(m[1])
	}

	// Match to: "/docs/foo" or to="/docs/foo" (JSX link props)
	const toRegex = /to[:=]\s*["'\x60](\/[^"'\x60\s]{1,200})["'\x60]/g
	for (m = toRegex.exec(code); m !== null; m = toRegex.exec(code)) {
		if (m[1]) paths.push(m[1])
	}

	// Match href="/docs/foo" patterns (but not assets)
	const hrefRegex = /href[:=]\s*["'\x60](\/[^"'\x60\s]{1,200})["'\x60]/g
	for (m = hrefRegex.exec(code); m !== null; m = hrefRegex.exec(code)) {
		if (m[1]) paths.push(m[1])
	}

	return paths
}

export async function extractRoutesFromBundles(jsUrls: string[], base: URL, scope: string): Promise<string[]> {
	const routes = new Set<string>()

	for (const jsUrl of jsUrls) {
		try {
			const res = await fetch(jsUrl)
			if (!res.ok) continue
			const code = await res.text()

			const paths = extractPaths(code)
			for (const path of paths) {
				// Skip dynamic routes, wildcards, and non-content paths
				if (path.includes(":") || path.includes("*")) continue
				if (IGNORED_ROUTES.test(path)) continue
				// Must be within scope
				if (scope !== "/" && !path.startsWith(scope)) continue

				try {
					const url = new URL(path, base)
					routes.add(url.href)
				} catch {}
			}
		} catch {}
	}

	return [...routes]
}

/**
 * Extract JS bundle URLs from HTML
 */
export function extractJsBundleUrls(html: string, base: URL): string[] {
	const urls: string[] = []
	const matches = html.matchAll(/src=["']([^"']*\.js)["']/gi)
	for (const m of matches) {
		try {
			const url = new URL(m[1]!, base)
			urls.push(url.href)
		} catch {}
	}
	return urls
}
