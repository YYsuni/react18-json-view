import { useContext, useEffect, useState } from 'react'
import LargeArrayNode from './large-array-node'
import { JsonViewContext } from './json-view'
import { CustomizeOptions } from '../types'
import { customAdd, customCopy, customDelete, editableAdd, editableDelete, ifDisplay, isCollapsed, isCollapsed_largeArray } from '../utils'
import { ReactComponent as AngleDownSVG } from '../svgs/angle-down.svg'
import CopyButton from './copy-button'
import { ReactComponent as DeleteSVG } from '../svgs/trash.svg'
import { ReactComponent as AddSVG } from '../svgs/add-square.svg'
import { ReactComponent as DoneSVG } from '../svgs/done.svg'
import { ReactComponent as CancelSVG } from '../svgs/cancel.svg'

interface Props {
	node: Array<any>
	depth: number
	indexOrName?: number | string
	deleteHandle?: (_: string | number) => void
	customOptions?: CustomizeOptions
}

export default function LargeArray({ node, depth, deleteHandle: _deleteSelf, indexOrName, customOptions }: Props) {
	const nestCollapsedArray: any[] = []
	for (let i = 0; i < node.length; i += 100) {
		nestCollapsedArray.push(node.slice(i, i + 100))
	}

	const { collapsed, enableClipboard, collapseObjectsAfterLength, editable, onDelete, src, onAdd, onEdit, onChange, forceUpdate, displaySize } =
		useContext(JsonViewContext)

	const [fold, setFold] = useState(isCollapsed_largeArray(node, depth, indexOrName, collapsed, collapseObjectsAfterLength, customOptions))
	useEffect(() => {
		setFold(isCollapsed_largeArray(node, depth, indexOrName, collapsed, collapseObjectsAfterLength, customOptions))
	}, [collapsed, collapseObjectsAfterLength])

	// Delete self
	const [deleting, setDeleting] = useState(false)
	const deleteSelf = () => {
		setDeleting(false)
		if (_deleteSelf) _deleteSelf(indexOrName!)
		if (onDelete) onDelete({ value: node, depth, src, indexOrName: indexOrName!, parentType: 'array' })
		if (onChange)
			onChange({
				type: 'delete',
				depth,
				src,
				indexOrName: indexOrName!,
				parentType: 'array'
			})
	}

	// Add
	const [adding, setAdding] = useState(false)
	const add = () => {
		const arr = node as unknown as any[]
		arr.push(null)
		if (onAdd) onAdd({ indexOrName: arr.length - 1, depth, src, parentType: 'array' })
		if (onChange) onChange({ type: 'add', indexOrName: arr.length - 1, depth, src, parentType: 'array' })
		forceUpdate()
	}

	const isEditing = deleting || adding
	const cancel = () => {
		setDeleting(false)
		setAdding(false)
	}

	const Icons = (
		<>
			{!fold && !isEditing && (
				<span onClick={() => setFold(true)} className='jv-size-chevron'>
					{ifDisplay(displaySize, depth, fold) && <span className='jv-size'>{node.length} Items</span>}

					<AngleDownSVG className='jv-chevron' />
				</span>
			)}

			{isEditing && <DoneSVG className='json-view--edit' style={{ display: 'inline-block' }} onClick={adding ? add : deleteSelf} />}
			{isEditing && <CancelSVG className='json-view--edit' style={{ display: 'inline-block' }} onClick={cancel} />}

			{!fold && !isEditing && enableClipboard && customCopy(customOptions) && <CopyButton node={node} />}
			{!fold && !isEditing && editableAdd(editable) && customAdd(customOptions) && (
				<AddSVG
					className='json-view--edit'
					onClick={() => {
						add()
					}}
				/>
			)}
			{!fold && !isEditing && editableDelete(editable) && customDelete(customOptions) && _deleteSelf && (
				<DeleteSVG className='json-view--edit' onClick={() => setDeleting(true)} />
			)}
		</>
	)

	return (
		<>
			<span>{'['}</span>

			{Icons}

			{!fold ? (
				<div className='jv-indent'>
					{nestCollapsedArray.map((item, index) => (
						<LargeArrayNode key={String(indexOrName) + String(index)} originNode={node} node={item} depth={depth} index={index} startIndex={index * 100} />
					))}
				</div>
			) : (
				<button onClick={() => setFold(false)} className='jv-button'>
					...
				</button>
			)}

			<span>{']'}</span>

			{fold && ifDisplay(displaySize, depth, fold) && (
				<span onClick={() => setFold(false)} className='jv-size'>
					{node.length} Items
				</span>
			)}
		</>
	)
}
