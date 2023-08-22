import { useContext, useRef, useState } from 'react'
import { JsonViewContext } from './json-view'
import { isObject } from '../utils'
import ObjectNode from './object-node'
import LongString from './long-string'
import CopyButton from './copy-button'
import { ReactComponent as EditSVG } from '../svgs/edit.svg'
import { ReactComponent as DoneSVG } from '../svgs/done.svg'
import { ReactComponent as CancelSVG } from '../svgs/cancel.svg'

interface Props {
	node: any
	depth: number
	editValue?: (value: any) => void
}

export default function JsonNode({ node, depth, editValue }: Props) {
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
				if (editValue) editValue(evalValue)
			} catch (e) {
				setType('string')
				setValue(newValue)
				if (editValue) editValue(newValue)
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
						<LongString str={value} ref={valueRef} editing={editing} handleKeyDown={handleKeyDown} />
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
			let className = 'json-view--string'

			switch (type) {
				case 'number':
				case 'bigint':
					className = 'json-view--number'
					break
				case 'boolean':
					className = 'json-view--boolean'
					break
				case 'object':
					className = 'json-view--null'
					break
			}

			return (
				<>
					{editing ? (
						<span
							className={className}
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
