import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import JsonView from '../index'
import '../dark.css'

type TYPE_FC = typeof JsonView

export default {
	title: 'Themes',
	component: JsonView,

	argTypes: {
		src: {
			description: 'Array | Object'
		},
		dark: {
			control: 'boolean',
			description: 'Boolean',
			table: {
				defaultValue: { summary: false }
			}
		},
		collapseStringsAfterLength: {
			control: 'number',
			description:
				'When an integer value is assigned, strings longer than that length will be truncated and indicated by an ellipsis. To expand or collapse the string content, simply click on the string value.',
			table: {
				defaultValue: { summary: 99 }
			}
		},
		collapseObjectsAfterLength: {
			control: 'number',
			description: 'When an integer value is assigned, the object and array will initially collapse.',
			table: {
				defaultValue: { summary: 20 }
			}
		},
		enableClipboard: {
			control: 'boolean',
			description: 'Boolean',
			table: {
				defaultValue: { summary: false }
			}
		},
		collapsed: {
			description:
				'When set to true, all nodes will be collapsed by default. Use an integer value to collapse at a specific depth.',
			table: {
				defaultValue: { summary: false }
			}
		},
		editable: {
			table: {
				defaultValue: { summary: false }
			},
			description:
				'When set to true, you can add, edit, or delete the property, and the actions will trigger onAdd, onEdit, or onDelete.'
		},
		onAdd: {
			description: `(params: { indexOrName: string | number, depth: number, src: any; parentType: 'object' | 'array' }) => void`
		},
		onDelete: {
			description: `(params: {
				value: any,
				indexOrName: string | number,
				depth: number,
				src: any,
				parentType: 'object' | 'array',
			}) => void`
		},
		onEdit: {
			description: `(params: {
				newValue: any,
				oldValue: any,
				depth: number,
				src: any,
				indexOrName: string | number,
				parentType: 'object' | 'array',
			}) => void`
		}
	},
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
