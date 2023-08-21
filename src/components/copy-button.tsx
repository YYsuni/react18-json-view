import { useState } from 'react'
import { ReactComponent as CopySVG } from '../svgs/copy.svg'
import { ReactComponent as CopiedSVG } from '../svgs/copied.svg'

export default function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false)

	return copied ? (
		<CopiedSVG className='json-view--copy' style={{ display: 'inline-block' }} />
	) : (
		<CopySVG
			onClick={event => {
				event.stopPropagation()
				navigator.clipboard.writeText(text)
				setCopied(true)
				setTimeout(() => setCopied(false), 3000)
			}}
			className='json-view--copy'
		/>
	)
}
