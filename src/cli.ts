import { existsSync, readFileSync } from "node:fs"
import { homedir } from "node:os"
import { resolve } from "node:path"

export interface Config {
	url: string
	out: string
	max: number
	concurrency: number
	convertTimeoutMs: number
	delayMs: number
	timeoutMs: number
	dryRun: boolean
	failuresFile?: string
	exclude: string[]
	headers: Record<string, string>
	include: string[]
	json: boolean
	jsonlFile?: string
	changedOnly: boolean
	diff: boolean
	manifestFile?: string
	maxDepth?: number
	overwrite: boolean
	quiet: boolean
	resume: boolean
	respectRobots: boolean
	respectNoindex: boolean
	llmsTxtFile?: string
	singleFile?: string
	userAgent?: string
	verbose: boolean
}

export const helpText = `
  webpull - Pull docs into markdown

  Usage:  webpull <url> [options]

    -o, --out <dir>           Output directory (default: ./<hostname>)
    -m, --max <n>             Max pages (default: 500)
    -c, --concurrency <n>     Concurrent workers (default: 8)
    --convert-timeout <ms>    Defuddle timeout in ms, 0 disables (default: 0)
    --delay <ms>              Minimum delay between requests to the same host
    --timeout <ms>            Request/job timeout in ms (default: 10000)
    --dry-run                 Print discovered URLs without fetching pages
    --config <file>           Load config JSON
    --changed-only            Fetch only URLs missing from the manifest/output
    --diff                    Compare discovered URLs with the manifest and exit
    --manifest <file>         Manifest path (default: <out>/.webpull-manifest.json)
    --include <pattern>       Include only matching URLs (glob or /regex/)
    --exclude <pattern>       Exclude matching URLs (glob or /regex/)
    --max-depth <n>           Max fallback crawl depth
    --failures <file>         Write failed URLs and errors as JSON
    --header <name:value>     Add request header (repeatable)
    --user-agent <string>     Set request User-Agent
    --respect-robots          Respect robots.txt Disallow during fallback crawl
    --respect-noindex         Skip pages marked with robots noindex
    --resume                  Skip output files that already exist
    --overwrite, --force      Overwrite existing files (default)
    --json                    Print final summary as JSON
    --jsonl <file>            Write one JSON record per fetched page
    --single-file <file>      Write all fetched pages into one Markdown file
    --llms-txt <file>         Write an llms.txt-style bundle
    --quiet                   Suppress progress UI
    --verbose                 Print additional run details
    -V, --version             Print version
    -h, --help                Show help
`

export class CliError extends Error {}

type ConfigFile = Partial<
	Omit<Config, "out"> & {
		out: string
	}
>

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

const readConfigFile = (path: string): ConfigFile => {
	if (!existsSync(path)) return {}
	try {
		return JSON.parse(readFileSync(path, "utf8")) as ConfigFile
	} catch (error) {
		throw new CliError(`Failed to read config ${path}: ${error instanceof Error ? error.message : String(error)}`)
	}
}

const loadConfig = (args: string[]) => {
	const explicitConfigIndex = args.indexOf("--config")
	const explicitConfig = explicitConfigIndex >= 0 ? args[explicitConfigIndex + 1] : undefined
	if (explicitConfigIndex >= 0 && (!explicitConfig || explicitConfig.startsWith("-"))) {
		throw new CliError("Missing value for --config")
	}

	return {
		...readConfigFile(resolve(homedir(), ".webpullrc")),
		...readConfigFile(resolve("webpull.config.json")),
		...(explicitConfig ? readConfigFile(resolve(explicitConfig)) : {}),
	}
}

