import JsonNode from './json-node'

export default function NameValue({ name, value, depth }: { name: number | string; value: any; depth: number }) {
	return (
		<div className='json-view--pair'>
			<span className={typeof name === 'number' ? 'json-view--index' : 'json-view--property'}>{name}</span>:{' '}
			<JsonNode node={value} depth={depth + 1} />
		</div>
	)
}
