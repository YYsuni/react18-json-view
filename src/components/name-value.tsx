import JsonNode from './json-node'

interface Props {
	name: number | string
	value: any
	depth: number
	parent?: Record<string, any> | Array<any>
	deleteHandle: (_: string | number) => void
}

export default function NameValue({ name, value, depth, parent, deleteHandle }: Props) {
	return (
		<div className='json-view--pair'>
			<span className={typeof name === 'number' ? 'json-view--index' : 'json-view--property'}>{name}</span>:{' '}
			<JsonNode node={value} depth={depth + 1} deleteHandle={deleteHandle} parent={parent} name={name} />
		</div>
	)
}
