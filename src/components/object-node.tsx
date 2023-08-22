import { useContext, useEffect, useState } from 'react'
import { JsonViewContext } from './json-view'
import { isObject } from '../utils'
import { ReactComponent as AngleDownSVG } from '../svgs/angle-down.svg'
import CopyButton from './copy-button'
import NameValue from './name-value'

interface Props {
	node: Record<string, any> | Array<any>
	depth: number
}

export default function ObjectNode({ node, depth }: Props) {
	const { collapsed, enableClipboard, collapseObjectsAfterLength } = useContext(JsonViewContext)

	const [fold, setFold] = useState(
		collapsed === true ||
			(typeof collapsed === 'number' && depth > collapsed) ||
			(Array.isArray(node) && node.length > collapseObjectsAfterLength) ||
			(isObject(node) && Object.keys(node).length > collapseObjectsAfterLength)
			? true
			: false
	)

	useEffect(() => {
		const originCollapsed =
			(Array.isArray(node) && node.length > collapseObjectsAfterLength) ||
			(isObject(node) && Object.keys(node).length > collapseObjectsAfterLength)

		if (typeof collapsed === 'boolean') {
			setFold(collapsed || originCollapsed)
		} else if (typeof collapsed === 'number') {
			setFold(depth > collapsed || originCollapsed)
		}
	}, [collapsed, collapseObjectsAfterLength])

	if (Array.isArray(node)) {
		return (
			<>
				<span>{'['}</span>

				{!fold && <AngleDownSVG onClick={() => setFold(true)} className='jv-chevron' />}

				{!fold && enableClipboard && <CopyButton text={JSON.stringify(node)} />}

				{!fold ? (
					<div className='jv-indent'>
						{node.map((n, i) => (
							<NameValue key={i} name={i} value={n} depth={depth} parent={node} />
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

				{!fold && enableClipboard && <CopyButton text={JSON.stringify(node)} />}

				{!fold ? (
					<div className='jv-indent'>
						{Object.entries(node).map(([name, value]) => (
							<NameValue key={name} name={name} value={value} depth={depth} parent={parent} />
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
