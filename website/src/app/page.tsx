'use client'

import 'react18-json-view/src/style.css'
import 'react18-json-view/src/dark.css'

import Installation from '@/contents/installation'
import Hero from '@/contents/hero'
import Usage from '@/contents/usage'
import Themes from '@/contents/themes'

export default function Home() {
	return (
		<main className='container pt-12 max-sm:pt-4 pb-8'>
			<Hero />

			<Installation />

			<Usage />

			<Themes />
		</main>
	)
}
