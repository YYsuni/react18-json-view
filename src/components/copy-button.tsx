import { useContext, useState } from 'react'
import { ReactComponent as CopySVG } from '../svgs/copy.svg'
import { ReactComponent as CopiedSVG } from '../svgs/copied.svg'
import { JsonViewContext } from './json-view'

export default function CopyButton({ node }: { node: any }) {
	const { customizeCopy } = useContext(JsonViewContext)

	const [copied, setCopied] = useState(false)

	return copied ? (
		<CopiedSVG className='json-view--copy' style={{ display: 'inline-block' }} />
	) : (
		<CopySVG
			onClick={event => {
				event.stopPropagation()

				const value = customizeCopy(node)

				if (typeof value === 'string' && value) {
					navigator.clipboard.writeText(value)
				}

				setCopied(true)
				setTimeout(() => setCopied(false), 3000)
			}}
			className='json-view--copy'
		/>
	)
}
