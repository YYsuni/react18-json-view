import { createContext, useState } from 'react'
import JsonNode from './json-node'

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
	collapsed: false as number | boolean,
	editable: false,
	src: undefined,
	onEdit: (() => {}) as OnEdit | undefined,
	onDelete: (() => {}) as OnDelete | undefined,
	onAdd: (() => {}) as OnAdd | undefined,
	onChange: (() => {}) as OnChange | undefined,
	forceUpdate: () => {}
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
	onAdd?: OnAdd
	onChange?: OnChange
	dark?: boolean
	theme?: 'default' | 'a11y' | 'github' | 'vscode' | 'atom'
}

export default function JsonView({
	src,
	collapseStringsAfterLength = 99,
	collapseObjectsAfterLength = 20,
	enableClipboard = true,
	collapsed = false,
	editable = false,
	onEdit,
	onDelete,
	onAdd,
	onChange,
	dark = false,
	theme = 'default'
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
				forceUpdate
			}}>
			<code
				className={'json-view' + (dark ? ' dark' : '') + (theme && theme !== 'default' ? ' json-view_' + theme : '')}>
				<JsonNode node={src} depth={1} />
			</code>
		</JsonViewContext.Provider>
	)
}
