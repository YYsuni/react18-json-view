import React, { useState } from 'react'

interface Props {
	str: string
	editing: boolean
	handleKeyDown: (_: React.KeyboardEvent<HTMLDivElement>) => void
	className: string
}

const LongString = React.forwardRef<HTMLSpanElement, Props>(({ str, editing, handleKeyDown, className }, ref) => {
	const [fold, setFold] = useState(true)

	return editing ? (
		<span
			className={className}
			contentEditable={editing}
			dangerouslySetInnerHTML={{ __html: `"${str}"` }}
			ref={ref}
			onKeyDown={handleKeyDown}
		/>
	) : str.length <= 10 ? (
		<span className={className}>"{str}"</span>
	) : (
		<span onClick={() => setFold(!fold)} className={className + ' cursor-pointer'}>
			"{fold ? str.slice(0, 6) + '...' + str.slice(-4) : str}"
		</span>
	)
})

export default LongString
