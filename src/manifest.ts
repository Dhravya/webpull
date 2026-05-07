import { existsSync, readFileSync } from "node:fs"
import { mkdir } from "node:fs/promises"
import { dirname, join } from "node:path"

export interface ManifestEntry {
	contentType?: string
	error?: string
	fetchedAt?: string
	ok: boolean
	outputPath: string
	status?: number
	title?: string
	url: string
}

export interface Manifest {
	createdAt: string
	entries: Record<string, ManifestEntry>
	updatedAt: string
	version: 1
}

export const defaultManifestPath = (outDir: string) => join(outDir, ".webpull-manifest.json")

export const emptyManifest = (): Manifest => {
	const now = new Date().toISOString()
	return { version: 1, createdAt: now, updatedAt: now, entries: {} }
}

export const readManifest = (path: string): Manifest => {
	if (!existsSync(path)) return emptyManifest()
	try {
		const parsed = JSON.parse(readFileSync(path, "utf8")) as Manifest
		return {
			...emptyManifest(),
			...parsed,
			entries: parsed.entries ?? {},
		}
	} catch {
		return emptyManifest()
	}
}

export const writeManifest = async (path: string, manifest: Manifest) => {
	manifest.updatedAt = new Date().toISOString()
	await mkdir(dirname(path), { recursive: true })
	await Bun.write(path, JSON.stringify(manifest, null, 2))
}

export const manifestDiff = (plannedUrls: string[], manifest: Manifest) => {
	const planned = new Set(plannedUrls)
	const known = new Set(Object.keys(manifest.entries))
	return {
		added: plannedUrls.filter((url) => !known.has(url)),
		known: plannedUrls.filter((url) => known.has(url)),
		removed: [...known].filter((url) => !planned.has(url)),
	}
}

export const ensureManifestDir = (manifestPath: string) => dirname(manifestPath)
