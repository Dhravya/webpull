export interface WorkerResult {
	ok: boolean
	url?: string
	title?: string
	content?: string
	contentType?: string
	description?: string
	error?: string
	sourceUrl?: string
	status?: number
}

const WORKER_PATH = new URL("./worker.ts", import.meta.url).href

interface WorkerPoolOptions {
	convertTimeoutMs?: number
	delayMs?: number
	headers?: Record<string, string>
	jobTimeoutMs?: number
	respectNoindex?: boolean
	userAgent?: string
}

export class WorkerPool {
	private workers: Worker[]
	private readonly convertTimeoutMs: number
	private readonly delayMs: number
	private readonly headers: Record<string, string> | undefined
	private readonly jobTimeoutMs: number
	private readonly respectNoindex: boolean
	private readonly userAgent: string | undefined

	constructor(size: number, options: WorkerPoolOptions = {}) {
		this.convertTimeoutMs = options.convertTimeoutMs ?? 0
		this.delayMs = options.delayMs ?? 0
		this.headers = options.headers
		this.jobTimeoutMs = options.jobTimeoutMs ?? 30_000
		this.respectNoindex = options.respectNoindex ?? false
		this.userAgent = options.userAgent
		this.workers = Array.from({ length: size }, () => new Worker(WORKER_PATH))
	}

	pullAll(
		urls: string[],
		onStart: (index: number, workerId: number) => void,
		onDone: (result: WorkerResult, index: number, workerId: number) => void,
	): Promise<void> {
		return new Promise((resolve) => {
			let dispatched = 0
			let completed = 0
			const total = urls.length

			const finish = () => {
				if (completed === total) resolve()
			}

			const replaceWorker = (workerId: number) => {
				this.workers[workerId]?.terminate()
				const worker = new Worker(WORKER_PATH)
				this.workers[workerId] = worker
				return worker
			}

			const dispatchNext = (worker: Worker, workerId: number) => {
				if (dispatched >= total) return
				const idx = dispatched++
				onStart(idx, workerId)
				let settled = false
				let timer: ReturnType<typeof setTimeout>

				const cleanup = () => {
					clearTimeout(timer)
					worker.removeEventListener("message", onMessage)
					worker.removeEventListener("error", onError)
					worker.removeEventListener("messageerror", onMessageError)
				}

				const settle = (result: WorkerResult, nextWorker = worker) => {
					if (settled) return
					settled = true
					cleanup()
					completed++
					onDone(result, idx, workerId)
					finish()
					if (completed !== total) dispatchNext(nextWorker, workerId)
				}

				const onMessage = (e: MessageEvent<WorkerResult>) => {
					settle(e.data)
				}

				const onError = (error: ErrorEvent) => {
					const nextWorker = replaceWorker(workerId)
					settle({ ok: false, error: error.message || "Worker error" }, nextWorker)
				}

				const onMessageError = () => {
					const nextWorker = replaceWorker(workerId)
					settle({ ok: false, error: "Worker message error" }, nextWorker)
				}

				timer = setTimeout(() => {
					const nextWorker = replaceWorker(workerId)
					settle({ ok: false, error: `Worker timed out after ${this.jobTimeoutMs}ms` }, nextWorker)
				}, this.jobTimeoutMs)

				worker.addEventListener("message", onMessage)
				worker.addEventListener("error", onError)
				worker.addEventListener("messageerror", onMessageError)
				worker.postMessage({
					url: urls[idx],
					convertTimeoutMs: this.convertTimeoutMs,
					delayMs: this.delayMs,
					headers: this.headers,
					respectNoindex: this.respectNoindex,
					timeoutMs: this.jobTimeoutMs,
					userAgent: this.userAgent,
				})
			}

			for (const [workerId, worker] of this.workers.entries()) {
				if (dispatched < total) dispatchNext(worker, workerId)
			}
		})
	}

	terminate() {
		for (const w of this.workers) w.terminate()
	}
}
