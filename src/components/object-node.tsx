import { useContext, useEffect, useRef, useState } from 'react'
import { JsonViewContext } from './json-view'
import { isObject as _isObject, stringifyForCopying } from '../utils'
import { ReactComponent as AngleDownSVG } from '../svgs/angle-down.svg'
import CopyButton from './copy-button'
import NameValue from './name-value'
import { ReactComponent as DeleteSVG } from '../svgs/trash.svg'
import { ReactComponent as AddSVG } from '../svgs/add-square.svg'
import { ReactComponent as DoneSVG } from '../svgs/done.svg'
import { ReactComponent as CancelSVG } from '../svgs/cancel.svg'

interface Props {
	node: Record<string, any> | Array<any>
	depth: number
	name?: number | string
	deleteHandle?: (_: string | number) => void
}

export default function ObjectNode({ node, depth, name, deleteHandle: _deleteSelf }: Props) {
	const { collapsed, enableClipboard, collapseObjectsAfterLength, editable, onDelete, src, onAdd, onEdit, onChange } =
		useContext(JsonViewContext)

	const isObject = _isObject(node)

	const [_, update] = useState(0)
	const forceUpdate = () => update(state => ++state)
	const [fold, setFold] = useState(
		collapsed === true ||
			(typeof collapsed === 'number' && depth > collapsed) ||
			(Array.isArray(node) && node.length > collapseObjectsAfterLength) ||
			(isObject && Object.keys(node).length > collapseObjectsAfterLength)
			? true
			: false
	)

	useEffect(() => {
		const originCollapsed =
			(Array.isArray(node) && node.length > collapseObjectsAfterLength) ||
			(isObject && Object.keys(node).length > collapseObjectsAfterLength)

		if (typeof collapsed === 'boolean') {
			setFold(collapsed || originCollapsed)
		} else if (typeof collapsed === 'number') {
			setFold(depth > collapsed || originCollapsed)
		}
	}, [collapsed, collapseObjectsAfterLength])

	// Edit property
	const editHandle = (indexOrName: number | string, newValue: any, oldValue: any) => {
		if (Array.isArray(node)) {
			node[+indexOrName] = newValue
		} else if (node) {
			node[indexOrName] = newValue
		}
		if (onEdit)
			onEdit({ newValue, oldValue, depth, src, indexOrName: indexOrName, parentType: isObject ? 'object' : 'array' })
		if (onChange)
			onChange({ type: 'edit', depth, src, indexOrName: indexOrName, parentType: isObject ? 'object' : 'array' })
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
		if (onDelete) onDelete({ value: node, depth, src, indexOrName: name!, parentType: isObject ? 'object' : 'array' })
		if (onChange)
			onChange({
				type: 'delete',
				depth,
				src,
				indexOrName: name!,
				parentType: isObject ? 'object' : 'array'
			})
	}

	// Add
	const [adding, setAdding] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const add = () => {
		if (isObject) {
			const inputName = inputRef.current?.value

			if (inputName) {
				;(node as Record<string, any>)[inputName] = null

				if (inputRef.current) inputRef.current.value = ''
				setAdding(false)

				if (onAdd) onAdd({ indexOrName: inputName, depth, src, parentType: 'object' })
				if (onChange) onChange({ type: 'add', indexOrName: inputName, depth, src, parentType: 'object' })
			}
		} else if (Array.isArray(node)) {
			node.push(null)
			if (onAdd) onAdd({ indexOrName: node.length - 1, depth, src, parentType: 'array' })
			if (onChange) onChange({ type: 'add', indexOrName: node.length - 1, depth, src, parentType: 'array' })
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

			{adding && isObject && (
				<input className='json-view--input' placeholder='property' ref={inputRef} onKeyDown={handleAddKeyDown} />
			)}

			{isEditing && (
				<DoneSVG className='json-view--edit' style={{ display: 'inline-block' }} onClick={adding ? add : deleteSelf} />
			)}
			{isEditing && <CancelSVG className='json-view--edit' style={{ display: 'inline-block' }} onClick={cancel} />}

			{!fold && !isEditing && enableClipboard && <CopyButton text={stringifyForCopying(node)} />}
			{!fold && !isEditing && editable && (
				<AddSVG
					className='json-view--edit'
					onClick={() => {
						if (isObject) {
							setAdding(true)
							setTimeout(() => inputRef.current?.focus())
						} else {
							add()
						}
					}}
				/>
			)}
			{!fold && !isEditing && editable && <DeleteSVG className='json-view--edit' onClick={() => setDeleting(true)} />}
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
	} else if (isObject) {
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
