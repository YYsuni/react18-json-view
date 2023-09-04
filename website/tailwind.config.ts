import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
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
		fontFamily: {
			sans: ['Open Sans', 'sans-serif'],
			mono: ['Roboto Mono', 'Menlo', 'monospace']
		}
	},
	plugins: []
}
export default config
