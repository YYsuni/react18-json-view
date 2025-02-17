import { useContext, useRef, useState, isValidElement, useMemo, useCallback } from 'react'
import { JsonViewContext } from './json-view'
import {
	customCopy,
	customDelete,
	customEdit,
	editableDelete,
	editableEdit,
	isObject,
	isReactComponent,
	safeCall,
	stringifyForCopying,
	resolveEvalFailedNewValue,
	customMatchesURL
} from '../utils'
import ObjectNode from './object-node'
import LongString from './long-string'
import CopyButton from './copy-button'
import { ReactComponent as EditSVG } from '../svgs/edit.svg'
import { ReactComponent as DeleteSVG } from '../svgs/trash.svg'
import { ReactComponent as DoneSVG } from '../svgs/done.svg'
import { ReactComponent as CancelSVG } from '../svgs/cancel.svg'
import { ReactComponent as LinkSVG } from '../svgs/link.svg'
import type { CustomizeNode, CustomizeOptions } from '../types'

interface Props {
	node: any
	depth: number
	deleteHandle?: (indexOrName: string | number, parentPath: string[]) => void
	editHandle?: (indexOrName: string | number, newValue: any, oldValue: any, parentPath: string[]) => void
	indexOrName?: number | string
	parent?: Record<string, any> | Array<any>
	parentPath: string[]
}

export default function JsonNode({ node, depth, deleteHandle: _deleteHandle, indexOrName, parent, editHandle, parentPath }: Props) {
	// prettier-ignore
	const { collapseStringsAfterLength, enableClipboard, editable, src, onDelete, onChange, customizeNode, matchesURL, urlRegExp, EditComponent, DoneComponent, CancelComponent, CustomOperation } = useContext(JsonViewContext)

	let customReturn: ReturnType<CustomizeNode> | undefined
	if (typeof customizeNode === 'function') customReturn = safeCall(customizeNode, [{ node, depth, indexOrName }])

	if (customReturn) {
		if (isValidElement(customReturn)) return customReturn
		else if (isReactComponent(customReturn)) {
			const CustomComponent = customReturn
			return <CustomComponent node={node} depth={depth} indexOrName={indexOrName} />
		}
	}

	if (Array.isArray(node) || isObject(node)) {
		return (
			<ObjectNode
				parent={parent}
				node={node}
				depth={depth}
				indexOrName={indexOrName}
				deleteHandle={_deleteHandle}
				parentPath={parentPath}
				customOptions={typeof customReturn === 'object' ? (customReturn as CustomizeOptions) : undefined}
			/>
		)
	} else {
		const type = typeof node
		const currentPath = typeof indexOrName !== 'undefined' ? [...parentPath, String(indexOrName)] : parentPath

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

		const done = useCallback(() => {
			let newValue = valueRef.current!.innerText

			try {
				const parsedValue = JSON.parse(newValue)

				if (editHandle) editHandle(indexOrName!, parsedValue, node, parentPath)
			} catch (e) {
				const trimmedStringValue = resolveEvalFailedNewValue(type, newValue)
				if (editHandle) editHandle(indexOrName!, trimmedStringValue, node, parentPath)
			}

			setEditing(false)
		}, [editHandle, indexOrName, node, parentPath, type])
		const cancel = () => {
			setEditing(false)
			setDeleting(false)
		}
		const deleteHandle = () => {
			setDeleting(false)
			if (_deleteHandle) _deleteHandle(indexOrName!, parentPath)
			if (onDelete)
				onDelete({
					value: node,
					depth,
					src,
					indexOrName: indexOrName!,
					parentType: Array.isArray(parent) ? 'array' : 'object',
					parentPath
				})
			if (onChange)
				onChange({
					depth,
					src,
					indexOrName: indexOrName!,
					parentType: Array.isArray(parent) ? 'array' : 'object',
					type: 'delete',
					parentPath
				})
		}

		const handleKeyDown = useCallback(
			(event: React.KeyboardEvent<HTMLDivElement>) => {
				if (event.key === 'Enter') {
					event.preventDefault()
					done()
				} else if (event.key === 'Escape') {
					cancel()
				}
			},
			[done]
		)

		const isEditing = editing || deleting
		const ctrlClick =
			!isEditing && editableEdit(editable) && customEdit(customReturn as CustomizeOptions | undefined) && editHandle
				? (event: React.MouseEvent) => {
						if (event.ctrlKey || event.metaKey) edit()
				  }
				: undefined
		const Icons = (
			<>
				{isEditing &&
					(typeof DoneComponent === 'function' ? (
						<DoneComponent className='json-view--edit' style={{ display: 'inline-block' }} onClick={deleting ? deleteHandle : done} />
					) : (
						<DoneSVG className='json-view--edit' style={{ display: 'inline-block' }} onClick={deleting ? deleteHandle : done} />
					))}
				{isEditing &&
					(typeof CancelComponent === 'function' ? (
						<CancelComponent className='json-view--edit' style={{ display: 'inline-block' }} onClick={cancel} />
					) : (
						<CancelSVG className='json-view--edit' style={{ display: 'inline-block' }} onClick={cancel} />
					))}

				{!isEditing && enableClipboard && customCopy(customReturn as CustomizeOptions | undefined) && (
					<CopyButton node={node} nodeMeta={{ depth, indexOrName, parent, parentPath, currentPath }} />
				)}
				{!isEditing && matchesURL && type === 'string' && urlRegExp.test(node) && customMatchesURL(customReturn as CustomizeOptions | undefined) && (
					<a href={node} target='_blank' className='json-view--link'>
						<LinkSVG />
					</a>
				)}

				{!isEditing &&
					editableEdit(editable) &&
					customEdit(customReturn as CustomizeOptions | undefined) &&
					editHandle &&
					(typeof EditComponent === 'function' ? (
						<EditComponent className='json-view--edit' onClick={edit} />
					) : (
						<EditSVG className='json-view--edit' onClick={edit} />
					))}
				{!isEditing && editableDelete(editable) && customDelete(customReturn as CustomizeOptions | undefined) && _deleteHandle && (
					<DeleteSVG className='json-view--edit' onClick={() => setDeleting(true)} />
				)}
				{typeof CustomOperation === 'function' ? <CustomOperation node={node} /> : null}
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

		if (typeof (customReturn as CustomizeOptions)?.className === 'string') className += ' ' + (customReturn as CustomizeOptions).className

		if (deleting) className += ' json-view--deleting'

		let displayValue = String(node)
		if (type === 'bigint') displayValue += 'n'

		const EditingElement = useMemo(
			() => (
				<span
					contentEditable
					className={className}
					dangerouslySetInnerHTML={{ __html: type === 'string' ? `"${displayValue}"` : displayValue }}
					ref={valueRef}
					onKeyDown={handleKeyDown}
				/>
			),
			[displayValue, type, handleKeyDown]
		)

		if (type === 'string')
			return (
				<>
					{editing ? (
						EditingElement
					) : node.length > collapseStringsAfterLength ? (
						<LongString str={node} ref={valueRef} className={className} ctrlClick={ctrlClick} />
					) : (
						<span className={className} onClick={ctrlClick}>
							"{displayValue}"
						</span>
					)}

					{Icons}
				</>
			)
		else {
			return (
				<>
					{editing ? (
						EditingElement
					) : (
						<span className={className} onClick={ctrlClick}>
							{displayValue}
						</span>
					)}

					{Icons}
				</>
			)
		}
	}
}
