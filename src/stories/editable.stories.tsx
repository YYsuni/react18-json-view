import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import JsonView from '../index'
import { argTypes } from './share'

type TYPE_FC = typeof JsonView

export default {
	title: 'Editable',
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

export const LongString: StoryObj<TYPE_FC> = {
	args: {
		src: 'long string long string long string long string'
	}
}

export const Number: StoryObj<TYPE_FC> = {
	args: {
		src: 12312312321
	}
}

export const Null: StoryObj<TYPE_FC> = {
	args: {
		src: null
	}
}

export const Boolean: StoryObj<TYPE_FC> = {
	args: {
		src: true
	}
}

export const Undefined: StoryObj<TYPE_FC> = {
	args: {
		src: undefined
	}
}

export const Collapsed_Boolean: StoryObj<TYPE_FC> = {
	args: {
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
		collapsed: true
	},
	decorators: [
		Story => (
			<div style={{ minWidth: 300 }}>
				<Story />
			</div>
		)
	]
}

export const Collapsed_Number: StoryObj<TYPE_FC> = {
	args: {
		src: {
			boolean: false,
			null: null,
			obj: {
				k1: 123,
				k2: '123',
				k3: false,
				k4: {
					k: {
						k: {
							k: 'k5'
						}
					}
				}
			},
			arr: ['string', 123456, false, null, [123, 123, 123, [123, 123, 123]]]
		},
		collapsed: 2
	},
	decorators: [
		Story => (
			<div style={{ minWidth: 300 }}>
				<Story />
			</div>
		)
	]
}
