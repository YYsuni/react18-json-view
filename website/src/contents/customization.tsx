import { writeText } from '@/lib/clipboard'
import hljs from 'highlight.js/lib/core'
import { useState } from 'react'
import JsonView from 'react18-json-view'
import CopySVG from '@/svgs/copy.svg'
import CopiedSVG from '@/svgs/copied.svg'

const CODE = `<JsonView
  editable
  customizeNode={params => {
    if (params.indexOrName === 'obj') return { add: false, delete: false, enableClipboard: false }
    if (params.node === 'no-clipboard') return { enableClipboard: false }
    if (params.node === 'non-delete') return { delete: false }
    if (params.node === 'non-editable') return { add: false, delete: false, edit: false }
    if (params.indexOrName === 'arr') return { collapsed: false }
    if (params.depth > 2) return { collapsed: true }
    if (params.indexOrName === 'className') return { className: 'underline' }
    if (params.indexOrName === 'collapsed') return { collapsed: true }
    if (params.node === 'count')
      return () => {
        const [count, setCount] = useState(0)

        return (
          <span>
            {count}
            <button onClick={() => setCount(count + 1)} className='border ml-1 px-1 py-0.5'>
              add
            </button>
          </span>
        )
      }
    if (typeof params.node === 'string' && params.node.startsWith('https://'))
      return (
        <a href={params.node} target='_blank' className='text-sky-500 hover:underline'>
          {params.node}
        </a>
      )
  }}
  src={{json_object}}
/>`

export default function Customization() {
	const [copied, setCopied] = useState(false)

	const copy = () => {
		writeText(CODE)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const highlightedCode = hljs.highlight(CODE, { language: 'js' }).value

	return (
		<>
			<h2 className='mt-20 text-lg font-medium'>Advanced customization</h2>

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
					customizeNode={params => {
						if (params.node === 'count')
							return () => {
								const [count, setCount] = useState(0)

								return (
									<span>
										{count}
										<button onClick={() => setCount(count + 1)} className='border ml-1 px-1 py-0.5'>
											add
										</button>
									</span>
								)
							}
						if (typeof params.node === 'string' && params.node.startsWith('https://'))
							return (
								<a href={params.node} target='_blank' className='text-sky-500 hover:underline'>
									{params.node}
								</a>
							)
						if (params.indexOrName === 'obj') return { add: false, delete: false, enableClipboard: false }
						if (params.node === 'no-clipboard') return { enableClipboard: false }
						if (params.node === 'non-delete') return { delete: false }
						if (params.node === 'non-editable') return { add: false, delete: false, edit: false }
						if (params.indexOrName === 'arr') return { collapsed: false }
						if (params.depth > 2) return { collapsed: true }
						if (params.indexOrName === 'className') return { className: 'underline' }
						if (params.indexOrName === 'collapsed') return { collapsed: true }
					}}
					src={{
						count: 'count',
						link: 'https://github.com/YYsuni/react18-json-view',
						number: 123456,
						'no-clipboard': 'no-clipboard',
						'non-delete': 'non-delete',
						'non-editable': 'non-editable',
						className: 'className',
						collapsed: {
							k1: 123,
							k2: '123',
							k3: false
						},
						arr: ['string', 123456, false, null, [1, 2, 3]]
					}}
				/>
			</div>
		</>
	)
}
