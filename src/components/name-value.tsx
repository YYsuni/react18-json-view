import JsonNode from './json-node'
import NameKey from './name-key'

interface Props {
	displayArrayKey: boolean
	indexOrName: number | string
	value: any
	depth: number
	parent?: Record<string, any> | Array<any>
	deleteHandle: (indexOrName: string | number) => void
	editHandle: (indexOrName: string | number, newValue: any, oldValue: any) => void
}

export default function NameValue({ displayArrayKey, indexOrName, value, depth, parent, deleteHandle, editHandle }: Props) {
	return (
		<div className='json-view--pair'>
			<NameKey displayArrayKey={displayArrayKey} indexOrName={indexOrName} parent={parent}>
				<JsonNode node={value} depth={depth + 1} deleteHandle={deleteHandle} editHandle={editHandle} parent={parent} indexOrName={indexOrName} />
			</NameKey>
		</div>
	)
}
