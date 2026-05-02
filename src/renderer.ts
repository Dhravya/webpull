import { chromium, type Browser, type BrowserContext } from "playwright"

let browser: Browser | null = null
let context: BrowserContext | null = null

export async function launchBrowser(): Promise<void> {
	if (browser) return
	browser = await chromium.launch({
		headless: true,
		args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
	})
	context = await browser.newContext({
		userAgent:
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
	})
}

export async function renderPage(
	url: string,
	opts: { timeout?: number } = {},
): Promise<{ html: string; url: string } | null> {
	if (!context) await launchBrowser()
	if (!context) return null

	const page = await context.newPage()
	const timeout = opts.timeout ?? 15000

	try {
		await page.goto(url, { waitUntil: "networkidle", timeout })

		// Wait for content to appear - look for common content indicators
		await page
			.waitForSelector("main, article, [class*='content'], [class*='docs'], h1, h2", {
				timeout: 5000,
			})
			.catch(() => {})

		// Small additional wait for any lazy rendering
		await page.waitForTimeout(500)

		const html = await page.content()
		const finalUrl = page.url()
		return { html, url: finalUrl }
	} catch {
		return null
	} finally {
		await page.close()
	}
}

export async function renderPages(
	urls: string[],
	opts: { timeout?: number; concurrency?: number } = {},
): Promise<Map<string, { html: string; url: string }>> {
	if (!context) await launchBrowser()
	if (!context) return new Map()

	const results = new Map<string, { html: string; url: string }>()
	const concurrency = opts.concurrency ?? 4

	for (let i = 0; i < urls.length; i += concurrency) {
		const batch = urls.slice(i, i + concurrency)
		const batchResults = await Promise.allSettled(batch.map((u) => renderPage(u, opts)))

		for (let j = 0; j < batch.length; j++) {
			const result = batchResults[j]
			if (result?.status === "fulfilled" && result.value) {
				results.set(batch[j]!, result.value)
			}
		}
	}

	return results
}

export async function closeBrowser(): Promise<void> {
	await context?.close()
	await browser?.close()
	context = null
	browser = null
}

export function isBrowserLaunched(): boolean {
	return browser !== null
}
