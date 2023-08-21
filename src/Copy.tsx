import { useState } from 'react'

export default function Copy({ text }: { text: string }) {
	const [copied, setCopied] = useState(false)

	return copied ? (
		<svg
			className='json-view--copy'
			style={{ display: 'inline-block' }}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'>
			<path stroke='#A1E3CB' d='m10.933 13.519-2.226-2.226-1.414 1.414 3.774 3.774 5.702-6.84-1.538-1.282z'></path>
			<path d='M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z'></path>
		</svg>
	) : (
		<svg
			onClick={event => {
				event.stopPropagation()
				navigator.clipboard.writeText(text)
				setCopied(true)
				setTimeout(() => setCopied(false), 3000)
			}}
			className='json-view--copy'
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'>
			<path d='M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z'></path>
		</svg>
	)
}
