import { useEffect, useState } from 'react'
import JsonView from 'react18-json-view'
import clsx from 'clsx'
import { useTheme } from '@/hooks/useTheme'
import { writeText } from '@/lib/clipboard'
import CopySVG from '@/svgs/copy.svg'
import CopiedSVG from '@/svgs/copied.svg'
import '@/lib/hljs'
import hljs from 'highlight.js/lib/core'

type Theme = 'default' | 'a11y' | 'github' | 'vscode' | 'atom' | 'winter-is-coming'
const themes: Theme[] = ['default', 'a11y', 'github', 'vscode', 'atom', 'winter-is-coming']
const bgColors: Record<Theme, string> = {
	default: '#FFFFFF',
	a11y: 'FEFEFE',
	github: '#FFFFFF',
	vscode: '#FEFEFE',
	atom: '#FFFFFF',
	'winter-is-coming': '#FFFFFF'
}
const bgColors_dark: Record<Theme, string> = {
	default: '#0E0832',
	a11y: '2B2B2B',
	github: '#24292E',
	vscode: '#1E1E1E',
	atom: '#282C34',
	'winter-is-coming': '#011627'
}

export default function Themes() {
	const [theme, setTheme] = useState(themes[0])
	const { theme: glabalTheme } = useTheme()
	const currentTheme =
		typeof window !== 'undefined'
			? glabalTheme === 'system'
				? window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark'
					: 'light'
				: glabalTheme
			: 'light'

	const currentBgColor = currentTheme === 'light' ? bgColors[theme] : bgColors_dark[theme]

	const [copied, setCopied] = useState(false)

	const code = `<JsonView src={json_object} theme="${theme}" />`

	const copy = () => {
		writeText(code)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const highlightedCode = hljs.highlight(code, { language: 'js' }).value

	const [_, update] = useState(0)
	useEffect(() => {
		const forceUpdate = () => update(state => ++state)

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', forceUpdate)

		return window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', forceUpdate)
	}, [])

	return (
		<>
			<h2 className='mt-20 text-lg font-medium'>Themes</h2>

			<ul className='mt-3 flex select-none flex-wrap gap-1'>
				{themes.map(item => (
					<li
						key={item}
						className={clsx(
							'cursor-pointer rounded-lg border px-2 py-1',
							theme === item && 'bg-slate-200 dark:bg-slate-700'
						)}
						onClick={() => setTheme(item)}>
						{item}
					</li>
				))}
			</ul>

			<blockquote className=' my-3 border-l-2 border-slate-400 bg-slate-50 px-4 py-2 text-sm italic dark:bg-slate-700'>
				Recommend backgroundColor: {currentBgColor}
			</blockquote>

			<div className='relative'>
				<pre
					className='my-3 overflow-auto rounded-lg border bg-slate-50 p-4 text-sm dark:bg-slate-700'
					dangerouslySetInnerHTML={{
						__html: highlightedCode
					}}
				/>

				<button onClick={copy} className='absolute right-4 top-3 rounded-lg border bg-white/50 p-1 backdrop-blur'>
					{copied ? <CopiedSVG className='h-5 w-5' /> : <CopySVG className='h-5 w-5' />}
				</button>
			</div>

			<div className='mt-2 rounded-lg border p-4 text-sm' style={{ backgroundColor: currentBgColor }}>
				<JsonView
					theme={theme}
					src={{
						string: 'string',
						number: 123456,
						boolean: false,
						null: null,
						func: function () {},
						Symbol: Symbol('JSON View'),
						obj: {
							k1: 123,
							k2: '123',
							k3: false
						},
						arr: ['string', 123456, false, null]
					}}
					customizeNode={params => {
						if (Array.isArray(params.node)) {
							return { collapsed: true }
						}
					}}
				/>
			</div>
		</>
	)
}
