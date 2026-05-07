import { describe, expect, test } from "bun:test"
import { WorkerPool } from "./pool"

describe("WorkerPool", () => {
	test("resolves immediately for an empty URL list", async () => {
		const pool = new WorkerPool(0)
		let completed = false

		await Promise.race([
			pool
				.pullAll(
					[],
					() => {},
					() => {},
				)
				.then(() => {
					completed = true
				}),
			new Promise((_, reject) => setTimeout(() => reject(new Error("timed out")), 50)),
		])

		expect(completed).toBe(true)
		pool.terminate()
	})
})
