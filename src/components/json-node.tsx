import { useContext, useRef, useState } from 'react'
import { JsonViewContext } from './json-view'
import { isObject } from '../utils'
import ObjectNode from './object-node'
import LongString from './long-string'
import CopyButton from './copy-button'
import { ReactComponent as EditSVG } from '../svgs/edit.svg'
import { ReactComponent as DoneSVG } from '../svgs/done.svg'
import { ReactComponent as CancelSVG } from '../svgs/cancel.svg'

export default function JsonNode({ node, depth }: { node: any; depth: number }) {
	const { collapseStringsAfterLength, enableClipboard, editable } = useContext(JsonViewContext)

	if (Array.isArray(node) || isObject(node)) {
		return <ObjectNode node={node} depth={depth} />
	} else {
		const [editing, setEditing] = useState(false)
		const [value, setValue] = useState(String(node))
		const [type, setType] = useState(typeof node)
		const valueRef = useRef<HTMLSpanElement>(null)

		const edit = () => {
			setEditing(true)
			setTimeout(() => {
				window.getSelection()?.selectAllChildren(valueRef.current!)
				valueRef.current?.focus()
			})
		}
		const done = () => {
			const newValue = valueRef.current!.innerText

			try {
				const evalValue = eval(newValue)
				const newType = typeof evalValue

				setType(newType)
				setValue(String(evalValue))
			} catch (e) {
				setType('string')
				setValue(newValue)
			}

			setEditing(false)
		}
		const cancel = () => {
			setEditing(false)
			setValue(value)
			setType(type)
		}

		const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === 'Enter') {
				event.preventDefault()
				done()
			} else if (event.key === 'Escape') {
				cancel()
			}
		}

		const Icons = (
			<>
				{editing && <DoneSVG className='json-view--edit' style={{ display: 'inline-block' }} onClick={done} />}
				{editing && <CancelSVG className='json-view--edit' style={{ display: 'inline-block' }} onClick={cancel} />}

				{!editing && enableClipboard && <CopyButton text={node} />}
				{!editing && editable && <EditSVG className='json-view--edit' onClick={edit} />}
			</>
		)

		if (type === 'string')
			return (
				<>
					{node.length > collapseStringsAfterLength ? (
						<LongString str={node} />
					) : editing ? (
						<span
							className='json-view--string'
							contentEditable={editing}
							dangerouslySetInnerHTML={{ __html: `"${value}"` }}
							ref={valueRef}
							onKeyDown={handleKeyDown}
						/>
					) : (
						<span className='json-view--string'>"{value}"</span>
					)}

					{Icons}
				</>
			)
		else {
			return (
				<>
					{type === 'number' || type === 'bigint' ? (
						editing ? (
							<span
								className='json-view--number'
								contentEditable={editing}
								dangerouslySetInnerHTML={{ __html: value }}
								ref={valueRef}
								onKeyDown={handleKeyDown}
							/>
						) : (
							<span className='json-view--number'>{value}</span>
						)
					) : type === 'boolean' ? (
						editing ? (
							<span
								className='json-view--boolean'
								contentEditable={editing}
								dangerouslySetInnerHTML={{ __html: value }}
								ref={valueRef}
								onKeyDown={handleKeyDown}
							/>
						) : (
							<span className='json-view--boolean'>{value}</span>
						)
					) : type === 'object' ? (
						editing ? (
							<span
								className='json-view--null'
								contentEditable={editing}
								dangerouslySetInnerHTML={{ __html: value }}
								ref={valueRef}
								onKeyDown={handleKeyDown}
							/>
						) : (
							<span className='json-view--null'>{value}</span>
						)
					) : editing ? (
						<span
							className='json-view--string'
							contentEditable={editing}
							dangerouslySetInnerHTML={{ __html: value }}
							ref={valueRef}
							onKeyDown={handleKeyDown}
						/>
					) : (
						<span className='json-view--string'>{value}</span>
					)}

					{Icons}
				</>
			)
		}
	}
}
