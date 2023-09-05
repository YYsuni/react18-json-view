import { useContext, useEffect, useRef, useState } from 'react'
import { JsonViewContext } from './json-view'
import {
	isObject,
	customAdd,
	customCopy,
	customDelete,
	editableAdd,
	editableDelete,
	isCollapsed,
	stringifyForCopying
} from '../utils'
import { ReactComponent as AngleDownSVG } from '../svgs/angle-down.svg'
import CopyButton from './copy-button'
import NameValue from './name-value'
import { ReactComponent as DeleteSVG } from '../svgs/trash.svg'
import { ReactComponent as AddSVG } from '../svgs/add-square.svg'
import { ReactComponent as DoneSVG } from '../svgs/done.svg'
import { ReactComponent as CancelSVG } from '../svgs/cancel.svg'
import type { CustomizeOptions } from '../types'

interface Props {
	node: Record<string, any> | Array<any>
	depth: number
	name?: number | string
	deleteHandle?: (_: string | number) => void
	customOptions?: CustomizeOptions
}

export default function ObjectNode({ node, depth, name, deleteHandle: _deleteSelf, customOptions }: Props) {
	const {
		collapsed,
		enableClipboard,
		collapseObjectsAfterLength,
		editable,
		onDelete,
		src,
		onAdd,
		onEdit,
		onChange,
		forceUpdate
	} = useContext(JsonViewContext)

	const isPlainObject = isObject(node)

	const [fold, setFold] = useState(isCollapsed(node, depth, name, collapsed, collapseObjectsAfterLength, customOptions))

	useEffect(() => {
		setFold(isCollapsed(node, depth, name, collapsed, collapseObjectsAfterLength, customOptions))
	}, [collapsed, collapseObjectsAfterLength])

	// Edit property
	const editHandle = (indexOrName: number | string, newValue: any, oldValue: any) => {
		if (Array.isArray(node)) {
			node[+indexOrName] = newValue
		} else if (node) {
			node[indexOrName] = newValue
		}
		if (onEdit)
			onEdit({
				newValue,
				oldValue,
				depth,
				src,
				indexOrName: indexOrName,
				parentType: isPlainObject ? 'object' : 'array'
			})
		if (onChange)
			onChange({ type: 'edit', depth, src, indexOrName: indexOrName, parentType: isPlainObject ? 'object' : 'array' })
		forceUpdate()
	}

	// Delete property
	const deleteHandle = (indexOrName: number | string) => {
		if (Array.isArray(node)) {
			node.splice(+indexOrName, 1)
		} else if (node) {
			delete node[indexOrName]
		}
		forceUpdate()
	}

	// Delete self
	const [deleting, setDeleting] = useState(false)
	const deleteSelf = () => {
		setDeleting(false)
		if (_deleteSelf) _deleteSelf(name!)
		if (onDelete)
			onDelete({ value: node, depth, src, indexOrName: name!, parentType: isPlainObject ? 'object' : 'array' })
		if (onChange)
			onChange({
				type: 'delete',
				depth,
				src,
				indexOrName: name!,
				parentType: isPlainObject ? 'object' : 'array'
			})
	}

	// Add
	const [adding, setAdding] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const add = () => {
		if (isPlainObject) {
			const inputName = inputRef.current?.value

			if (inputName) {
				;(node as Record<string, any>)[inputName] = null

				if (inputRef.current) inputRef.current.value = ''
				setAdding(false)

				if (onAdd) onAdd({ indexOrName: inputName, depth, src, parentType: 'object' })
				if (onChange) onChange({ type: 'add', indexOrName: inputName, depth, src, parentType: 'object' })
			}
		} else if (Array.isArray(node)) {
			const arr = node as unknown as any[]
			arr.push(null)
			if (onAdd) onAdd({ indexOrName: arr.length - 1, depth, src, parentType: 'array' })
			if (onChange) onChange({ type: 'add', indexOrName: arr.length - 1, depth, src, parentType: 'array' })
		}
		forceUpdate()
	}
	const handleAddKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault()
			add()
		} else if (event.key === 'Escape') {
			cancel()
		}
	}

	const isEditing = deleting || adding
	const cancel = () => {
		setDeleting(false)
		setAdding(false)
	}

	const Icons = (
		<>
			{!fold && !isEditing && <AngleDownSVG onClick={() => setFold(true)} className='jv-chevron' />}

			{adding && isPlainObject && (
				<input className='json-view--input' placeholder='property' ref={inputRef} onKeyDown={handleAddKeyDown} />
			)}

			{isEditing && (
				<DoneSVG className='json-view--edit' style={{ display: 'inline-block' }} onClick={adding ? add : deleteSelf} />
			)}
			{isEditing && <CancelSVG className='json-view--edit' style={{ display: 'inline-block' }} onClick={cancel} />}

			{!fold && !isEditing && enableClipboard && customCopy(customOptions) && (
				<CopyButton text={stringifyForCopying(node)} />
			)}
			{!fold && !isEditing && editableAdd(editable) && customAdd(customOptions) && (
				<AddSVG
					className='json-view--edit'
					onClick={() => {
						if (isPlainObject) {
							setAdding(true)
							setTimeout(() => inputRef.current?.focus())
						} else {
							add()
						}
					}}
				/>
			)}
			{!fold && !isEditing && editableDelete(editable) && customDelete(customOptions) && _deleteSelf && (
				<DeleteSVG className='json-view--edit' onClick={() => setDeleting(true)} />
			)}
		</>
	)

	if (Array.isArray(node)) {
		return (
			<>
				<span>{'['}</span>

				{Icons}

				{!fold ? (
					<div className='jv-indent'>
						{node.map((n, i) => (
							<NameValue
								key={String(i) + String(n)}
								name={i}
								value={n}
								depth={depth}
								parent={node}
								deleteHandle={deleteHandle}
								editHandle={editHandle}
							/>
						))}
					</div>
				) : (
					<button onClick={() => setFold(false)} className='jv-button'>
						...
					</button>
				)}

				<span>{']'}</span>
			</>
		)
	} else if (isPlainObject) {
		return (
			<>
				<span>{'{'}</span>

				{Icons}

				{!fold ? (
					<div className='jv-indent'>
						{Object.entries(node).map(([name, value]) => (
							<NameValue
								key={name + String(value)}
								name={name}
								value={value}
								depth={depth}
								parent={node}
								deleteHandle={deleteHandle}
								editHandle={editHandle}
							/>
						))}
					</div>
				) : (
					<button onClick={() => setFold(false)} className='jv-button'>
						...
					</button>
				)}

				<span>{'}'}</span>
			</>
		)
	}
	return null
}
