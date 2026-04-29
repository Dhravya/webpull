export interface Page {
	url: string
	title: string
	markdown: string
}

const yamlString = (value: string) => JSON.stringify(value)

export const frontmatter = (title: string, url: string) =>
	`---\ntitle: ${yamlString(title)}\nurl: ${yamlString(url)}\n---\n\n`
