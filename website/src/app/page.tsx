'use client'

import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'

export default function Home() {
	return (
		<main className='container pt-12'>
			<div className=' text-sm border p-4 rounded-lg mx-auto bg-white max-w-[600px]'>
				<JsonView
					src={{
						string: 'string',
						number: 123456,
						boolean: false,
						null: null,
						func: function () {},
						Symbol: Symbol('JSON View'),
						obj: {
							k1: 123,
							k2: '123',
							k3: false
						},
						arr: ['string', 123456, false, null]
					}}
					customizeNode={params => {
						if (Array.isArray(params.node)) {
							return { edit: true }
						}
					}}
				/>
			</div>

			<h1 className='text-3xl font-medium text-center mt-3'>JsonView</h1>
		</main>
	)
}
