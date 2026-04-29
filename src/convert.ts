import { parseHTML } from "linkedom"

export interface Page {
	url: string
	title: string
	markdown: string
	contentType?: string
	description?: string
	fetchedAt?: string
	sourceUrl?: string
	status?: number
}

const yamlString = (value: string) => JSON.stringify(value)

export const frontmatter = (page: Omit<Page, "markdown">) => {
	const lines = [`title: ${yamlString(page.title)}`, `url: ${yamlString(page.url)}`]
	if (page.sourceUrl && page.sourceUrl !== page.url) lines.push(`source_url: ${yamlString(page.sourceUrl)}`)
	if (page.fetchedAt) lines.push(`fetched_at: ${yamlString(page.fetchedAt)}`)
	if (page.status !== undefined) lines.push(`status: ${page.status}`)
	if (page.contentType) lines.push(`content_type: ${yamlString(page.contentType)}`)
	if (page.description) lines.push(`description: ${yamlString(page.description)}`)
	return `---\n${lines.join("\n")}\n---\n\n`
}

export const extractHtmlMetadata = (html: string, baseUrl: string) => {
	const { document } = parseHTML(html)
	const description = document.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() || undefined
	const robots = String(document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "").toLowerCase()
	const canonicalHref = document.querySelector('link[rel="canonical"]')?.getAttribute("href")
	let canonicalUrl: string | undefined
	if (canonicalHref) {
		try {
			canonicalUrl = new URL(canonicalHref, baseUrl).href
		} catch {}
	}
	return {
		canonicalUrl,
		description,
		noindex: robots
			.split(",")
			.map((part) => part.trim())
			.includes("noindex"),
	}
}

const normalizeText = (value: string) => value.replace(/\s+/g, " ").trim()

const markdownEscape = (value: string) => value.replace(/\\/g, "\\\\").replace(/\[/g, "\\[").replace(/\]/g, "\\]")

const inlineMarkdown = (node: any): string => {
	if (node.nodeType === 3) return normalizeText(node.textContent ?? "")
	if (node.nodeType !== 1) return ""

	const element = node
	if (element.tagName === "A") {
		const text = markdownEscape(normalizeText(element.textContent ?? ""))
		const href = element.getAttribute("href")
		return href && text ? `[${text}](${href})` : text
	}

	if (element.tagName === "CODE") return `\`${normalizeText(element.textContent ?? "")}\``
	if (element.tagName === "STRONG" || element.tagName === "B") return `**${normalizeText(element.textContent ?? "")}**`
	if (element.tagName === "EM" || element.tagName === "I") return `_${normalizeText(element.textContent ?? "")}_`

	return [...element.childNodes].map(inlineMarkdown).filter(Boolean).join(" ")
}

const blockMarkdown = (node: any): string[] => {
	if (node.nodeType !== 1) return []

	const element = node
	const tag = element.tagName
	if (/^H[1-6]$/.test(tag)) {
		const level = Number(tag.slice(1))
		return [`${"#".repeat(level)} ${normalizeText(element.textContent ?? "")}`]
	}
	if (tag === "P") return [inlineMarkdown(element)]
	if (tag === "PRE") return [`\`\`\`\n${(element.textContent ?? "").trim()}\n\`\`\``]
	if (tag === "UL" || tag === "OL") {
		return [...element.children].flatMap((child, index) => {
			const marker = tag === "OL" ? `${index + 1}.` : "-"
			return child.tagName === "LI" ? [`${marker} ${inlineMarkdown(child)}`] : []
		})
	}
	if (tag === "BLOCKQUOTE")
		return normalizeText(element.textContent ?? "") ? [`> ${normalizeText(element.textContent ?? "")}`] : []

	return [...element.children].flatMap(blockMarkdown)
}

export const fallbackMarkdown = (html: string) => {
	const { document } = parseHTML(html)
	const title = document.querySelector("title")?.textContent?.trim() ?? ""
	const description = extractHtmlMetadata(html, "https://example.com").description ?? ""
	const root = document.querySelector("main") ?? document.querySelector("article") ?? document.querySelector("body")
	const content = root ? blockMarkdown(root).filter(Boolean).join("\n\n") : ""
	return { title, description, content }
}
