import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import JsonView from '../index'
import '../dark.css'
import { argTypes } from './share'

type TYPE_FC = typeof JsonView

export default {
	title: 'Themes',
	component: JsonView,

	argTypes,
	args: {
		enableClipboard: true,
		editable: true,
		src: {
			string: 'string',
			longString: 'long string long string long string long string long string long string',
			number: 123456,
			boolean: false,
			null: null,
			func: function () {
				console.log('Hello World')
			},
			Symbol: Symbol('JSON View'),
			obj: {
				k1: 123,
				k2: '123',
				k3: false
			},
			arr: ['string', 123456, false, null]
		}
	}
} as Meta<TYPE_FC>

export const Default: StoryObj<TYPE_FC> = {
	args: {
		theme: 'default'
	},
	decorators: [
		Story => (
			<div className='flex h-full items-center justify-center overflow-auto bg-[#eee] p-8'>
				<div className='max-w-[600px] rounded-xl bg-white p-6 font-mono shadow backdrop-blur'>
					<Story />
				</div>
			</div>
		)
	]
}
export const Default_Dark: StoryObj<TYPE_FC> = {
	args: {
		theme: 'default',
		dark: true
	},
	decorators: [
		Story => (
			<div className='flex h-full items-center justify-center overflow-auto bg-[#334] p-8'>
				<div className='max-w-[600px] rounded-xl bg-[#0E0832] p-6 font-mono shadow backdrop-blur'>
					<Story />
				</div>
			</div>
		)
	]
}

export const Accessibility: StoryObj<TYPE_FC> = {
	args: {
		theme: 'a11y'
	},
	decorators: [
		Story => (
			<div className='flex h-full items-center justify-center overflow-auto bg-[#eee] p-8'>
				<div className='max-w-[600px] rounded-xl bg-[#fefefe] p-6 font-mono shadow backdrop-blur'>
					<Story />
				</div>
			</div>
		)
	]
}
export const Accessibility_Dark: StoryObj<TYPE_FC> = {
	args: {
		theme: 'a11y',
		dark: true
	},
	decorators: [
		Story => (
			<div className='flex h-full items-center justify-center overflow-auto bg-[#333] p-8 '>
				<div className='max-w-[600px] rounded-xl bg-[#2B2B2B] p-6 font-mono shadow backdrop-blur'>
					<Story />
				</div>
			</div>
		)
	]
}

export const Github: StoryObj<TYPE_FC> = {
	args: {
		theme: 'github'
	},
	decorators: [
		Story => (
			<div className='flex h-full items-center justify-center overflow-auto bg-[#eee] p-8'>
				<div className='max-w-[600px] rounded-xl bg-[#fff] p-6 font-mono shadow backdrop-blur'>
					<Story />
				</div>
			</div>
		)
	]
}
export const Github_Dark: StoryObj<TYPE_FC> = {
	args: {
		theme: 'github',
		dark: true
	},
	decorators: [
		Story => (
			<div className='flex h-full items-center justify-center overflow-auto bg-[#333] p-8'>
				<div className='max-w-[600px] rounded-xl bg-[#24292E] p-6 font-mono shadow backdrop-blur'>
					<Story />
				</div>
			</div>
		)
	]
}

export const Vscode: StoryObj<TYPE_FC> = {
	args: {
		theme: 'vscode'
	},
	decorators: [
		Story => (
			<div className='flex h-full items-center justify-center overflow-auto bg-[#eee] p-8'>
				<div className='max-w-[600px] rounded-xl bg-[#fff] p-6 font-mono shadow backdrop-blur'>
					<Story />
				</div>
			</div>
		)
	]
}
export const Vscode_Dark: StoryObj<TYPE_FC> = {
	args: {
		theme: 'vscode',
		dark: true
	},
	decorators: [
		Story => (
			<div className='flex h-full items-center justify-center overflow-auto bg-[#333] p-8'>
				<div className='max-w-[600px] rounded-xl bg-[#1e1e1e] p-6 font-mono shadow backdrop-blur'>
					<Story />
				</div>
			</div>
		)
	]
}

export const Atom: StoryObj<TYPE_FC> = {
	args: {
		theme: 'atom'
	},
	decorators: [
		Story => (
			<div className='flex h-full items-center justify-center overflow-auto bg-[#eee] p-8'>
				<div className='max-w-[600px] rounded-xl bg-[#fff] p-6 font-mono shadow backdrop-blur'>
					<Story />
				</div>
			</div>
		)
	]
}
export const Atom_Dark: StoryObj<TYPE_FC> = {
	args: {
		theme: 'atom',
		dark: true
	},
	decorators: [
		Story => (
			<div className='flex h-full items-center justify-center overflow-auto bg-[#333] p-8'>
				<div className='max-w-[600px] rounded-xl bg-[#282C34] p-6 font-mono shadow backdrop-blur'>
					<Story />
				</div>
			</div>
		)
	]
}

export const Winter_is_Coming: StoryObj<TYPE_FC> = {
	args: {
		theme: 'winter-is-coming'
	},
	decorators: [
		Story => (
			<div className='flex h-full items-center justify-center overflow-auto bg-[#eee] p-8'>
				<div className='max-w-[600px] rounded-xl bg-[#fff] p-6 font-mono shadow backdrop-blur'>
					<Story />
				</div>
			</div>
		)
	]
}
export const Winter_is_Coming_Dark: StoryObj<TYPE_FC> = {
	args: {
		theme: 'winter-is-coming',
		dark: true
	},
	decorators: [
		Story => (
			<div className='flex h-full items-center justify-center overflow-auto bg-[#333] p-8'>
				<div className='max-w-[600px] rounded-xl bg-[#011627] p-6 font-mono shadow backdrop-blur'>
					<Story />
				</div>
			</div>
		)
	]
}
