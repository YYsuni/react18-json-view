import { writeText } from '@/lib/clipboard'
import hljs from 'highlight.js'
import { useState } from 'react'
import CopySVG from '@/svgs/copy.svg'
import CopiedSVG from '@/svgs/copied.svg'
import JsonView from 'react18-json-view'

const CODE = `<JsonView
  editable
  onAdd={params => {
    console.log('[jv onAdd]', params)
  }}
  onEdit={params => {
    console.log('[jv onEdit]', params)
  }}
  onDelete={params => {
    console.log('[jv onDelete]', params)
  }}
  src={{json_object}}
/>`

export default function Editable() {
	const [copied, setCopied] = useState(false)

	const copy = () => {
		writeText(CODE)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const highlightedCode = hljs.highlight(CODE, { language: 'js' }).value

	return (
		<>
			<h2 className='mt-20 text-lg font-medium'>Editable</h2>

			<div className='relative'>
				<code className='my-3 flex items-center justify-between overflow-auto rounded-lg border bg-slate-50 p-4 text-sm dark:bg-slate-800 dark:text-white/80'>
					<pre
						dangerouslySetInnerHTML={{
							__html: highlightedCode
						}}
					/>
				</code>
				<button onClick={copy} className='absolute right-4 top-3 rounded-lg border bg-white/20 p-1 backdrop-blur'>
					{copied ? <CopiedSVG className='h-5 w-5' /> : <CopySVG className='h-5 w-5' />}
				</button>
			</div>

			<div className='mt-2 rounded-lg border bg-white p-4 text-sm dark:bg-[#0E0832]'>
				<JsonView
					editable
					onAdd={params => {
						console.log('[jv onAdd]', params)
					}}
					onEdit={params => {
						console.log('[jv onEdit]', params)
					}}
					onDelete={params => {
						console.log('[jv onDelete]', params)
					}}
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
						largeArr: new Array(Math.trunc(Math.random() * 1000) + 800).fill((Math.random() * 10).toFixed(2))
					}}
				/>
			</div>

			<h3 className='mt-8 text-lg font-medium'>How to generate object/array</h3>
			<p>
				The editor uses eval{' '}
				<code className='mx-0.5 rounded bg-slate-200 px-1 py-0.5 font-mono text-sm dark:bg-slate-600'>
					({`<input-value>`})
				</code>
				. While in edit mode, you can enter
				<code className='mx-0.5 rounded bg-slate-200 px-1 py-0.5 font-mono text-sm dark:bg-slate-600'>{`({})`}</code> or{' '}
				<code className='mx-0.5 rounded bg-slate-200 px-1 py-0.5 font-mono text-sm dark:bg-slate-600'>{`([])`}</code>,
				which will cause the result of eval to become a new object or array.
			</p>
			<p>
				`{}` and `[]` will be auto convert to `({})`,`([])`
			</p>
			<p className='opacity-80'>
				canary:{' '}
				<code className='mx-0.5 rounded bg-slate-200 px-1 py-0.5 font-mono text-sm dark:bg-slate-600'>eval</code> ={'>'}{' '}
				<code className='mx-0.5 rounded bg-slate-200 px-1 py-0.5 font-mono text-sm dark:bg-slate-600'>JSON.parse</code>
			</p>
			<h3 className='mt-6 text-lg font-medium'>How the editor works</h3>
			<p>
				This component does not perform any cloning operations, so every step of the operation is carried out on the
				original object. If cloning is required, please handle it yourself.
			</p>
			<h3 className='mt-6 text-lg font-medium'>Edit keyboard shortcuts</h3>
			<p>When element is editable:</p>
			<ul className='pl-6'>
				<li className='list-disc'>
					<code className='mx-0.5 rounded bg-slate-200 px-1 py-0.5 font-mono text-sm dark:bg-slate-600'>{`Ctrl/Cmd+Click`}</code>{' '}
					{`=>`} Edit Mode
				</li>
				<li className='list-disc'>
					<code className='mx-0.5 rounded bg-slate-200 px-1 py-0.5 font-mono text-sm dark:bg-slate-600'>Enter</code>{' '}
					{`=>`} Submit
				</li>
				<li className='list-disc'>
					<code className='mx-0.5 rounded bg-slate-200 px-1 py-0.5 font-mono text-sm dark:bg-slate-600'>Esc</code>{' '}
					{`=>`} Cancel
				</li>
			</ul>
		</>
	)
}
