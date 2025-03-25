import { useContext } from 'react'
import { JsonViewContext } from './json-view'

import JsonNode from './json-node'

interface Props {
	indexOrName: number | string
	value: any
	depth: number
	parent?: Record<string, any> | Array<any>
	parentPath: string[]
	deleteHandle: (indexOrName: string | number, parentPath: string[]) => void
	editHandle: (indexOrName: string | number, newValue: any, oldValue: any, parentPath: string[]) => void
}

export default function NameValue({ indexOrName, value, depth, deleteHandle, editHandle, parent, parentPath }: Props) {
	const { displayArrayIndex } = useContext(JsonViewContext)
	const isArray = Array.isArray(parent)

	return (
		<div className='json-view--pair'>
			{!isArray || (isArray && displayArrayIndex) ? (
				<>
					<span className={typeof indexOrName === 'number' ? 'json-view--index' : 'json-view--property'}>{indexOrName}</span>:{' '}
				</>
			) : (
				<></>
			)}
			<JsonNode
				node={value}
				depth={depth + 1}
				deleteHandle={(indexOrName, parentPath) => deleteHandle(indexOrName, parentPath)}
				editHandle={(indexOrName, newValue, oldValue, parentPath) => editHandle(indexOrName, newValue, oldValue, parentPath)}
				parent={parent}
				indexOrName={indexOrName}
				parentPath={parentPath}
			/>
		</div>
	)
}
