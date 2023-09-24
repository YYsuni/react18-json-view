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
import CollapseString from '@/contents/collapse-string'
import DisplaySize from '@/contents/display-size'

export default function Home() {
	return (
		<main className='container pb-20 pt-12 max-sm:pt-4'>
			<Hero />

			<Installation />

			<Usage />

			<Themes />

			<Collapsed />
			<CollapseString />

			<DisplaySize />

			<Editable />

			<Customization />
		</main>
	)
}
