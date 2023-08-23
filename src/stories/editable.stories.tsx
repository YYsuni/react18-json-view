import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import JsonView from '../index'

type TYPE_FC = typeof JsonView

export default {
	title: 'Editable',
	component: JsonView,

	argTypes: {
		src: {
			description: 'Array | Object'
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
		},
		onEdit: ({ newValue, src, oldValue, indexOrName }) => {
			console.log('[onEdit]', indexOrName, newValue, oldValue, src)
		},
		onDelete: ({ value, src, indexOrName }) => {
			console.log('[onDelete]', indexOrName, value, src)
		},
		onAdd: ({ src, indexOrName }) => {
			console.log('[onAdd]', indexOrName, src)
		},
		onChange: ({ src, indexOrName }) => {
			console.log('[onChange]', indexOrName, src)
		}
	},
	decorators: [
		Story => (
			<div
				className='flex h-full items-center justify-center overflow-auto p-8'
				style={{ backgroundImage: 'linear-gradient(140deg, rgb(165, 142, 251), rgb(233, 191, 248))' }}>
				<div className='max-w-[600px] rounded-xl bg-white/90 p-6 font-mono shadow backdrop-blur'>
					<Story />
				</div>
			</div>
		)
	]
} as Meta<TYPE_FC>

export const Primary: StoryObj<TYPE_FC> = {}
export const xs: StoryObj<TYPE_FC> = {
	decorators: [
		Story => (
			<div className='text-xs'>
				<Story />
			</div>
		)
	]
}
export const lg: StoryObj<TYPE_FC> = {
	decorators: [
		Story => (
			<div className='text-lg'>
				<Story />
			</div>
		)
	]
}
export const xl: StoryObj<TYPE_FC> = {
	decorators: [
		Story => (
			<div className='text-xl'>
				<Story />
			</div>
		)
	]
}

export const String: StoryObj<TYPE_FC> = {
	args: {
		src: 'string'
	}
}
