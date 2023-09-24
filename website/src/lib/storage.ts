export const setStorage = (key: string, value: string) => {
	if (typeof window !== 'undefined') window.localStorage.setItem(key, value)
}

export const getStorage = (key: string) => {
	if (typeof window !== 'undefined') return window.localStorage.getItem(key)
}

export const removeStorage = (key: string) => {
	if (typeof window !== 'undefined') return window.localStorage.removeItem(key)
}
