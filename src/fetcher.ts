export interface FetchTextOptions {
	accept?: string
	delayMs?: number
	headers?: Record<string, string>
	retries?: number
	timeoutMs?: number
	userAgent?: string
}

export interface FetchTextResult {
	ok: boolean
	status: number
	text: string
	url: string
	contentType: string
}

const DEFAULT_RETRIES = 2
const DEFAULT_TIMEOUT_MS = 10_000
const DEFAULT_USER_AGENT = "webpull/0.1"

const RETRYABLE_STATUSES = new Set([408, 409, 425, 429, 500, 502, 503, 504])
const nextFetchAtByHost = new Map<string, number>()

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const waitForHostSlot = async (url: string, delayMs = 0) => {
	if (delayMs <= 0) return
	const host = new URL(url).host
	const now = Date.now()
	const nextFetchAt = nextFetchAtByHost.get(host) ?? now
	const waitMs = Math.max(0, nextFetchAt - now)
	nextFetchAtByHost.set(host, Math.max(now, nextFetchAt) + delayMs)
	if (waitMs > 0) await sleep(waitMs)
}

const retryAfterMs = (value: string | null) => {
	if (!value) return null
	const seconds = Number(value)
	if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000)

	const date = Date.parse(value)
	if (Number.isFinite(date)) return Math.max(0, date - Date.now())
	return null
}

const backoffMs = (attempt: number) => 250 * 2 ** attempt + Math.floor(Math.random() * 100)

export const fetchText = async (url: string, options: FetchTextOptions = {}): Promise<FetchTextResult> => {
	const retries = options.retries ?? DEFAULT_RETRIES
	const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS
	const headers = new Headers(options.headers)
	if (options.accept) headers.set("Accept", options.accept)
	if (!headers.has("User-Agent")) headers.set("User-Agent", options.userAgent ?? DEFAULT_USER_AGENT)

	let lastError: unknown

	for (let attempt = 0; attempt <= retries; attempt++) {
		try {
			await waitForHostSlot(url, options.delayMs)
			const res = await fetch(url, {
				redirect: "follow",
				headers,
				signal: AbortSignal.timeout(timeoutMs),
			})

			const shouldRetry = RETRYABLE_STATUSES.has(res.status) && attempt < retries
			if (shouldRetry) {
				await sleep(retryAfterMs(res.headers.get("Retry-After")) ?? backoffMs(attempt))
				continue
			}

			return {
				ok: res.ok,
				status: res.status,
				text: await res.text(),
				url: res.url,
				contentType: res.headers.get("content-type") ?? "",
			}
		} catch (error) {
			lastError = error
			if (attempt >= retries) break
			await sleep(backoffMs(attempt))
		}
	}

	throw lastError instanceof Error ? lastError : new Error(String(lastError))
}
