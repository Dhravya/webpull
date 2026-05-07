// Suppress defuddle's internal error logging.
const _stderr = process.stderr.write.bind(process.stderr)
process.stderr.write = (chunk: any, ...args: any[]) => {
	if (
		typeof chunk === "string" &&
		(chunk.includes("Defuddle Error") || chunk.includes("pseudo-class") || chunk.includes("Failed to parse URL"))
	) {
		return true
	}
	return _stderr(chunk, ...args)
}

import { Defuddle } from "defuddle/node"
import { extractHtmlMetadata, fallbackMarkdown } from "./convert"
import { isSPAShell } from "./detect"
import { fetchText } from "./fetcher"
import { isBrowserLaunched, launchBrowser, renderPage } from "./renderer"

declare const self: Worker

const MARKDOWN_SIGNAL = /^(#{1,6}\s|[-*]\s|\d+\.\s|```|>\s|\[.+\]\(.+\))/m
const MARKDOWN_CONTENT_TYPES = ["text/markdown", "text/x-markdown", "application/x-markdown"]
const DEFUDDLE_TIMEOUT = 5000

const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> =>
	Promise.race([promise, new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), ms))])

self.onmessage = async (
	e: MessageEvent<{
		convertTimeoutMs?: number
		delayMs?: number
		headers?: Record<string, string>
		respectNoindex?: boolean
		timeoutMs?: number
		url: string
		useBrowser?: boolean
		userAgent?: string
	}>,
) => {
	const { convertTimeoutMs, delayMs, headers, respectNoindex, timeoutMs, url, useBrowser, userAgent } = e.data
	try {
		const res = await fetchText(url, { accept: "text/markdown", delayMs, headers, timeoutMs, userAgent })
		if (!res.ok) {
			self.postMessage({ ok: false, error: `HTTP ${res.status}: ${url}` })
			return
		}

		let text = res.text
		let finalUrl = url.includes("#") ? url : res.url
		const ct = res.contentType
		const status = res.status
		const sourceUrl = url

		if (
			MARKDOWN_CONTENT_TYPES.some((type) => ct.includes(type)) ||
			(!ct.includes("text/html") && MARKDOWN_SIGNAL.test(text))
		) {
			const title = text.match(/^#\s+(.+)$/m)?.[1]?.trim() || new URL(finalUrl).pathname
			self.postMessage({ ok: true, url: finalUrl, title, content: text, contentType: ct, sourceUrl, status })
			return
		}

		if (useBrowser && isSPAShell(text)) {
			try {
				if (!isBrowserLaunched()) await launchBrowser()
				const rendered = await renderPage(finalUrl, { timeout: 20000 })
				if (rendered) text = rendered.html
			} catch {}
		}

		const cleaned = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
		const metadata = extractHtmlMetadata(cleaned, finalUrl)
		if (metadata.canonicalUrl && !url.includes("#")) finalUrl = metadata.canonicalUrl
		if (respectNoindex && metadata.noindex) {
			self.postMessage({ ok: false, error: `Skipped noindex page: ${url}` })
			return
		}
		const description = metadata.description

		try {
			const defuddle = Defuddle(cleaned, finalUrl, { markdown: true })
			const result = await withTimeout(
				defuddle,
				convertTimeoutMs && convertTimeoutMs > 0 ? convertTimeoutMs : DEFUDDLE_TIMEOUT,
			)
			self.postMessage({
				ok: true,
				url: finalUrl,
				title: result.title || "",
				content: result.content || "",
				contentType: ct,
				description,
				sourceUrl,
				status,
			})
		} catch {
			const { title, content, description: fallbackDescription } = fallbackMarkdown(cleaned)
			self.postMessage({
				ok: true,
				url: finalUrl,
				title,
				content,
				contentType: ct,
				description: description ?? fallbackDescription,
				sourceUrl,
				status,
			})
		}
	} catch (err: any) {
		self.postMessage({ ok: false, error: err?.message ?? "Unknown error" })
	}
}
