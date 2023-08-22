import { createContext } from 'react'
import JsonNode from './json-node'

type OnEdit = (event: {
	newValue: any
	oldValue: any
	depth: number
	src: any
	name: string | number
	parentType: 'object' | 'array'
}) => void
type OnDelete = (event: {
	value: any
	name: string | number
	depth: number
	src: any
	parentType: 'object' | 'array'
}) => void

export const JsonViewContext = createContext({
	collapseStringsAfterLength: 99,
	collapseObjectsAfterLength: 20,
	enableClipboard: true,
	collapsed: false as number | boolean,
	editable: false,
	src: undefined,
	onEdit: (() => {}) as OnEdit | undefined,
	onDelete: (() => {}) as OnDelete | undefined
})

interface Props {
	src: any
	collapseStringsAfterLength?: number
	collapseObjectsAfterLength?: number
	enableClipboard?: boolean
	collapsed?: boolean | number
	editable?: boolean
	onEdit?: OnEdit
	onDelete?: OnDelete
}

export default function JsonView({
	src,
	collapseStringsAfterLength = 99,
	collapseObjectsAfterLength = 20,
	enableClipboard = true,
	collapsed = false,
	editable = false,
	onEdit,
	onDelete
}: Props) {
	return (
		<JsonViewContext.Provider
			value={{
				collapseStringsAfterLength,
				collapseObjectsAfterLength,
				enableClipboard,
				collapsed,
				editable,
				src,
				onEdit,
				onDelete
			}}>
			<code className='json-view'>
				<JsonNode node={src} depth={1} />
			</code>
		</JsonViewContext.Provider>
	)
}
