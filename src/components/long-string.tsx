import React, { useContext, useRef, useState } from 'react'
import { JsonViewContext } from './json-view'

interface Props {
	str: string
	className: string
	ctrlClick: ((event: React.MouseEvent) => void) | undefined
}

const LongString = React.forwardRef<HTMLSpanElement, Props>(({ str, className, ctrlClick }, ref) => {
	let { collapseStringMode, collapseStringsAfterLength, customizeCollapseStringUI } = useContext(JsonViewContext)
	const [truncated, setTruncated] = useState(true)
	const strRef = useRef<HTMLSpanElement>(null)

	collapseStringsAfterLength = collapseStringsAfterLength > 0 ? collapseStringsAfterLength : 0

	const str_show = str.replace(/\s+/g, ' ')
	const collapseStringUI =
		typeof customizeCollapseStringUI === 'function'
			? customizeCollapseStringUI(str_show, truncated)
			: typeof customizeCollapseStringUI === 'string'
			? customizeCollapseStringUI
			: '...'

	const clickToTruncateOrEdit = (event: React.MouseEvent) => {
		if ((event.ctrlKey || event.metaKey) && ctrlClick) {
			ctrlClick(event)
		} else {
			const selection = window.getSelection()

			if (selection && selection.anchorOffset !== selection.focusOffset && selection.anchorNode?.parentElement === strRef.current) return

			setTruncated(!truncated)
		}
	}

	if (str.length <= collapseStringsAfterLength)
		return (
			<span ref={strRef} className={className} onClick={ctrlClick}>
				"{str}"
			</span>
		)

	if (collapseStringMode === 'address')
		return str.length <= 10 ? (
			<span ref={strRef} className={className} onClick={ctrlClick}>
				"{str}"
			</span>
		) : (
			<span ref={strRef} onClick={clickToTruncateOrEdit} className={className + ' cursor-pointer'}>
				"{truncated ? [str_show.slice(0, 6), collapseStringUI, str_show.slice(-4)] : str}"
			</span>
		)

	if (collapseStringMode === 'directly') {
		return (
			<span ref={strRef} onClick={clickToTruncateOrEdit} className={className + ' cursor-pointer'}>
				"{truncated ? [str_show.slice(0, collapseStringsAfterLength), collapseStringUI] : str}"
			</span>
		)
	}

	if (collapseStringMode === 'word') {
		let index_ahead = collapseStringsAfterLength
		let index_behind = collapseStringsAfterLength + 1
		let str_collapsed = str_show
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
			<span ref={strRef} onClick={clickToTruncateOrEdit} className={className + ' cursor-pointer'}>
				"{truncated ? [str_collapsed, collapseStringUI] : str}"
			</span>
		)
	}

	return (
		<span ref={strRef} className={className}>
			"{str}"
		</span>
	)
})

export default LongString
