export function isObject(node: any) {
	return Object.prototype.toString.call(node) === '[object Object]'
}

export function stringifyForCopying(node: any, space?: string | number | undefined) {
	try {
		return JSON.stringify(
			node,
			(key, value) => {
				switch (typeof value) {
					case 'bigint':
						return String(value) + 'n'
					case 'number':
					case 'boolean':
					case 'object':
					case 'string':
						return value
					default:
						return String(value)
				}
			},
			space
		)
	} catch (error: any) {
		return `${error.name}: ${error.message}` || 'JSON.stringify failed'
	}
}

export function isCollapsed(
	node: Record<string, any> | Array<any>,
	depth: number,
	indexOrName: number | string | undefined,
	collapsed: Collapsed,
	collapseObjectsAfterLength: number
): boolean {
	if (collapsed === true) return true
	if (typeof collapsed === 'number' && depth > collapsed) return true

	const size = Array.isArray(node) ? node.length : isObject(node) ? Object.keys(node).length : 0

	if (typeof collapsed === 'function') {
		const result = safeCall(collapsed, [{ node, depth, indexOrName, size }])
		if (typeof result === 'boolean') return result
		else {
			console.warn('[react18-json-view collapsed]', 'The collapsed function does not return boolean correctly')
			return false
		}
	}
	if (Array.isArray(node) && size > collapseObjectsAfterLength) return true
	if (isObject(node) && size > collapseObjectsAfterLength) return true
	return false
}

export function safeCall(func: Function, params: any[]) {
	try {
		return func(...params)
	} catch (event) {
		reportError(event)
	}
}

export function editableAdd(editable: Editable) {
	if (editable === true) return true
	if (isObject(editable) && (editable as { add: boolean }).add === true) return true
}
export function editableEdit(editable: Editable) {
	if (editable === true) return true
	if (isObject(editable) && (editable as { edit: boolean }).edit === true) return true
}
export function editableDelete(editable: Editable) {
	if (editable === true) return true
	if (isObject(editable) && (editable as { delete: boolean }).delete === true) return true
}
