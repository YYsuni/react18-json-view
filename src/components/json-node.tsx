import { useContext, useRef, useState } from 'react'
import { JsonViewContext } from './json-view'
import { isObject } from '../utils'
import ObjectNode from './object-node'
import LongString from './long-string'
import CopyButton from './copy-button'
import { ReactComponent as EditSVG } from '../svgs/edit.svg'
import { ReactComponent as DeleteSVG } from '../svgs/trash.svg'
import { ReactComponent as DoneSVG } from '../svgs/done.svg'
import { ReactComponent as CancelSVG } from '../svgs/cancel.svg'

interface Props {
	node: any
	depth: number
	deleteHandle?: (_: string | number) => void
	name?: number | string
	parent?: Record<string, any> | Array<any>
}

export default function JsonNode({ node, depth, deleteHandle: _deleteHandle, name, parent }: Props) {
	const { collapseStringsAfterLength, enableClipboard, editable, src, onEdit, onDelete } = useContext(JsonViewContext)

	if (Array.isArray(node) || isObject(node)) {
		return <ObjectNode node={node} depth={depth} parent={parent} name={name} deleteHandle={_deleteHandle} />
	} else {
		const [editing, setEditing] = useState(false)
		const [deleting, setDeleting] = useState(false)
		const [value, setValue] = useState(String(node))
		const [type, setType] = useState(typeof node)
		const valueRef = useRef<HTMLSpanElement>(null)

		const edit = () => {
			setEditing(true)
			setTimeout(() => {
				window.getSelection()?.selectAllChildren(valueRef.current!)
				valueRef.current?.focus()
			})
		}
		const done = () => {
			const newValue = valueRef.current!.innerText

			try {
				const evalValue = eval(newValue)
				const newType = typeof evalValue
				const newEvalValue = String(evalValue)

				setType(newType)
				setValue(newEvalValue)
				if (parent) {
					//@ts-ignore
					parent[name] = newEvalValue
					if (onEdit)
						onEdit({
							newValue: newEvalValue,
							oldValue: value,
							depth,
							src,
							name: name!,
							parentType: Array.isArray(parent) ? 'array' : 'object'
						})
				}
			} catch (e) {
				setType('string')
				setValue(newValue)
				if (parent) {
					//@ts-ignore
					parent[name] = newValue
					if (onEdit)
						onEdit({
							newValue,
							oldValue: value,
							depth,
							src,
							name: name!,
							parentType: Array.isArray(parent) ? 'array' : 'object'
						})
				}
			}

			setEditing(false)
		}
		const cancel = () => {
			setEditing(false)
			setDeleting(false)
		}
		const deleteHandle = () => {
			setDeleting(false)
			if (_deleteHandle) _deleteHandle(name!)
			if (onDelete) onDelete({ value, depth, src, name: name!, parentType: Array.isArray(parent) ? 'array' : 'object' })
		}

		const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === 'Enter') {
				event.preventDefault()
				done()
			} else if (event.key === 'Escape') {
				cancel()
			}
		}

		const isEditing = editing || deleting

		const Icons = (
			<>
				{isEditing && (
					<DoneSVG
						className='json-view--edit'
						style={{ display: 'inline-block' }}
						onClick={deleting ? deleteHandle : done}
					/>
				)}
				{isEditing && <CancelSVG className='json-view--edit' style={{ display: 'inline-block' }} onClick={cancel} />}

				{!isEditing && enableClipboard && <CopyButton text={node} />}
				{!isEditing && editable && <EditSVG className='json-view--edit' onClick={edit} />}
				{!isEditing && editable && <DeleteSVG className='json-view--edit' onClick={() => setDeleting(true)} />}
			</>
		)

		let className = 'json-view--string'
		switch (type) {
			case 'number':
			case 'bigint':
				className = 'json-view--number'
				break
			case 'boolean':
				className = 'json-view--boolean'
				break
			case 'object':
				className = 'json-view--null'
				break
		}
		if (deleting) className += ' json-view--deleting'

		if (type === 'string')
			return (
				<>
					{node.length > collapseStringsAfterLength ? (
						<LongString
							str={value}
							ref={valueRef}
							editing={editing}
							handleKeyDown={handleKeyDown}
							className={className}
						/>
					) : editing ? (
						<span
							className={className}
							contentEditable={editing}
							dangerouslySetInnerHTML={{ __html: `"${value}"` }}
							ref={valueRef}
							onKeyDown={handleKeyDown}
						/>
					) : (
						<span className={className}>"{value}"</span>
					)}

					{Icons}
				</>
			)
		else {
			return (
				<>
					{editing ? (
						<span
							className={className}
							contentEditable={editing}
							dangerouslySetInnerHTML={{ __html: value }}
							ref={valueRef}
							onKeyDown={handleKeyDown}
						/>
					) : (
						<span className={className}>{value}</span>
					)}

					{Icons}
				</>
			)
		}
	}
}
