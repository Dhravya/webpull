const escapeRegex = (value: string) => value.replace(/[|\\{}()[\]^$+?.]/g, "\\$&")

export const globToRegex = (glob: string) => new RegExp(`^${glob.split("*").map(escapeRegex).join(".*")}$`)

export const matchesPattern = (value: string, pattern: string) => {
	if (pattern.startsWith("/") && pattern.endsWith("/") && pattern.length > 1) {
		return new RegExp(pattern.slice(1, -1)).test(value)
	}
	return globToRegex(pattern).test(value)
}

export const filterUrls = (urls: string[], include: string[], exclude: string[]) =>
	urls.filter((url) => {
		if (include.length && !include.some((pattern) => matchesPattern(url, pattern))) return false
		if (exclude.some((pattern) => matchesPattern(url, pattern))) return false
		return true
	})
