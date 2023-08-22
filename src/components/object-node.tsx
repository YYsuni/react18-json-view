import { useContext, useEffect, useState } from 'react'
import { JsonViewContext } from './json-view'
import { isObject } from '../utils'
import { ReactComponent as AngleDownSVG } from '../svgs/angle-down.svg'
import CopyButton from './copy-button'
import NameValue from './name-value'
import { ReactComponent as DeleteSVG } from '../svgs/trash.svg'
import { ReactComponent as DoneSVG } from '../svgs/done.svg'
import { ReactComponent as CancelSVG } from '../svgs/cancel.svg'

interface Props {
	node: Record<string, any> | Array<any>
	depth: number
	name?: number | string
	parent?: Record<string, any> | Array<any>
	deleteHandle?: (_: string | number) => void
}

export default function ObjectNode({ node, depth, name, parent, deleteHandle: _deleteSelf }: Props) {
	const { collapsed, enableClipboard, collapseObjectsAfterLength, editable, onDelete, src } =
		useContext(JsonViewContext)

	const [nodeState, setNodeState] = useState(node)
	const [fold, setFold] = useState(
		collapsed === true ||
			(typeof collapsed === 'number' && depth > collapsed) ||
			(Array.isArray(node) && node.length > collapseObjectsAfterLength) ||
			(isObject(node) && Object.keys(node).length > collapseObjectsAfterLength)
			? true
			: false
	)

	useEffect(() => {
		const originCollapsed =
			(Array.isArray(node) && node.length > collapseObjectsAfterLength) ||
			(isObject(node) && Object.keys(node).length > collapseObjectsAfterLength)

		if (typeof collapsed === 'boolean') {
			setFold(collapsed || originCollapsed)
		} else if (typeof collapsed === 'number') {
			setFold(depth > collapsed || originCollapsed)
		}
	}, [collapsed, collapseObjectsAfterLength])

	// Delete property
	const deleteHandle = (indexOrName: number | string) => {
		if (Array.isArray(nodeState)) {
			nodeState.splice(+indexOrName, 1)
			node.splice(+indexOrName, 1)
			setNodeState([...nodeState])
		} else if (nodeState) {
			delete nodeState[indexOrName]
			//@ts-ignore
			delete node[indexOrName]
			setNodeState({ ...nodeState })
		}
	}

	// Delete self
	const [deleting, setDeleting] = useState(false)
	const isEditing = deleting

	const cancel = () => {
		setDeleting(false)
	}
	const deleteSelf = () => {
		setDeleting(false)
		if (_deleteSelf) _deleteSelf(name!)
		if (onDelete)
			onDelete({ value: node, depth, src, name: name!, parentType: Array.isArray(parent) ? 'array' : 'object' })
	}

	const Icons = (
		<>
			{!fold && !isEditing && <AngleDownSVG onClick={() => setFold(true)} className='jv-chevron' />}

			{isEditing && <DoneSVG className='json-view--edit' style={{ display: 'inline-block' }} onClick={deleteSelf} />}
			{isEditing && <CancelSVG className='json-view--edit' style={{ display: 'inline-block' }} onClick={cancel} />}

			{!fold && !isEditing && enableClipboard && <CopyButton text={JSON.stringify(node)} />}
			{!fold && !isEditing && editable && <DeleteSVG className='json-view--edit' onClick={() => setDeleting(true)} />}
		</>
	)

	if (Array.isArray(nodeState)) {
		return (
			<>
				<span>{'['}</span>

				{Icons}

				{!fold ? (
					<div className='jv-indent'>
						{nodeState.map((n, i) => (
							<NameValue key={i} name={i} value={n} depth={depth} parent={node} deleteHandle={deleteHandle} />
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
	} else if (isObject(nodeState)) {
		return (
			<>
				<span>{'{'}</span>

				{Icons}

				{!fold ? (
					<div className='jv-indent'>
						{Object.entries(nodeState).map(([name, value]) => (
							<NameValue
								key={name}
								name={name}
								value={value}
								depth={depth}
								parent={parent}
								deleteHandle={deleteHandle}
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
