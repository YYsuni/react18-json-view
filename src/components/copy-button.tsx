import { useState } from 'react'
import { ReactComponent as CopySVG } from '../svgs/copy.svg'
import { ReactComponent as CopiedSVG } from '../svgs/copied.svg'
import { stringifyForCopying } from '../utils'

export default function CopyButton({ node }: { node: any }) {
	const [copied, setCopied] = useState(false)

	return copied ? (
		<CopiedSVG className='json-view--copy' style={{ display: 'inline-block' }} />
	) : (
		<CopySVG
			onClick={event => {
				const value = stringifyForCopying(node)

				event.stopPropagation()
				navigator.clipboard.writeText(value)
				setCopied(true)
				setTimeout(() => setCopied(false), 3000)
			}}
			className='json-view--copy'
		/>
	)
}
