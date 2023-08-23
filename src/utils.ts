export function isObject(node: any) {
	return Object.prototype.toString.call(node) === '[object Object]'
}

export function stringify(node: any) {
	try {
		return JSON.stringify(node)
	} catch (_) {
		return String(node)
	}
}
