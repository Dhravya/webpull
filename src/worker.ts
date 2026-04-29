// Suppress defuddle's internal error logging
const _stderr = process.stderr.write.bind(process.stderr)
process.stderr.write = (chunk: any, ...args: any[]) => {
	if (typeof chunk === "string" && (chunk.includes("Defuddle Error") || chunk.includes("pseudo-class"))) return true
	return _stderr(chunk, ...args)
}

import { Defuddle } from "defuddle/node"
import { parseHTML } from "linkedom"
import { fetchText } from "./fetcher"

declare const self: Worker

const MARKDOWN_SIGNAL = /^(#{1,6}\s|[-*]\s|\d+\.\s|```|>\s|\[.+\]\(.+\))/m
const DEFUDDLE_TIMEOUT = 300
const MARKDOWN_CONTENT_TYPES = ["text/markdown", "text/x-markdown", "application/x-markdown"]

const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> =>
	Promise.race([promise, new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), ms))])

const fallbackExtract = (html: string) => {
	const { document } = parseHTML(html)
	const t = document.querySelector("title")?.textContent || ""
	const el = document.querySelector("main") ?? document.querySelector("article") ?? document.querySelector("body")
	return { title: t, content: el?.textContent?.replace(/\n{3,}/g, "\n\n").trim() ?? "" }
}

self.onmessage = async (
	e: MessageEvent<{ headers?: Record<string, string>; timeoutMs?: number; url: string; userAgent?: string }>,
) => {
	const { headers, timeoutMs, url, userAgent } = e.data
	try {
		const res = await fetchText(url, { accept: "text/markdown", headers, timeoutMs, userAgent })
		if (!res.ok) {
			self.postMessage({ ok: false, error: `HTTP ${res.status}: ${url}` })
			return
		}

		const text = res.text
		const finalUrl = res.url
		const ct = res.contentType

		if (
			MARKDOWN_CONTENT_TYPES.some((type) => ct.includes(type)) ||
			(!ct.includes("text/html") && MARKDOWN_SIGNAL.test(text))
		) {
			const title = text.match(/^#\s+(.+)$/m)?.[1]?.trim() || new URL(finalUrl).pathname
			self.postMessage({ ok: true, url: finalUrl, title, content: text })
			return
		}

		const cleaned = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")

		try {
			const result = await withTimeout(Defuddle(cleaned, finalUrl, { markdown: true }), DEFUDDLE_TIMEOUT)
			self.postMessage({ ok: true, url: finalUrl, title: result.title || "", content: result.content || "" })
		} catch {
			const { title, content } = fallbackExtract(cleaned)
			self.postMessage({ ok: true, url: finalUrl, title, content })
		}
	} catch (err: any) {
		self.postMessage({ ok: false, error: err?.message ?? "Unknown error" })
	}
}
