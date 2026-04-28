export interface Page {
	url: string
	title: string
	markdown: string
}

export const frontmatter = (title: string, url: string) =>
	`---\ntitle: "${title.replace(/"/g, '\\"')}"\nurl: "${url}"\n---\n\n`
