'use client'

import 'react18-json-view/src/style.css'
import 'react18-json-view/src/dark.css'

import Installation from '@/contents/installation'
import Hero from '@/contents/hero'
import Usage from '@/contents/usage'
import Themes from '@/contents/themes'
import Collapsed from '@/contents/collapsed'
import Editable from '@/contents/editable'
import Customization from '@/contents/customization'

export default function Home() {
	return (
		<main className='container pt-12 max-sm:pt-4 pb-20'>
			<Hero />

			<Installation />

			<Usage />

			<Themes />

			<Collapsed />

			<Editable />

			<Customization />
		</main>
	)
}
