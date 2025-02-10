import { useContext, useState } from 'react'
import { ReactComponent as CopySVG } from '../svgs/copy.svg'
import { ReactComponent as CopiedSVG } from '../svgs/copied.svg'
import { JsonViewContext } from './json-view'
import { writeClipboard } from 'src/utils'
import { NodeMeta } from 'src/types'

interface Props {
	node: any
	nodeMeta: NodeMeta
}

export default function CopyButton({ node, nodeMeta }: Props) {
	const { customizeCopy, CopyComponent, CopiedComponent } = useContext(JsonViewContext)

	const [copied, setCopied] = useState(false)

	const copyHandler = (event: React.MouseEvent) => {
		event.stopPropagation()

		const value = customizeCopy(node, nodeMeta)

		if (typeof value === 'string' && value) {
			writeClipboard(value)
		}

		setCopied(true)
		setTimeout(() => setCopied(false), 3000)
	}

	return copied ? (
		typeof CopiedComponent === 'function' ? (
			<CopiedComponent className='json-view--copy' style={{ display: 'inline-block' }} />
		) : (
			<CopiedSVG className='json-view--copy' style={{ display: 'inline-block' }} />
		)
	) : typeof CopyComponent === 'function' ? (
		<CopyComponent onClick={copyHandler} className='json-view--copy' />
	) : (
		<CopySVG onClick={copyHandler} className='json-view--copy' />
	)
}
