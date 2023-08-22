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
				'When an integer value is assigned, strings will be cut off at that length. Collapsed strings are inserted by an ellipsis. String content can be expanded and collapsed by clicking on the string value.',
			table: {
				defaultValue: { summary: 99 }
			}
		},
		collapseObjectsAfterLength: {
			control: 'number',
			description: 'When an integer value is assigned, the object and array will be collapsed initially.',
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
				'When set to true, all nodes will be collapsed by default. Use an integer value to collapse at a particular depth.',
			table: {
				defaultValue: { summary: false }
			}
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
			func: function () {},
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
