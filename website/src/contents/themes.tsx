import { useState } from 'react'
import JsonView from 'react18-json-view'
import clsx from 'clsx'
import { useTheme } from '@/hooks/useTheme'
import { writeText } from '@/lib/clipboard'
import CopySVG from '@/svgs/copy.svg'
import CopiedSVG from '@/svgs/copied.svg'

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
		glabalTheme === 'system'
			? window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'
			: glabalTheme

	const currentBgColor = currentTheme === 'light' ? bgColors[theme] : bgColors_dark[theme]

	const [copied, setCopied] = useState(false)

	const copy = (e: any) => {
		writeText(`<JsonView src={json_object} theme="${theme}" />`)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<>
			<h2 className='mt-12 text-lg font-medium'>Themes</h2>

			<ul className='flex flex-wrap gap-1 mt-3 select-none'>
				{themes.map(item => (
					<li
						key={item}
						className={clsx(
							'border rounded-lg cursor-pointer px-2 py-1',
							theme === item && 'bg-slate-200 dark:bg-slate-500'
						)}
						onClick={() => setTheme(item)}>
						{item}
					</li>
				))}
			</ul>

			<blockquote className=' bg-slate-50 border-l-2 border-slate-400 my-3 px-4 py-2 italic text-sm dark:bg-slate-500'>
				Recommend backgroundColor: {currentBgColor}
			</blockquote>

			<code
				onClick={copy}
				className='my-3 flex cursor-copy items-center text-sm justify-between rounded-lg border bg-slate-50 p-4 dark:bg-slate-500'>
				<span>{`<JsonView src={json_object} theme="${theme}" />`}</span>
				<button className='rounded-lg p-1'>
					{copied ? <CopiedSVG className='h-5 w-5' /> : <CopySVG className='h-5 w-5' />}
				</button>
			</code>

			<div className='rounded-lg border p-4 text-sm mt-2' style={{ backgroundColor: currentBgColor }}>
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
