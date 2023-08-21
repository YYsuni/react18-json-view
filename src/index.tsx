import { createContext, useContext, useEffect, useState } from 'react'
import Copy from './Copy'
import AngleDownSVG from './svgs/angle-down.svg'

const JsonViewContext = createContext({
	collapseStringsAfterLength: 99,
	collapseObjectsAfterLength: 20,
	enableClipboard: true,
	collapsed: false as number | boolean,
	editable: false
})

interface Props {
	src: any
	collapseStringsAfterLength?: number
	collapseObjectsAfterLength?: number
	enableClipboard?: boolean
	collapsed?: boolean | number
	editable?: boolean
}

export default function JsonView({
	src,
	collapseStringsAfterLength = 99,
	collapseObjectsAfterLength = 20,
	enableClipboard = true,
	collapsed = false,
	editable = false
}: Props) {
	return (
		<JsonViewContext.Provider
			value={{ collapseStringsAfterLength, collapseObjectsAfterLength, enableClipboard, collapsed, editable }}>
			<code className='json-view'>
				<JsonNode node={src} depth={1} />
			</code>
		</JsonViewContext.Provider>
	)
}

function JsonNode({ node, depth }: { node: any; depth: number }) {
	const jv = useContext(JsonViewContext)

	if (Array.isArray(node) || isObject(node)) {
		return <ObjectNode node={node} depth={depth} />
	} else if (typeof node === 'string')
		return (
			<>
				{node.length > jv.collapseStringsAfterLength ? (
					<LongString str={node} />
				) : (
					<span className='json-view--string'>"{node}"</span>
				)}

				{jv.enableClipboard && <Copy text={node} />}
			</>
		)
	else {
		const type = typeof node
		const value = String(node)
		return (
			<>
				{type === 'number' || type === 'bigint' ? (
					<span className='json-view--number'>{value}</span>
				) : type === 'boolean' ? (
					<span className='json-view--boolean'>{value}</span>
				) : node === null ? (
					<span className='json-view--null'>null</span>
				) : (
					<span className='json-view--string'>{value}</span>
				)}

				{jv.enableClipboard && <Copy text={value} />}
			</>
		)
	}
}

function ObjectNode({ node, depth }: { node: Record<string, any> | Array<any>; depth: number }) {
	const jv = useContext(JsonViewContext)

	const [fold, setFold] = useState(
		jv.collapsed === true ||
			(typeof jv.collapsed === 'number' && depth > jv.collapsed) ||
			(Array.isArray(node) && node.length > jv.collapseObjectsAfterLength) ||
			(isObject(node) && Object.keys(node).length > jv.collapseObjectsAfterLength)
			? true
			: false
	)

	useEffect(() => {
		const originCollapsed =
			(Array.isArray(node) && node.length > jv.collapseObjectsAfterLength) ||
			(isObject(node) && Object.keys(node).length > jv.collapseObjectsAfterLength)

		if (typeof jv.collapsed === 'boolean') {
			setFold(jv.collapsed || originCollapsed)
		} else if (typeof jv.collapsed === 'number') {
			setFold(depth > jv.collapsed || originCollapsed)
		}
	}, [jv.collapsed, jv.collapseObjectsAfterLength, jv.collapseObjectsAfterLength])

	if (Array.isArray(node)) {
		return (
			<>
				<span>{'['}</span>

				{!fold && <AngleDownSVG onClick={() => setFold(true)} className='jv-chevron' />}

				{!fold && jv.enableClipboard && <Copy text={JSON.stringify(node)} />}

				{!fold ? (
					<div className='jv-indent'>
						{node.map((n, i) => (
							<NameValue key={i} name={i} value={n} depth={depth} />
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

				{!fold && <AngleDownSVG onClick={() => setFold(true)} className='jv-chevron' />}

				{!fold && jv.enableClipboard && <Copy text={JSON.stringify(node)} />}

				{!fold ? (
					<div className='jv-indent'>
						{Object.entries(node).map(([name, value]) => (
							<NameValue key={name} name={name} value={value} depth={depth} />
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
	if (str.length <= 10) return <span className='json-view--string'>"{str}"</span>

	const [fold, setFold] = useState(true)

	return (
		<span onClick={() => setFold(!fold)} className='json-view--string cursor-pointer'>
			"{fold ? str.slice(0, 6) + '...' + str.slice(-4) : str}"
		</span>
	)
}

function NameValue({ name, value, depth }: { name: number | string; value: any; depth: number }) {
	return (
		<div className='json-view--pair'>
			<span className={typeof name === 'number' ? 'json-view--index' : 'json-view--property'}>{name}</span>:{' '}
			<JsonNode node={value} depth={depth + 1} />
		</div>
	)
}

function isObject(node: any) {
	return Object.prototype.toString.call(node) === '[object Object]'
}
