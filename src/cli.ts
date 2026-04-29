import { readFileSync } from "node:fs"
import { resolve } from "node:path"

export interface Config {
	url: string
	out: string
	max: number
	concurrency: number
	timeoutMs: number
	dryRun: boolean
	failuresFile?: string
	exclude: string[]
	headers: Record<string, string>
	include: string[]
	json: boolean
	maxDepth?: number
	overwrite: boolean
	quiet: boolean
	resume: boolean
	userAgent?: string
}

export const helpText = `
  webpull - Pull docs into markdown

  Usage:  webpull <url> [options]

    -o, --out <dir>           Output directory (default: ./<hostname>)
    -m, --max <n>             Max pages (default: 500)
    -c, --concurrency <n>     Concurrent workers (default: 8)
    --timeout <ms>            Request/job timeout in ms (default: 10000)
    --dry-run                 Print discovered URLs without fetching pages
    --include <pattern>       Include only matching URLs (glob or /regex/)
    --exclude <pattern>       Exclude matching URLs (glob or /regex/)
    --max-depth <n>           Max fallback crawl depth
    --failures <file>         Write failed URLs and errors as JSON
    --header <name:value>     Add request header (repeatable)
    --user-agent <string>     Set request User-Agent
    --resume                  Skip output files that already exist
    --overwrite, --force      Overwrite existing files (default)
    --json                    Print final summary as JSON
    --quiet                   Suppress progress UI
    -V, --version             Print version
    -h, --help                Show help
`

export class CliError extends Error {}

const parsePositiveInt = (value: string | undefined, name: string) => {
	if (!value) throw new CliError(`Missing value for ${name}`)
	const parsed = Number(value)
	if (!Number.isSafeInteger(parsed) || parsed <= 0) throw new CliError(`${name} must be a positive integer`)
	return parsed
}

export const readVersion = () => {
	const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")) as {
		version?: string
	}
	return packageJson.version ?? "0.0.0"
}

export const parseArgs = (args: string[]): Config | "help" | "version" => {
	if (!args.length || args.includes("-h") || args.includes("--help")) return "help"
	if (args.includes("-V") || args.includes("--version")) return "version"

	const positional: string[] = []
	let out: string | undefined
	let max = 500
	let concurrency = 8
	let timeoutMs = 10_000
	let dryRun = false
	const exclude: string[] = []
	let failuresFile: string | undefined
	const headers: Record<string, string> = {}
	const include: string[] = []
	let json = false
	let maxDepth: number | undefined
	let overwrite = true
	let quiet = false
	let resume = false
	let userAgent: string | undefined

	for (let i = 0; i < args.length; i++) {
		const arg = args[i]!
		const next = args[i + 1]

		if (arg === "-o" || arg === "--out") {
			if (!next || next.startsWith("-")) throw new CliError(`Missing value for ${arg}`)
			out = next
			i++
		} else if (arg === "-m" || arg === "--max") {
			max = parsePositiveInt(next, arg)
			i++
		} else if (arg === "-c" || arg === "--concurrency") {
			concurrency = parsePositiveInt(next, arg)
			i++
		} else if (arg === "--timeout") {
			timeoutMs = parsePositiveInt(next, arg)
			i++
		} else if (arg === "--dry-run") {
			dryRun = true
		} else if (arg === "--include") {
			if (!next || next.startsWith("-")) throw new CliError(`Missing value for ${arg}`)
			include.push(next)
			i++
		} else if (arg === "--exclude") {
			if (!next || next.startsWith("-")) throw new CliError(`Missing value for ${arg}`)
			exclude.push(next)
			i++
		} else if (arg === "--max-depth") {
			maxDepth = parsePositiveInt(next, arg)
			i++
		} else if (arg === "--failures") {
			if (!next || next.startsWith("-")) throw new CliError(`Missing value for ${arg}`)
			failuresFile = resolve(next)
			i++
		} else if (arg === "--header") {
			if (!next || next.startsWith("-")) throw new CliError(`Missing value for ${arg}`)
			const separator = next.indexOf(":")
			if (separator <= 0) throw new CliError(`${arg} must use "Name: value" format`)
			const name = next.slice(0, separator).trim()
			const value = next.slice(separator + 1).trim()
			if (!name || !value) throw new CliError(`${arg} must use "Name: value" format`)
			headers[name] = value
			i++
		} else if (arg === "--user-agent") {
			if (!next || next.startsWith("-")) throw new CliError(`Missing value for ${arg}`)
			userAgent = next
			i++
		} else if (arg === "--json") {
			json = true
		} else if (arg === "--quiet") {
			quiet = true
		} else if (arg === "--resume") {
			resume = true
			overwrite = false
		} else if (arg === "--overwrite" || arg === "--force") {
			overwrite = true
		} else if (arg.startsWith("-")) {
			throw new CliError(`Unknown option: ${arg}`)
		} else {
			positional.push(arg)
		}
	}

	if (positional.length !== 1) throw new CliError("Expected exactly one URL")

	let raw = positional[0]!
	if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`

	let url: URL
	try {
		url = new URL(raw)
	} catch {
		throw new CliError(`Bad URL: ${positional[0]}`)
	}

	return {
		url: url.href,
		out: resolve(out ?? `./${url.hostname}`),
		max,
		concurrency,
		timeoutMs,
		dryRun,
		exclude,
		failuresFile,
		headers,
		include,
		json,
		maxDepth,
		overwrite,
		quiet,
		resume,
		userAgent,
	}
}
