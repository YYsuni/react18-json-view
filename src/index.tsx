import { createContext, useContext, useState } from 'react'
import ChevronIcon from './ChevronDownSvg'

const JsonViewContext = createContext({
	collapseStringsAfterLength: 99,
	collapseObjectsAfterLength: 20
})

export default function JsonView({
	src,
	collapseStringsAfterLength = 99,
	collapseObjectsAfterLength = 20
}: {
	src: any
	collapseStringsAfterLength?: number
	collapseObjectsAfterLength?: number
}) {
	return (
		<JsonViewContext.Provider value={{ collapseStringsAfterLength, collapseObjectsAfterLength }}>
			<code className='json-view'>
				<JsonNode node={src} />
			</code>
		</JsonViewContext.Provider>
	)
}

function JsonNode({ node }: { node: any }) {
	if (Array.isArray(node) || isObject(node)) {
		return <ObjectNode node={node} />
	} else if (typeof node === 'number') return <span className='json-view--number'>{node}</span>
	else if (typeof node === 'string')
		return node.length > 12 ? <LongString str={node} /> : <span className='json-view--string'>"{node}"</span>
	else if (typeof node === 'boolean') return <span className='json-view--boolean'>{String(node)}</span>
	else if (node === null) return <span className='json-view--null'>null</span>
	else return <span className='json-view--string'>{String(node)}</span>
}

function ObjectNode({ node }: { node: Record<string, any> | Array<any> }) {
	const jv = useContext(JsonViewContext)

	const [fold, setFold] = useState(
		Array.isArray(node) && node.length > jv.collapseObjectsAfterLength
			? true
			: isObject(node) && Object.keys(node).length > jv.collapseObjectsAfterLength
			? true
			: false
	)

	if (Array.isArray(node)) {
		return (
			<>
				<span>{'['}</span>

				{!fold && <ChevronIcon onClick={() => setFold(true)} className='jv-chevron' />}

				{!fold ? (
					<div className='jv-indent'>
						{node.map((n, i) => (
							<NameValue key={i} name={i} value={n} />
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
	} else if (isObject(node)) {
		return (
			<>
				<span>{'{'}</span>

				{!fold && <ChevronIcon onClick={() => setFold(true)} className='jv-chevron' />}

				{!fold ? (
					<div className='jv-indent'>
						{Object.entries(node).map(([name, value]) => (
							<NameValue key={name} name={name} value={value} />
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

function LongString({ str }: { str: string }) {
	const jv = useContext(JsonViewContext)

	if (str.length < jv.collapseStringsAfterLength) return <span className='json-view--string'>"{str}"</span>

	const [fold, setFold] = useState(true)

	return (
		<span onClick={() => setFold(!fold)} className='json-view--string cursor-pointer'>
			"{fold ? str.slice(0, 6) + '...' + str.slice(-4) : str}"
		</span>
	)
}

function NameValue({ name, value }: { name: number | string; value: any }) {
	return (
		<div>
			<span className={typeof name === 'number' ? 'json-view--index' : 'json-view--property'}>{name}</span>:{' '}
			<JsonNode node={value} />
		</div>
	)
}

function isObject(node: any) {
	return Object.prototype.toString.call(node) === '[object Object]'
}
