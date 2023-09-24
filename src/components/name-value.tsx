import JsonNode from './json-node'

interface Props {
	indexOrName: number | string
	value: any
	depth: number
	parent?: Record<string, any> | Array<any>
	deleteHandle: (indexOrName: string | number) => void
	editHandle: (indexOrName: string | number, newValue: any, oldValue: any) => void
}

export default function NameValue({ indexOrName, value, depth, parent, deleteHandle, editHandle }: Props) {
	return (
		<div className='json-view--pair'>
			<span className={typeof indexOrName === 'number' ? 'json-view--index' : 'json-view--property'}>
				{indexOrName}
			</span>
			:{' '}
			<JsonNode
				node={value}
				depth={depth + 1}
				deleteHandle={deleteHandle}
				editHandle={editHandle}
				parent={parent}
				indexOrName={indexOrName}
			/>
		</div>
	)
}
