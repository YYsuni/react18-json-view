import Theme from '@/components/theme'
import JsonView from 'react18-json-view'
import GithubSVG from '@/svgs/github.svg'

export default function Hero() {
	return (
		<>
			<div className='mx-auto max-w-[600px] rounded-lg border bg-white p-4 text-sm dark:bg-[#0E0832]'>
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
							return { collapsed: true }
						}
					}}
				/>
			</div>

			<h1 className='mt-6 text-center text-3xl font-medium'>JsonView</h1>
			<p className='mt-2 text-center'>JSON-like viewer for react18.</p>

			<div className='mt-3 flex items-center justify-center gap-2'>
				<a
					href='https://github.com/YYsuni/react18-json-view'
					target='_blank'
					className='flex h-8 items-center rounded-lg border px-2 text-sm'>
					<GithubSVG className='mr-1 h-4 w-4' />
					Github
				</a>
				<Theme />
			</div>
		</>
	)
}
