import { useEffect, useState } from 'react'
import JsonView from 'react18-json-view'
import clsx from 'clsx'
import { useTheme } from '@/hooks/useTheme'
import { writeText } from '@/lib/clipboard'
import CopySVG from '@/svgs/copy.svg'
import CopiedSVG from '@/svgs/copied.svg'
import '@/lib/hljs'
import hljs from 'highlight.js/lib/core'
import { useMemo } from 'react'

const cssText = `.json-view {
  color: #4d4d4d;
  --json-property: #009033;
  --json-index: #676dff;
  --json-number: #676dff;
  --json-string: #b2762e;
  --json-boolean: #dc155e;
  --json-null: #dc155e;
}`

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

	const highlightedCSS = useMemo(() => {
		return hljs.highlight(cssText, { language: 'css' }).value
	}, [])
	const [copiedCSS, setCopiedCSS] = useState(false)
	const copyCSS = () => {
		writeText(cssText)
		setCopiedCSS(true)
		setTimeout(() => setCopiedCSS(false), 2000)
	}

	return (
		<>
			<h2 className='mt-20 text-lg font-medium'>Themes</h2>

			<ul className='mt-3 flex select-none flex-wrap gap-1'>
				{themes.map(item => (
					<li
						key={item}
						className={clsx(
							'cursor-pointer rounded-lg border px-2 py-1',
							theme === item && 'bg-slate-200 dark:bg-slate-600'
						)}
						onClick={() => setTheme(item)}>
						{item}
					</li>
				))}
			</ul>

			<blockquote className=' my-3 border-l-2 border-slate-400 bg-slate-50 px-4 py-2 text-sm italic dark:bg-slate-800 dark:text-white/80'>
				Recommend backgroundColor: {currentBgColor}
			</blockquote>

			<div className='relative'>
				<pre
					className='my-3 overflow-auto rounded-lg border bg-slate-50 p-4 text-sm dark:bg-slate-800 dark:text-white/80'
					dangerouslySetInnerHTML={{
						__html: highlightedCode
					}}
				/>

				<button onClick={copy} className='absolute right-4 top-3 rounded-lg border bg-white/20 p-1 backdrop-blur'>
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

			<h3 className='mt-8 text-lg font-medium'>Custom themes</h3>
			<p>Below are the default theme variables that you can easily customize to fit your needs.</p>
			<div className='relative'>
				<pre
					className='my-3 overflow-auto rounded-lg border bg-slate-50 p-4 text-sm dark:bg-slate-800 dark:text-white/80'
					dangerouslySetInnerHTML={{
						__html: highlightedCSS
					}}
				/>

				<button onClick={copyCSS} className='absolute right-4 top-3 rounded-lg border bg-white/20 p-1 backdrop-blur'>
					{copiedCSS ? <CopiedSVG className='h-5 w-5' /> : <CopySVG className='h-5 w-5' />}
				</button>
			</div>
		</>
	)
}
