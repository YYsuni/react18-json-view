'use client'

import LightSVG from '@/svgs/light.svg'
import DarkSVG from '@/svgs/dark.svg'
import SystemSVG from '@/svgs/system.svg'
import { useEffect } from 'react'
import { setStorage } from '@/lib/storage'
import { useTheme } from '@/hooks/useTheme'
import { useState } from 'react'
import SingleLoading from './single-loading'

export default function Theme() {
	const { theme, setTheme } = useTheme()

	const [show, setShow] = useState(false)

	useEffect(() => {
		setShow(true)
	}, [])

	useEffect(() => {
		setStorage('theme', theme)

		if (theme === 'dark') {
			document.documentElement.classList.add('dark')
		} else if (theme === 'light') {
			document.documentElement.classList.remove('dark')
		} else {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.classList.add('dark')
			} else {
				document.documentElement.classList.remove('dark')
			}

			const listener = (event: MediaQueryListEvent) => {
				if (event.matches) {
					document.documentElement.classList.add('dark')
				} else {
					document.documentElement.classList.remove('dark')
				}
			}

			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener)

			return window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener)
		}
	}, [theme])

	if (show)
		return (
			<button
				onClick={() => {
					if (theme === 'light') {
						setTheme('dark')
					} else if (theme === 'dark') {
						setTheme('system')
					} else {
						setTheme('light')
					}
				}}
				className='flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300'>
				{theme === 'light' ? (
					<LightSVG className='h-4 w-4' />
				) : theme === 'dark' ? (
					<DarkSVG className='h-4 w-4' />
				) : (
					<SystemSVG className='h-4 w-4' />
				)}
			</button>
		)
	return (
		<button className='flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300'>
			<SystemSVG className='h-4 w-4' />
		</button>
	)
}
