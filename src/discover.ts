import { Effect } from "effect"
import { DOMParser, parseHTML } from "linkedom"
import { isSPAShell } from "./detect"
import { fetchText } from "./fetcher"
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

interface DiscoverOptions {
	delayMs?: number
	headers?: Record<string, string>
	maxDepth?: number
	respectRobots?: boolean
	timeoutMs?: number
	userAgent?: string
}

const requestHeaders = (options: DiscoverOptions = {}) => {
	const headers = { ...getHeaders(), ...options.headers }
	if (options.userAgent) headers["User-Agent"] = options.userAgent
	return headers
}

const tryFetch = (url: string, options: DiscoverOptions = {}): Effect.Effect<{ text: string; url: string } | null> =>
	Effect.tryPromise(() =>
		fetchText(url, {
			delayMs: options.delayMs,
			headers: requestHeaders(options),
			timeoutMs: options.timeoutMs,
		}).then((r) => (r.ok ? { text: r.text, url: r.url } : null)),
	).pipe(Effect.catchAll(() => Effect.succeed(null)))

export const parseLocs = (xml: string) => {
	const document = new DOMParser().parseFromString(xml, "text/xml")
	return [...document.querySelectorAll("loc")].map((loc) => loc.textContent.trim()).filter(Boolean)
}

export interface RobotsRules {
	crawlDelayMs?: number
	disallow: string[]
}

export const parseRobots = (text: string): RobotsRules => {
	const rules: RobotsRules = { disallow: [] }
	let applies = false

	for (const rawLine of text.split(/\r?\n/)) {
		const line = rawLine.replace(/#.*/, "").trim()
		if (!line) continue
		const separator = line.indexOf(":")
		if (separator === -1) continue
		const field = line.slice(0, separator).trim().toLowerCase()
		const value = line.slice(separator + 1).trim()

		if (field === "user-agent") {
			applies = value === "*"
		} else if (applies && field === "disallow" && value) {
			rules.disallow.push(value)
		} else if (applies && field === "crawl-delay") {
			const seconds = Number(value)
			if (Number.isFinite(seconds) && seconds >= 0) rules.crawlDelayMs = seconds * 1000
		}
	}

	return rules
}

export const isAllowedByRobots = (url: string, rules?: RobotsRules) => {
	if (!rules) return true
	const pathname = new URL(url).pathname
	return !rules.disallow.some((rule) => pathname.startsWith(rule))
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
		if (r.text.includes("<!doctype") || r.text.includes("<html")) return []
		const urls = (r.text.match(/^Sitemap:\s*(.+)$/gim) ?? []).map((l) => l.replace(/^Sitemap:\s*/i, "").trim())
		if (!urls.length) return []
		const results = yield* Effect.all(
			urls.map((u) => fetchSitemap(u, 0, options)),
			{ concurrency: "unbounded" },
		)
		return results.flat()
	})

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

