import { createContext, useCallback, useState } from 'react'
import JsonNode from './json-node'
import type { Collapsed, CustomizeNode, DisplaySize, Editable } from '../types'

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
	src: undefined as any,

	collapseStringsAfterLength: 99,
	collapseStringMode: 'directly' as 'directly' | 'word' | 'address',

	collapseObjectsAfterLength: 20,
	collapsed: false as Collapsed,

	enableClipboard: true,

	editable: false as Editable,
	onEdit: undefined as OnEdit | undefined,
	onDelete: undefined as OnDelete | undefined,
	onAdd: undefined as OnAdd | undefined,
	onChange: undefined as OnChange | undefined,

	forceUpdate: () => {},

	customizeNode: undefined as CustomizeNode | undefined,

	displaySize: undefined as DisplaySize
})

interface Props {
	src: any

	collapseStringsAfterLength?: number
	collapseStringMode?: 'directly' | 'word' | 'address'

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

	displaySize?: DisplaySize
}

export default function JsonView({
	src,

	collapseStringsAfterLength = 99,
	collapseStringMode = 'directly',

	collapseObjectsAfterLength = 99,
	collapsed,

	enableClipboard = true,

	editable = false,
	onEdit,
	onDelete,
	onAdd,
	onChange,

	dark = false,
	theme = 'default',

	customizeNode,

	displaySize
}: Props) {
	const [_, update] = useState(0)
	const forceUpdate = useCallback(() => update(state => ++state), [])

	return (
		<JsonViewContext.Provider
			value={{
				src,

				collapseStringsAfterLength,
				collapseStringMode,

				collapseObjectsAfterLength,
				collapsed,

				enableClipboard,

				editable,
				onEdit,
				onDelete,
				onAdd,
				onChange,

				forceUpdate,

				customizeNode,

				displaySize
			}}>
			<code
				className={'json-view' + (dark ? ' dark' : '') + (theme && theme !== 'default' ? ' json-view_' + theme : '')}>
				<JsonNode node={src} depth={1} />
			</code>
		</JsonViewContext.Provider>
	)
}
