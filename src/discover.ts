import { Effect } from "effect"
import { DOMParser, parseHTML } from "linkedom"
import { fetchText } from "./fetcher"

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

interface DiscoverOptions {
	headers?: Record<string, string>
	maxDepth?: number
	timeoutMs?: number
	userAgent?: string
}

const tryFetch = (url: string, options: DiscoverOptions = {}): Effect.Effect<{ text: string; url: string } | null> =>
	Effect.tryPromise(() =>
		fetchText(url, {
			headers: options.headers,
			timeoutMs: options.timeoutMs,
			userAgent: options.userAgent,
		}).then((r) => (r.ok ? { text: r.text, url: r.url } : null)),
	).pipe(Effect.catchAll(() => Effect.succeed(null)))

// --- Sitemap ---

export const parseLocs = (xml: string) => {
	const document = new DOMParser().parseFromString(xml, "text/xml")
	return [...document.querySelectorAll("loc")].map((loc) => loc.textContent.trim()).filter(Boolean)
}

const fetchSitemap = (url: string, depth = 0, options: DiscoverOptions = {}): Effect.Effect<string[], never, never> => {
	if (depth > 3) return Effect.succeed([])
	return Effect.gen(function* () {
		const r = yield* tryFetch(url, options)
		if (!r?.text.includes("<")) return []

		const locs = parseLocs(r.text)
		const isIndex = r.text.includes("<sitemapindex") || (r.text.includes("<sitemap>") && !r.text.includes("<urlset"))

		if (isIndex) {
			const nested = yield* Effect.all(
				locs.map((u) => fetchSitemap(u, depth + 1, options)),
				{ concurrency: "unbounded" },
			)
			return nested.flat()
		}
		return locs
	})
}

const sitemapFromRobots = (origin: string, options: DiscoverOptions = {}) =>
	Effect.gen(function* () {
		const r = yield* tryFetch(`${origin}/robots.txt`, options)
		if (!r) return []
		const urls = (r.text.match(/^Sitemap:\s*(.+)$/gim) ?? []).map((l) => l.replace(/^Sitemap:\s*/i, "").trim())
		if (!urls.length) return []
		const results = yield* Effect.all(
			urls.map((u) => fetchSitemap(u, 0, options)),
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

export const extractLinks = (html: string, base: URL, visited: Set<string>, scope = "/") => {
	const { document } = parseHTML(html)
	const out: string[] = []
	for (const link of document.querySelectorAll("a[href]")) {
		const href = link.getAttribute("href")
		if (!href || href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("mailto:")) continue
		try {
			const r = new URL(href, base)
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

const crawl = (base: URL, max: number, scope: string, options: DiscoverOptions = {}) =>
	Effect.gen(function* () {
		const visited = new Set<string>()
		const queue = [{ depth: 0, url: base.href }]
		const found: string[] = []

		while (queue.length > 0 && found.length < max) {
			const batch = queue.splice(0, Math.min(20, max - found.length)).filter((item) => !visited.has(item.url))
			for (const item of batch) visited.add(item.url)

			const results = yield* Effect.all(
				batch.map((item) =>
					tryFetch(item.url, options).pipe(
						Effect.map((r) => {
							if (!r?.text.includes("</html")) return { depth: item.depth, links: [] }
							found.push(r.url)
							if (options.maxDepth !== undefined && item.depth >= options.maxDepth) {
								return { depth: item.depth, links: [] }
							}
							return { depth: item.depth, links: extractLinks(r.text, base, visited, scope) }
						}),
					),
				),
				{ concurrency: 20 },
			)

			for (const { depth, links } of results) {
				for (const link of links) {
					if (!visited.has(link) && found.length + queue.length < max) queue.push({ depth: depth + 1, url: link })
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

// --- Main ---

export const discover = (baseUrl: string, max: number, options: DiscoverOptions = {}) =>
	Effect.gen(function* () {
		const res = yield* Effect.tryPromise({
			try: () =>
				fetchText(baseUrl, {
					headers: options.headers,
					timeoutMs: options.timeoutMs,
					userAgent: options.userAgent,
				}),
			catch: () => new Error(`Failed to fetch ${baseUrl}`),
		})
		if (!res.ok) return yield* Effect.fail(new Error(`HTTP ${res.status}: ${baseUrl}`))

		const actual = new URL(res.url)
		const original = new URL(baseUrl)
		const html = res.text

		if (actual.href !== original.href) process.stderr.write(`  Resolved to ${actual.href}\n`)

		const hosts = new Set([original.hostname, actual.hostname])
		const scope = getScopePath(actual.pathname)

		const origins = [...new Set([original.origin, actual.origin])]
		const basePaths = [...new Set([actual.pathname.replace(/\/[^/]*$/, "/"), "/"])]

		const strategies: Effect.Effect<string[]>[] = []
		for (const o of origins) {
			strategies.push(sitemapFromRobots(o, options))
			for (const bp of basePaths) {
				for (const name of ["sitemap.xml", "sitemap_index.xml", "sitemap-0.xml"]) {
					strategies.push(fetchSitemap(`${o}${bp}${name}`, 0, options))
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
		return yield* crawl(actual, max, scope, options)
	})
