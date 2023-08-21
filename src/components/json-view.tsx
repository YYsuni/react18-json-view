import { createContext } from 'react'
import JsonNode from './json-node'

export const JsonViewContext = createContext({
	collapseStringsAfterLength: 99,
	collapseObjectsAfterLength: 20,
	enableClipboard: true,
	collapsed: false as number | boolean,
	editable: false
})

interface Props {
	src: any
	collapseStringsAfterLength?: number
	collapseObjectsAfterLength?: number
	enableClipboard?: boolean
	collapsed?: boolean | number
	editable?: boolean
}

export default function JsonView({
	src,
	collapseStringsAfterLength = 99,
	collapseObjectsAfterLength = 20,
	enableClipboard = true,
	collapsed = false,
	editable = false
}: Props) {
	return (
		<JsonViewContext.Provider
			value={{ collapseStringsAfterLength, collapseObjectsAfterLength, enableClipboard, collapsed, editable }}>
			<code className='json-view'>
				<JsonNode node={src} depth={1} />
			</code>
		</JsonViewContext.Provider>
	)
}
