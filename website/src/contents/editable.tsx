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
			<h2 className='mt-12 text-lg font-medium'>Editable</h2>

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
						arr: ['string', 123456, false, null]
					}}
				/>
			</div>
		</>
	)
}
