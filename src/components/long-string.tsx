import React, { useContext, useState } from 'react'
import { JsonViewContext } from './json-view'

interface Props {
	str: string
	editing: boolean
	handleKeyDown: (_: React.KeyboardEvent<HTMLDivElement>) => void
	className: string
}

const LongString = React.forwardRef<HTMLSpanElement, Props>(({ str, editing, handleKeyDown, className }, ref) => {
	let { collapseStringMode, collapseStringsAfterLength } = useContext(JsonViewContext)
	const [fold, setFold] = useState(true)

	collapseStringsAfterLength = collapseStringsAfterLength > 0 ? collapseStringsAfterLength : 0

	if (editing)
		return (
			<span
				className={className}
				contentEditable={editing}
				dangerouslySetInnerHTML={{ __html: `"${str}"` }}
				ref={ref}
				onKeyDown={handleKeyDown}
			/>
		)

	if (collapseStringMode === 'address')
		return str.length <= 10 ? (
			<span className={className}>"{str}"</span>
		) : (
			<span onClick={() => setFold(!fold)} className={className + ' cursor-pointer'}>
				"{fold ? str.slice(0, 6) + '...' + str.slice(-4) : str}"
			</span>
		)

	if (str.length <= collapseStringsAfterLength) return <span className={className}>"{str}"</span>

	if (collapseStringMode === 'directly') {
		return (
			<span onClick={() => setFold(!fold)} className={className + ' cursor-pointer'}>
				"{fold ? str.slice(0, collapseStringsAfterLength) + '...' : str}"
			</span>
		)
	}

	if (collapseStringMode === 'word') {
		let index_ahead = collapseStringsAfterLength
		let index_behind = collapseStringsAfterLength + 1
		let str_collapsed = str
		let count = 1

		while (true) {
			if (/\W/.test(str[index_ahead])) {
				str_collapsed = str.slice(0, index_ahead)
				break
			}
			if (/\W/.test(str[index_behind])) {
				str_collapsed = str.slice(0, index_behind)
				break
			}
			if (count === 6) {
				str_collapsed = str.slice(0, collapseStringsAfterLength)
				break
			}

			count++
			index_ahead--
			index_behind++
		}

		return (
			<span onClick={() => setFold(!fold)} className={className + ' cursor-pointer'}>
				"{fold ? str_collapsed + '...' : str}"
			</span>
		)
	}

	return <span className={className}>"{str}"</span>
})

export default LongString
