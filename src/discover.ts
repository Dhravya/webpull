import { Effect } from "effect"
import { parseHTML } from "linkedom"
import { isSPAShell } from "./detect"
import { launchBrowser, renderPage } from "./renderer"
import { extractJsBundleUrls, extractRoutesFromBundles } from "./routes"
import { getHeaders } from "./ua"

const IGNORED = /\.(png|jpg|jpeg|gif|svg|webp|ico|pdf|zip|tar|gz|mp4|mp3|woff2?|ttf|eot|css|js|json|xml|rss|atom)$/i

const NAV_SELECTORS = [
	"nav a[href]",
	"aside a[href]",
	'[class*="sidebar"] a[href]',
	'[class*="Sidebar"] a[href]',
	'[class*="navigation"] a[href]',
	'[class*="toc"] a[href]',
	'[class*="menu"] a[href]',
	'[role="navigation"] a[href]',
]

// --- Core fetch ---

const tryFetch = (url: string): Effect.Effect<{ text: string; url: string } | null> =>
	Effect.tryPromise(() =>
		fetch(url, { redirect: "follow", headers: getHeaders() }).then(async (r) =>
			r.ok ? { text: await r.text(), url: r.url } : null,
		),
	).pipe(Effect.catchAll(() => Effect.succeed(null)))

// --- Sitemap ---

const parseLocs = (xml: string) => [...xml.matchAll(/<loc>\s*(.*?)\s*<\/loc>/gi)].map((m) => m[1]!.trim())

const fetchSitemap = (url: string, depth = 0): Effect.Effect<string[], never, never> => {
	if (depth > 3) return Effect.succeed([])
	return Effect.gen(function* () {
		const r = yield* tryFetch(url)
		if (!r?.text.includes("<")) return []

		const locs = parseLocs(r.text)
		const isIndex = r.text.includes("<sitemapindex") || (r.text.includes("<sitemap>") && !r.text.includes("<urlset"))

		if (isIndex) {
			const nested = yield* Effect.all(
				locs.map((u) => fetchSitemap(u, depth + 1)),
				{ concurrency: "unbounded" },
			)
			return nested.flat()
		}
		return locs
	})
}

const sitemapFromRobots = (origin: string) =>
	Effect.gen(function* () {
		const r = yield* tryFetch(`${origin}/robots.txt`)
		if (!r) return []
		// Validate it is actually a robots.txt (not an SPA shell returning HTML)
		if (r.text.includes("<!doctype") || r.text.includes("<html")) return []
		const urls = (r.text.match(/^Sitemap:\s*(.+)$/gim) ?? []).map((l) => l.replace(/^Sitemap:\s*/i, "").trim())
		if (!urls.length) return []
		const results = yield* Effect.all(
			urls.map((u) => fetchSitemap(u)),
			{ concurrency: "unbounded" },
		)
		return results.flat()
	})

// --- Nav extraction ---

const extractNav = (base: URL, html: string) =>
	Effect.sync(() => {
		const { document } = parseHTML(html)
		const urls = new Set<string>()

		for (const sel of NAV_SELECTORS) {
			for (const link of document.querySelectorAll(sel)) {
				const href = link.getAttribute("href")
				if (!href || href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("mailto:")) continue
				try {
					const r = new URL(href, base)
					r.hash = r.search = ""
					if (!IGNORED.test(r.pathname)) urls.add(r.href)
				} catch {}
			}
		}

		urls.add(base.href)
		return [...urls]
	})

// --- Crawl ---

