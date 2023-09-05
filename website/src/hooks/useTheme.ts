'use client'

import { getStorage } from '@/lib/storage'
import { create } from 'zustand'

type Theme_Type = 'system' | 'light' | 'dark'

const localTheme = (getStorage('theme') as Theme_Type) || 'system'
const themes: Theme_Type[] = ['system', 'light', 'dark']

export const useTheme = create<{
	theme: Theme_Type
	setTheme: (theme: Theme_Type) => void
}>(set => ({
	theme: themes.includes(localTheme) ? localTheme : themes[0],
	setTheme: (theme: any) => set(state => ({ ...state, theme }))
}))
