'use client'

import { writeText } from '@/lib/clipboard'
import CopySVG from '@/svgs/copy.svg'
import CopiedSVG from '@/svgs/copied.svg'
import { useState } from 'react'

export default function Installation() {
	const [copied, setCopied] = useState(false)

	const copy = () => {
		writeText('npm i react18-json-view')
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<>
			<h2 className='mt-12 text-lg font-medium'>Installation</h2>
			<code
				onClick={copy}
				className='mt-3 flex cursor-copy items-center justify-between rounded-lg border bg-slate-50 p-4 dark:bg-slate-700 '>
				<span>npm i react18-json-view</span>
				<button className='rounded-lg p-1 bg-white/50 border backdrop-blur'>
					{copied ? <CopiedSVG className='h-5 w-5' /> : <CopySVG className='h-5 w-5' />}
				</button>
			</code>
		</>
	)
}