const crawl = (base: URL, max: number, scope: string, options: DiscoverOptions = {}, robots?: RobotsRules) =>
	Effect.gen(function* () {
		const visited = new Set<string>()
		const queue = [{ depth: 0, url: base.href }]
		const found: string[] = []

		while (queue.length > 0 && found.length < max) {
			const batch = queue
				.splice(0, Math.min(20, max - found.length))
				.filter((item) => !visited.has(item.url) && isAllowedByRobots(item.url, robots))
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

const getScopePath = (pathname: string) => {
	if (pathname === "/") return "/"
	if (/\.\w+$/.test(pathname)) return pathname.replace(/\/[^/]*$/, "/")
	if (pathname.endsWith("/")) return pathname
	const segs = pathname.split("/").filter(Boolean)
	return segs.length <= 1 ? pathname : `/${segs.slice(0, -1).join("/")}/`
}

const normalizeHost = (url: URL, preferredHost: string) => {
	const apex = (host: string) => host.replace(/^www\./, "")
	if (apex(url.hostname) === apex(preferredHost)) url.hostname = preferredHost
}

const filterAndDedupe = (urls: string[], hosts: Set<string>, scope: string, max: number, preferredHost?: string) => {
	const seen = new Set<string>()
	const out: string[] = []
	for (const raw of urls) {
		try {
			const u = new URL(raw)
			if (preferredHost) normalizeHost(u, preferredHost)
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

const discoverSPA = (base: URL, html: string, max: number, scope: string, hosts: Set<string>) =>
	Effect.gen(function* () {
		process.stderr.write("  Detected SPA (JavaScript-rendered site)\n")

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
				const hashLinks: string[] = []
				const hrefMatches = rendered.html.matchAll(/href=["'](#[^"'\s]+)["']/gi)
				for (const m of hrefMatches) {
					if (m[1] && m[1].length > 1) hashLinks.push(base.origin + base.pathname + m[1])
				}
				const deduped = [...new Set(hashLinks)]
				if (!deduped.includes(fullUrl)) deduped.unshift(fullUrl)
				const unique = deduped.slice(0, max)
				if (unique.length > 0) {
					process.stderr.write(`  Found ${unique.length} hash-routed pages\n`)
					return unique
				}

				const nav = yield* extractNav(new URL(rendered.url), rendered.html)
				if (nav.length > 1) {
					process.stderr.write(`  Found ${nav.length} pages from rendered navigation\n`)
					return nav.slice(0, max)
				}
			}

			return [fullUrl]
		}

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

			const links = extractLinks(rendered.html, base, new Set(), scope)
			const filtered = filterAndDedupe(links, hosts, scope, max)
			if (filtered.length > 0) {
				process.stderr.write(`  Found ${filtered.length} pages from rendered links\n`)
				return filtered
			}
		}

		process.stderr.write("  Could not discover additional pages\n")
		return [base.href]
	})

export const discover = (baseUrl: string, max: number, options: DiscoverOptions = {}) =>
	Effect.gen(function* () {
		const res = yield* Effect.tryPromise({
			try: () =>
				fetchText(baseUrl, {
					delayMs: options.delayMs,
					headers: requestHeaders(options),
					timeoutMs: options.timeoutMs,
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

		if (isSPAShell(html)) {
			const spaBase = new URL(actual.href)
			if (original.hash && !spaBase.hash) spaBase.hash = original.hash
			return yield* discoverSPA(spaBase, html, max, scope, hosts)
		}

		const origins = [...new Set([original.origin, actual.origin])]
		const basePaths = [...new Set([actual.pathname.replace(/\/[^/]*$/, "/"), "/"])]
		const robots = options.respectRobots
			? parseRobots((yield* tryFetch(`${actual.origin}/robots.txt`, options))?.text ?? "")
			: undefined
		const crawlOptions = {
			...options,
			delayMs: Math.max(options.delayMs ?? 0, robots?.crawlDelayMs ?? 0),
		}

		const strategies: Effect.Effect<string[]>[] = []
		for (const o of origins) {
			strategies.push(sitemapFromRobots(o, crawlOptions))
			for (const bp of basePaths) {
				for (const name of ["sitemap.xml", "sitemap_index.xml", "sitemap-0.xml"]) {
					strategies.push(fetchSitemap(`${o}${bp}${name}`, 0, crawlOptions))
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
			const filtered = filterAndDedupe(urls, hosts, scope, max, actual.hostname)
			if (filtered.length > best.length) best = filtered
		}

		if (best.length > 0) {
			process.stderr.write(`  Found ${best.length} pages via sitemap\n`)
			return best
		}

		process.stderr.write("  No sitemap, extracting from navigation...\n")
		const nav = yield* extractNav(actual, html)
		if (nav.length > 5) {
			const filtered = filterAndDedupe(nav, hosts, scope, max, actual.hostname)
			if (filtered.length > 0) {
				process.stderr.write(`  Found ${filtered.length} pages from navigation\n`)
				return filtered
			}
		}

		process.stderr.write("  Falling back to link crawling...\n")
		return yield* crawl(actual, max, scope, crawlOptions, robots)
	})
