import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		{
			name: '@storybook/addon-styling',
			options: {
				postCss: true
			}
		}
	],
	framework: {
		name: '@storybook/react-vite',
		options: {}
	},
	docs: {
		autodocs: true
	},
	viteFinal(config) {
		return mergeConfig(config, {
			plugins: [svgr()]
		})
	}
}
export default config
