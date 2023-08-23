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
	deleteHandle?: (indexOrName: string | number) => void
	editHandle?: (indexOrName: string | number, newValue: any, oldValue: any) => void
	name?: number | string
	parent?: Record<string, any> | Array<any>
}

export default function JsonNode({ node, depth, deleteHandle: _deleteHandle, name, parent, editHandle }: Props) {
	const { collapseStringsAfterLength, enableClipboard, editable, src, onDelete, onChange } = useContext(JsonViewContext)

	if (Array.isArray(node) || isObject(node)) {
		return <ObjectNode node={node} depth={depth} name={name} deleteHandle={_deleteHandle} />
	} else {
		const type = typeof node

		const [editing, setEditing] = useState(false)
		const [deleting, setDeleting] = useState(false)
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

				if (editHandle) editHandle(name!, evalValue, node)
			} catch (e) {
				if (editHandle) editHandle(name!, newValue, node)
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
			if (onDelete)
				onDelete({
					value: node,
					depth,
					src,
					indexOrName: name!,
					parentType: Array.isArray(parent) ? 'array' : 'object'
				})
			if (onChange)
				onChange({
					depth,
					src,
					indexOrName: name!,
					parentType: Array.isArray(parent) ? 'array' : 'object',
					type: 'delete'
				})
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
							str={node}
							ref={valueRef}
							editing={editing}
							handleKeyDown={handleKeyDown}
							className={className}
						/>
					) : editing ? (
						<span
							className={className}
							contentEditable={editing}
							dangerouslySetInnerHTML={{ __html: `"${node}"` }}
							ref={valueRef}
							onKeyDown={handleKeyDown}
						/>
					) : (
						<span className={className}>"{String(node)}"</span>
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
							dangerouslySetInnerHTML={{ __html: String(node) }}
							ref={valueRef}
							onKeyDown={handleKeyDown}
						/>
					) : (
						<span className={className}>{String(node)}</span>
					)}

					{Icons}
				</>
			)
		}
	}
}
