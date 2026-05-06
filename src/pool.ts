export interface WorkerResult {
	ok: boolean
	url?: string
	title?: string
	content?: string
	error?: string
}

const WORKER_PATH = new URL("./worker.ts", import.meta.url).href

export class WorkerPool {
	private workers: Worker[]
	private _useBrowser = false

	constructor(size: number) {
		this.workers = Array.from({ length: size }, () => new Worker(WORKER_PATH))
	}

	set useBrowser(val: boolean) {
		this._useBrowser = val
	}

	pullAll(
		urls: string[],
		onStart: (index: number) => void,
		onDone: (result: WorkerResult, index: number) => void,
	): Promise<void> {
		return new Promise((resolve) => {
			let dispatched = 0
			let completed = 0
			const total = urls.length

			if (total === 0) {
				resolve()
				return
			}

			const dispatchNext = (worker: Worker) => {
				if (dispatched >= total) return
				const idx = dispatched++
				onStart(idx)

				const onMessage = (e: MessageEvent<WorkerResult>) => {
					worker.removeEventListener("message", onMessage)
					completed++
					onDone(e.data, idx)
					if (completed === total) resolve()
					else dispatchNext(worker)
				}

				worker.addEventListener("message", onMessage)
				worker.postMessage({ url: urls[idx], useBrowser: this._useBrowser })
			}

			for (const w of this.workers) {
				if (dispatched < total) dispatchNext(w)
			}
		})
	}

	terminate() {
		for (const w of this.workers) w.terminate()
	}
}