const extractLinks = (html: string, base: URL, visited: Set<string>, scope: string) => {
	const out: string[] = []
	for (const m of html.matchAll(/href=["'](.*?)["']/gi)) {
		try {
			const r = new URL(m[1]!, base)
			r.hash = r.search = ""
			if (
				r.hostname === base.hostname &&
				r.pathname.startsWith(scope) &&
				!IGNORED.test(r.pathname) &&
				!visited.has(r.href)
			)
				out.push(r.href)
		} catch {}
	}
	return [...new Set(out)]
}

const crawl = (base: URL, max: number, scope: string) =>
	Effect.gen(function* () {
		const visited = new Set<string>()
		const queue = [base.href]
		const found: string[] = []

		while (queue.length > 0 && found.length < max) {
			const batch = queue.splice(0, Math.min(20, max - found.length)).filter((u) => !visited.has(u))
			for (const u of batch) visited.add(u)

			const results = yield* Effect.all(
				batch.map((url) =>
					tryFetch(url).pipe(
						Effect.map((r) => {
							if (!r?.text.includes("</html")) return []
							found.push(r.url)
							return extractLinks(r.text, base, visited, scope)
						}),
					),
				),
				{ concurrency: 20 },
			)

			for (const links of results) {
				for (const link of links) {
					if (!visited.has(link) && found.length + queue.length < max) queue.push(link)
				}
			}
		}
		return found
	})

// --- Scoping ---

const getScopePath = (pathname: string) => {
	if (pathname === "/") return "/"
	if (/\.\w+$/.test(pathname)) return pathname.replace(/\/[^/]*$/, "/")
	if (pathname.endsWith("/")) return pathname
	const segs = pathname.split("/").filter(Boolean)
	return segs.length <= 1 ? pathname : `/${segs.slice(0, -1).join("/")}/`
}

const filterAndDedupe = (urls: string[], hosts: Set<string>, scope: string, max: number) => {
	const seen = new Set<string>()
	const out: string[] = []
	for (const raw of urls) {
		try {
			const u = new URL(raw)
			if (!hosts.has(u.hostname) || !u.pathname.startsWith(scope) || IGNORED.test(u.pathname)) continue
			u.hash = u.search = ""
			if (!seen.has(u.pathname)) {
				seen.add(u.pathname)
				out.push(u.href)
			}
		} catch {}
	}
	return out.slice(0, max)
}

// --- SPA Discovery ---

const discoverSPA = (base: URL, html: string, max: number, scope: string, hosts: Set<string>) =>
	Effect.gen(function* () {
		process.stderr.write("  Detected SPA (JavaScript-rendered site)\n")

		// Check for hash-based routing (e.g. #/page/foo)
		const isHashRouter =
			base.hash.length > 1 ||
			html.includes("HashRouter") ||
			html.includes("createHashRouter") ||
			html.includes("hash-router") ||
			html.includes("#/page/")
		if (isHashRouter) {
			process.stderr.write("  Hash-based routing detected, using browser to discover pages...\n")
			const fullUrl = base.origin + base.pathname + (base.hash || "")
			const rendered = yield* Effect.tryPromise({
				try: async () => {
					await launchBrowser()
					return await renderPage(fullUrl, { timeout: 20000 })
				},
				catch: () => new Error("Browser render failed"),
			}).pipe(Effect.catchAll(() => Effect.succeed(null as { html: string; url: string } | null)))

			if (rendered) {
				// Extract hash links from rendered page
				const hashLinks: string[] = []
				const hrefMatches = rendered.html.matchAll(/href=["'](#[^"'\s]+)["']/gi)
				for (const m of hrefMatches) {
					if (m[1] && m[1].length > 1) {
						hashLinks.push(base.origin + base.pathname + m[1])
					}
				}
				const unique = [...new Set(hashLinks)].slice(0, max)
				if (unique.length > 0) {
					// Always include the originally requested URL
					if (!unique.includes(fullUrl)) unique.unshift(fullUrl)
					process.stderr.write(`  Found ${unique.length} hash-routed pages\n`)
					return unique
				}

				// Also try regular nav extraction from rendered content
				const nav = yield* extractNav(new URL(rendered.url), rendered.html)
				if (nav.length > 1) {
					process.stderr.write(`  Found ${nav.length} pages from rendered navigation\n`)
					return nav.slice(0, max)
				}
			}

			// Fallback: just return the original URL with hash
			return [fullUrl]
		}

		// Strategy 1: Extract routes from JS bundles
		const jsUrls = extractJsBundleUrls(html, base)
		if (jsUrls.length > 0) {
			process.stderr.write(`  Scanning ${jsUrls.length} JS bundle(s) for routes...\n`)
			const routes = yield* Effect.tryPromise({
				try: () => extractRoutesFromBundles(jsUrls, base, scope),
				catch: () => new Error("Route extraction failed"),
			}).pipe(Effect.catchAll(() => Effect.succeed([] as string[])))

			if (routes.length > 0) {
				const filtered = filterAndDedupe(routes, hosts, scope, max)
				if (filtered.length > 0) {
					process.stderr.write(`  Found ${filtered.length} pages from JS bundles\n`)
					return filtered
				}
			}
		}

		// Strategy 2: Render the page with headless browser and extract nav links
		process.stderr.write("  Launching headless browser for navigation extraction...\n")
		const rendered = yield* Effect.tryPromise({
			try: async () => {
				await launchBrowser()
				return await renderPage(base.href)
			},
			catch: () => new Error("Browser render failed"),
		}).pipe(Effect.catchAll(() => Effect.succeed(null as { html: string; url: string } | null)))

		if (rendered) {
			const nav = yield* extractNav(base, rendered.html)
			if (nav.length > 1) {
				const filtered = filterAndDedupe(nav, hosts, scope, max)
				if (filtered.length > 0) {
					process.stderr.write(`  Found ${filtered.length} pages from rendered navigation\n`)
					return filtered
				}
			}

			// Strategy 3: Extract all links from rendered page
			const links = extractLinks(rendered.html, base, new Set(), scope)
			const filtered = filterAndDedupe(links, hosts, scope, max)
			if (filtered.length > 0) {
				process.stderr.write(`  Found ${filtered.length} pages from rendered links\n`)
				return filtered
			}
		}

		// If all else fails, return just the base URL
		process.stderr.write("  Could not discover additional pages\n")
		return [base.href]
	})

// --- Main ---

export const discover = (baseUrl: string, max: number) =>
	Effect.gen(function* () {
		const res = yield* Effect.tryPromise({
			try: () => fetch(baseUrl, { redirect: "follow", headers: getHeaders() }),
			catch: () => new Error(`Failed to fetch ${baseUrl}`),
		})
		if (!res.ok) return yield* Effect.fail(new Error(`HTTP ${res.status}: ${baseUrl}`))

		const actual = new URL(res.url)
		const original = new URL(baseUrl)
		const html = yield* Effect.tryPromise({
			try: () => res.text(),
			catch: () => new Error("Failed to read response"),
		})

		if (actual.href !== original.href) process.stderr.write(`  Resolved to ${actual.href}\n`)

		const hosts = new Set([original.hostname, actual.hostname])
		const scope = getScopePath(actual.pathname)

		// --- SPA Detection ---
		if (isSPAShell(html)) {
			// Preserve hash fragment from original URL for hash-routed SPAs
			const spaBase = new URL(actual.href)
			if (original.hash && !spaBase.hash) spaBase.hash = original.hash
			return yield* discoverSPA(spaBase, html, max, scope, hosts)
		}

		const origins = [...new Set([original.origin, actual.origin])]
		const basePaths = [...new Set([actual.pathname.replace(/\/[^/]*$/, "/"), "/"])]

		const strategies: Effect.Effect<string[]>[] = []
		for (const o of origins) {
			strategies.push(sitemapFromRobots(o))
			for (const bp of basePaths) {
				for (const name of ["sitemap.xml", "sitemap_index.xml", "sitemap-0.xml"]) {
					strategies.push(fetchSitemap(`${o}${bp}${name}`))
				}
			}
		}

		const results = yield* Effect.all(strategies, { concurrency: "unbounded" })

		let best: string[] = []
		for (const urls of results) {
			if (!urls.length) continue
			for (const u of urls) {
				try {
					hosts.add(new URL(u).hostname)
				} catch {}
			}
			const filtered = filterAndDedupe(urls, hosts, scope, max)
			if (filtered.length > best.length) best = filtered
		}

		if (best.length > 0) {
			process.stderr.write(`  Found ${best.length} pages via sitemap\n`)
			return best
		}

		process.stderr.write("  No sitemap, extracting from navigation...\n")
		const nav = yield* extractNav(actual, html)
		if (nav.length > 5) {
			const filtered = filterAndDedupe(nav, hosts, scope, max)
			if (filtered.length > 0) {
				process.stderr.write(`  Found ${filtered.length} pages from navigation\n`)
				return filtered
			}
		}

		process.stderr.write("  Falling back to link crawling...\n")
		return yield* crawl(actual, max, scope)
	})
