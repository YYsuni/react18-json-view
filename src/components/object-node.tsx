import { useContext, useEffect, useState } from 'react'
import { JsonViewContext } from './json-view'
import { isObject } from '../utils'
import { ReactComponent as AngleDownSVG } from '../svgs/angle-down.svg'
import CopyButton from './copy-button'
import NameValue from './name-value'

export default function ObjectNode({ node, depth }: { node: Record<string, any> | Array<any>; depth: number }) {
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

				{!fold && jv.enableClipboard && <CopyButton text={JSON.stringify(node)} />}

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

				{!fold && jv.enableClipboard && <CopyButton text={JSON.stringify(node)} />}

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
