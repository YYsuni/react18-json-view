import { writeText } from '@/lib/clipboard'
import '@/lib/hljs'
import hljs from 'highlight.js/lib/core'
import { useMemo } from 'react'
import { useState } from 'react'
import CopySVG from '@/svgs/copy.svg'
import CopiedSVG from '@/svgs/copied.svg'

const CODE = `import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'
// If dark mode is needed, import \`dark.css\`.
// import 'react18-json-view/src/dark.css'
	
<JsonView src={json_object} />
	
// If needed, you can use the internal stringify function.
// import { stringify } from 'react18-json-view'`

export default function Usage() {
	const code = useMemo(() => hljs.highlight(CODE, { language: 'js' }).value, [])

	const [copied, setCopied] = useState(false)
	const copy = (e: any) => {
		writeText(CODE)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<>
			<h2 className='mt-12 text-lg font-medium'>Usage</h2>

			<div className='relative'>
				<pre
					dangerouslySetInnerHTML={{ __html: code }}
					className=' block rounded-lg border bg-slate-50 p-4 dark:bg-slate-500 mt-3 overflow-auto text-sm font-mono'
				/>
				<button onClick={copy} className='rounded-lg p-1 absolute right-4 top-4'>
					{copied ? <CopiedSVG className='h-5 w-5' /> : <CopySVG className='h-5 w-5' />}
				</button>
			</div>
		</>
	)
}
