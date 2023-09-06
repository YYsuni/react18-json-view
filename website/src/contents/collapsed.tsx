import { writeText } from '@/lib/clipboard'
import clsx from 'clsx'
import hljs from 'highlight.js/lib/core'
import { useState } from 'react'
import JsonView from 'react18-json-view'
import CopySVG from '@/svgs/copy.svg'
import CopiedSVG from '@/svgs/copied.svg'

type Option = '0' | '1' | '2' | '3' | 'true' | 'false' | 'function'
const options: Option[] = ['0', '1', '2', '3', 'true', 'false', 'function']

const valueMap: Record<Option, any> = {
	'0': 0,
	'1': 1,
	'2': 2,
	'3': 3,
	true: true,
	false: false,
	function: (params: any) => {
		if (params.indexOrName === 'arr') return true
		if (params.depth > 3) return true
		if (params.depth > 2 && params.size > 3) return true
		if (params.node && typeof params.node === 'object' && params.node.nest === 'over') return true
	}
}

const funcString = `(params) => {
  if (params.indexOrName === 'arr') return true
  if (params.depth > 3) return true
  if (params.depth > 2 && params.size > 3) return true
  if (params.node && typeof params.node === 'object' && params.node.nest === 'over') return true
}`

export default function Collapsed() {
	const [selected, setSelected] = useState(options[1])

	const code = `<JsonView src={json_object} collapsed={${selected === 'function' ? funcString : selected}} />`

	const [copied, setCopied] = useState(false)

	const copy = () => {
		writeText(code)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const highlightedCode = hljs.highlight(code, { language: 'js' }).value

	return (
		<>
			<h2 className='mt-12 text-lg font-medium'>Collapsed</h2>
			<ul className='flex flex-wrap gap-1 mt-3 select-none'>
				{options.map(item => (
					<li
						key={item}
						className={clsx(
							'border rounded-lg cursor-pointer px-2 py-1',
							selected === item && 'bg-slate-200 dark:bg-slate-700'
						)}
						onClick={() => setSelected(item)}>
						{item}
					</li>
				))}
			</ul>

			<div className='relative'>
				<code className='my-3 flex items-center text-sm justify-between rounded-lg border bg-slate-50 p-4 dark:bg-slate-700 overflow-auto'>
					<pre
						dangerouslySetInnerHTML={{
							__html: highlightedCode
						}}
					/>
				</code>
				<button onClick={copy} className='rounded-lg p-1 absolute top-4 right-4'>
					{copied ? <CopiedSVG className='h-5 w-5' /> : <CopySVG className='h-5 w-5' />}
				</button>
			</div>

			<div className='rounded-lg border p-4 text-sm mt-2 bg-white dark:bg-[#0E0832]'>
				<JsonView
					collapsed={valueMap[selected]}
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
						arr: ['string', 123456, false, null],
						nest: {
							nest: {
								nest: {
									nest: {
										nest: 'over'
									}
								}
							}
						}
					}}
				/>
			</div>
		</>
	)
}
