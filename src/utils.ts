export function isObject(node: any) {
	return Object.prototype.toString.call(node) === '[object Object]'
}
