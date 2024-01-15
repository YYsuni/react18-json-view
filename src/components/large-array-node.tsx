import { useCallback, useContext, useState } from 'react'
import { JsonViewContext } from './json-view'
import { customCopy, objectSize, ifDisplay } from '../utils'
import { ReactComponent as AngleDownSVG } from '../svgs/angle-down.svg'
import CopyButton from './copy-button'
import NameValue from './name-value'
import type { CustomizeOptions } from '../types'

interface Props {
	originNode: Array<any>
	node: Array<any>
	depth: number
	index: number
	deleteHandle?: (_: string | number) => void
	customOptions?: CustomizeOptions
	startIndex: number
}

export default function LargeArrayNode({ originNode, node, depth, index, deleteHandle: _deleteSelf, customOptions, startIndex }: Props) {
	const { enableClipboard, src, onEdit, onChange, forceUpdate, displaySize } = useContext(JsonViewContext)

	const [fold, setFold] = useState(true)

	// Edit property
	const editHandle = useCallback(
		(indexOrName: number | string, newValue: any, oldValue: any) => {
			originNode[indexOrName as number] = newValue
			if (onEdit)
				onEdit({
					newValue,
					oldValue,
					depth,
					src,
					indexOrName,
					parentType: 'array'
				})
			if (onChange) onChange({ type: 'edit', depth, src, indexOrName, parentType: 'array' })
			forceUpdate()
		},
		[node, onEdit, onChange, forceUpdate]
	)

	// Delete property
	const deleteHandle = (index: number | string) => {
		originNode.splice(index as number, 1)
		forceUpdate()
	}

	const Icons = (
		<>
			{!fold && (
				<span onClick={() => setFold(true)} className='jv-size-chevron'>
					{ifDisplay(displaySize, depth, fold) && <span className='jv-size'>{objectSize(node)} Items</span>}

					<AngleDownSVG className='jv-chevron' />
				</span>
			)}

			{!fold && enableClipboard && customCopy(customOptions) && <CopyButton node={node} />}
		</>
	)

	return (
		<div>
			<span>{'['}</span>

			{Icons}

			{!fold ? (
				<div className='jv-indent'>
					{node.map((n, i) => (
						<NameValue
							key={String(index) + String(i)}
							indexOrName={i + startIndex}
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
					{startIndex} ... {startIndex + node.length - 1}
				</button>
			)}

			<span>{']'}</span>

			{/* {fold && ifDisplay(displaySize, depth, fold) && (
				<span onClick={() => setFold(false)} className='jv-size'>
					{objectSize(node)} Items
				</span>
			)} */}
		</div>
	)
}
