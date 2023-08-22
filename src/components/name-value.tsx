import { useContext } from 'react'
import JsonNode from './json-node'
import { JsonViewContext } from './json-view'

interface Props {
	name: number | string
	value: any
	depth: number
	parent?: Record<string, any> | Array<any>
}

export default function NameValue({ name, value, depth, parent }: Props) {
	const { onEdit, src } = useContext(JsonViewContext)

	const editValue = (newValue: any) => {
		if (Array.isArray(parent)) {
			parent[+name] = newValue

			if (onEdit) onEdit({ newValue, oldValue: value, depth, src, name, parentType: 'array' })
		} else if (parent) {
			parent[name] = value

			if (onEdit) onEdit({ newValue, oldValue: value, depth, src, name, parentType: 'object' })
		}
	}

	return (
		<div className='json-view--pair'>
			<span className={typeof name === 'number' ? 'json-view--index' : 'json-view--property'}>{name}</span>:{' '}
			<JsonNode node={value} depth={depth + 1} editValue={editValue} />
		</div>
	)
}
