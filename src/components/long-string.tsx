import React, { useState } from 'react'

interface Props {
	str: string
	editing: boolean
	handleKeyDown: (_: React.KeyboardEvent<HTMLDivElement>) => void
}

const LongString = React.forwardRef<HTMLSpanElement, Props>(({ str, editing, handleKeyDown }, ref) => {
	if (str.length <= 10) return <span className='json-view--string'>"{str}"</span>

	const [fold, setFold] = useState(true)

	return editing ? (
		<span
			className='json-view--string'
			contentEditable={editing}
			dangerouslySetInnerHTML={{ __html: `"${str}"` }}
			ref={ref}
			onKeyDown={handleKeyDown}
		/>
	) : (
		<span onClick={() => setFold(!fold)} className='json-view--string cursor-pointer'>
			"{fold ? str.slice(0, 6) + '...' + str.slice(-4) : str}"
		</span>
	)
})

export default LongString
