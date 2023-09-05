export async function writeText(text: string) {
	try {
		await navigator.clipboard.writeText(text)
	} catch (err) {
		reportError('NotAllowedError: Write permission denied.')
	}
}

export async function readText() {
	try {
		await navigator.clipboard.readText()
	} catch (err) {
		reportError('NotAllowedError: Read permission denied.')
	}
}
