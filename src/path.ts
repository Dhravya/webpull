import { basename, dirname, extname, join } from "node:path"

export const urlToOutputPath = (url: string): string => {
	const parsed = new URL(url)
	let pathname = decodeURIComponent(parsed.pathname)

	if (!pathname || pathname === "/") pathname = "/index"
	if (pathname.endsWith("/")) pathname += "index"

	pathname = pathname.replace(/\.html?$/i, "").replace(/^\/+/, "")
	if (!pathname.endsWith(".md")) pathname += ".md"

	return pathname
}

const addCollisionSuffix = (path: string, index: number) => {
	const dir = dirname(path)
	const ext = extname(path)
	const name = basename(path)
	const stem = ext ? name.slice(0, -ext.length) : name
	const suffixed = `${stem}_${index}${ext || ".md"}`
	return dir === "." ? suffixed : join(dir, suffixed)
}

export class OutputPathAllocator {
	private readonly used = new Set<string>()

	allocate(url: string): string {
		const base = urlToOutputPath(url)
		if (!this.used.has(base)) {
			this.used.add(base)
			return base
		}

		for (let index = 2; ; index++) {
			const candidate = addCollisionSuffix(base, index)
			if (!this.used.has(candidate)) {
				this.used.add(candidate)
				return candidate
			}
		}
	}
}
