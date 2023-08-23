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
