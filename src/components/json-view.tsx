import { createContext, useState } from 'react'
import JsonNode from './json-node'
import { Collapsed, CustomizeNode, Editable } from '../types'

type OnEdit = (params: {
	newValue: any
	oldValue: any
	depth: number
	src: any
	indexOrName: string | number
	parentType: 'object' | 'array'
}) => void
type OnDelete = (params: {
	value: any
	indexOrName: string | number
	depth: number
	src: any
	parentType: 'object' | 'array'
}) => void
type OnAdd = (params: { indexOrName: string | number; depth: number; src: any; parentType: 'object' | 'array' }) => void
type OnChange = (params: {
	indexOrName: string | number
	depth: number
	src: any
	parentType: 'object' | 'array'
	type: 'add' | 'edit' | 'delete'
}) => void

export const JsonViewContext = createContext({
	collapseStringsAfterLength: 99,
	collapseObjectsAfterLength: 20,
	enableClipboard: true,
	collapsed: false as Collapsed,
	editable: false as Editable,
	src: undefined,
	onEdit: undefined as OnEdit | undefined,
	onDelete: undefined as OnDelete | undefined,
	onAdd: undefined as OnAdd | undefined,
	onChange: undefined as OnChange | undefined,
	forceUpdate: () => {},
	customizeNode: undefined as CustomizeNode | undefined
})

interface Props {
	src: any
	collapseStringsAfterLength?: number
	collapseObjectsAfterLength?: number
	collapsed?: Collapsed

	enableClipboard?: boolean

	editable?: Editable
	onEdit?: OnEdit
	onDelete?: OnDelete
	onAdd?: OnAdd
	onChange?: OnChange

	customizeNode?: CustomizeNode

	dark?: boolean
	theme?: 'default' | 'a11y' | 'github' | 'vscode' | 'atom' | 'winter-is-coming'
}

export default function JsonView({
	src,
	collapseStringsAfterLength = 99,
	collapseObjectsAfterLength = 99,
	enableClipboard = true,
	collapsed = false,
	editable = false,
	onEdit,
	onDelete,
	onAdd,
	onChange,
	dark = false,
	theme = 'default',
	customizeNode
}: Props) {
	const [_, update] = useState(0)
	const forceUpdate = () => update(state => ++state)

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
				onDelete,
				onAdd,
				onChange,
				forceUpdate,
				customizeNode
			}}>
			<code
				className={'json-view' + (dark ? ' dark' : '') + (theme && theme !== 'default' ? ' json-view_' + theme : '')}>
				<JsonNode node={src} depth={1} />
			</code>
		</JsonViewContext.Provider>
	)
}