export const parseArgs = (args: string[]): Config | "help" | "version" => {
	if (!args.length || args.includes("-h") || args.includes("--help")) return "help"
	if (args.includes("-V") || args.includes("--version")) return "version"
	const fileConfig = loadConfig(args)

	const positional: string[] = []
	let out: string | undefined = fileConfig.out
	let max = fileConfig.max ?? 500
	let concurrency = fileConfig.concurrency ?? 8
	let convertTimeoutMs = fileConfig.convertTimeoutMs ?? 0
	let delayMs = fileConfig.delayMs ?? 0
	let timeoutMs = fileConfig.timeoutMs ?? 10_000
	let dryRun = fileConfig.dryRun ?? false
	const exclude: string[] = [...(fileConfig.exclude ?? [])]
	let failuresFile: string | undefined = fileConfig.failuresFile
	const headers: Record<string, string> = { ...(fileConfig.headers ?? {}) }
	const include: string[] = [...(fileConfig.include ?? [])]
	let json = fileConfig.json ?? false
	let jsonlFile: string | undefined = fileConfig.jsonlFile
	let changedOnly = fileConfig.changedOnly ?? false
	let diff = fileConfig.diff ?? false
	let manifestFile: string | undefined = fileConfig.manifestFile
	let maxDepth: number | undefined = fileConfig.maxDepth
	let overwrite = fileConfig.overwrite ?? true
	let quiet = fileConfig.quiet ?? false
	let resume = fileConfig.resume ?? false
	let respectRobots = fileConfig.respectRobots ?? false
	let respectNoindex = fileConfig.respectNoindex ?? false
	let llmsTxtFile: string | undefined = fileConfig.llmsTxtFile
	let singleFile: string | undefined = fileConfig.singleFile
	let userAgent: string | undefined = fileConfig.userAgent
	let verbose = fileConfig.verbose ?? false

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
		} else if (arg === "--convert-timeout") {
			if (!next) throw new CliError(`Missing value for ${arg}`)
			convertTimeoutMs = Number(next)
			if (!Number.isSafeInteger(convertTimeoutMs) || convertTimeoutMs < 0) {
				throw new CliError(`${arg} must be a non-negative integer`)
			}
			i++
		} else if (arg === "--delay") {
			delayMs = parsePositiveInt(next, arg)
			i++
		} else if (arg === "--timeout") {
			timeoutMs = parsePositiveInt(next, arg)
			i++
		} else if (arg === "--dry-run") {
			dryRun = true
		} else if (arg === "--changed-only") {
			changedOnly = true
		} else if (arg === "--diff") {
			diff = true
		} else if (arg === "--manifest") {
			if (!next || next.startsWith("-")) throw new CliError(`Missing value for ${arg}`)
			manifestFile = resolve(next)
			i++
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
		} else if (arg === "--config") {
			i++
		} else if (arg === "--json") {
			json = true
		} else if (arg === "--jsonl") {
			if (!next || next.startsWith("-")) throw new CliError(`Missing value for ${arg}`)
			jsonlFile = resolve(next)
			i++
		} else if (arg === "--single-file") {
			if (!next || next.startsWith("-")) throw new CliError(`Missing value for ${arg}`)
			singleFile = resolve(next)
			i++
		} else if (arg === "--llms-txt") {
			if (!next || next.startsWith("-")) throw new CliError(`Missing value for ${arg}`)
			llmsTxtFile = resolve(next)
			i++
		} else if (arg === "--quiet") {
			quiet = true
		} else if (arg === "--verbose") {
			verbose = true
		} else if (arg === "--resume") {
			resume = true
			overwrite = false
		} else if (arg === "--respect-robots") {
			respectRobots = true
		} else if (arg === "--respect-noindex") {
			respectNoindex = true
		} else if (arg === "--overwrite" || arg === "--force") {
			overwrite = true
		} else if (arg.startsWith("-")) {
			throw new CliError(`Unknown option: ${arg}`)
		} else {
			positional.push(arg)
		}
	}

	if (positional.length > 1) throw new CliError("Expected exactly one URL")

	let raw = positional[0] ?? fileConfig.url
	if (!raw) throw new CliError("Expected exactly one URL")
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
		convertTimeoutMs,
		delayMs,
		timeoutMs,
		dryRun,
		exclude,
		failuresFile,
		headers,
		include,
		json,
		jsonlFile,
		changedOnly,
		diff,
		manifestFile,
		maxDepth,
		overwrite,
		quiet,
		resume,
		respectRobots,
		respectNoindex,
		llmsTxtFile,
		singleFile,
		userAgent,
		verbose,
	}
}
