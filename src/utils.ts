import type { Collapsed, CustomizeOptions, Editable } from './types'

export function isObject(node: any): node is Record<string, any> {
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
	collapseObjectsAfterLength: number,
	customOptions?: CustomizeOptions
): boolean {
	if (customOptions && customOptions.collapsed !== undefined) return !!customOptions.collapsed
	if (typeof collapsed === 'boolean') return collapsed
	if (typeof collapsed === 'number' && depth > collapsed) return true

	const size = Array.isArray(node) ? node.length : isObject(node) ? Object.keys(node).length : 0

	if (typeof collapsed === 'function') {
		const result = safeCall(collapsed, [{ node, depth, indexOrName, size }])
		if (typeof result === 'boolean') return result
	}

	if (Array.isArray(node) && size > collapseObjectsAfterLength) return true
	if (isObject(node) && size > collapseObjectsAfterLength) return true
	return false
}

export function safeCall<T extends (...args: any[]) => any>(func: T, params: Parameters<T>) {
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

function isClassComponent(component: any) {
	return typeof component === 'function' && !!component.prototype?.isReactComponent
}
export function isReactComponent(component: any): component is (new () => React.Component<any, any>) | React.FC<any> {
	return typeof component === 'function'
}

export function customAdd(customOptions?: CustomizeOptions) {
	return !customOptions || customOptions.add === undefined || !!customOptions.add
}
export function customEdit(customOptions?: CustomizeOptions) {
	return !customOptions || customOptions.edit === undefined || !!customOptions.edit
}
export function customDelete(customOptions?: CustomizeOptions) {
	return !customOptions || customOptions.delete === undefined || !!customOptions.delete
}
export function customCopy(customOptions?: CustomizeOptions) {
	return !customOptions || customOptions.enableClipboard === undefined || !!customOptions.enableClipboard
}

export function resolveEvalFailedNewValue(type: string, value: string) {
	if (type === 'string') {
		return value.trim().replace(/^\"([\s\S]+?)\"$/, '$1');
	}
	return value;
}