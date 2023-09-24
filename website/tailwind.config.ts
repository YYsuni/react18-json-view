import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/contents/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		container: {
			padding: {
				DEFAULT: '1rem'
			},
			center: true,
			screens: ['820px']
		},

		extend: {
			fontFamily: {
				sans: ['Open Sans', 'sans-serif'],
				mono: ['Roboto Mono', 'Menlo', 'monospace']
			},
			screens: {
				'max-xl': { max: '1280px' },
				'max-lg': { max: '1024px' },
				'max-md': { max: '768px' },
				'max-sm': { max: '640px' },
				'max-xs': { max: '360px' }
			}
		}
	},
	plugins: []
}
export default config
