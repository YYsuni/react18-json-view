import { useState } from 'react'

export default function LongString({ str }: { str: string }) {
	if (str.length <= 10) return <span className='json-view--string'>"{str}"</span>

	const [fold, setFold] = useState(true)

	return (
		<span onClick={() => setFold(!fold)} className='json-view--string cursor-pointer'>
			"{fold ? str.slice(0, 6) + '...' + str.slice(-4) : str}"
		</span>
	)
}
