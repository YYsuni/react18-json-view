import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import JsonView from './index'

type TYPE_FC = typeof JsonView

export default {
	title: 'JSON View',
	component: JsonView,
	argTypes: {
		src: {
			description: 'Array | Object'
		},
		collapseStringsAfterLength: {
			control: 'number'
		}
	},
	decorators: [
		Story => (
			<div className='rounded-xl bg-white/80 p-6 font-mono shadow'>
				<Story />
			</div>
		)
	]
} as Meta<TYPE_FC>

export const Primary: StoryObj<TYPE_FC> = {
	args: {
		src: {
			string: 'string',
			longString: 'long string long string long string long string',
			number: 123456,
			boolean: false,
			null: null,
			Date: new Date(),
			Symbol: Symbol('JSON View'),
			arr: ['string', 123456, false, null]
		}
	}
}

export const Array: StoryObj<TYPE_FC> = {
	args: {
		src: [
			'string',
			123456,
			false,
			null,
			{ string: 'string', number: 123456, boolean: false, null: null, Date: new Date(), Symbol: Symbol('JSON View') }
		]
	}
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

export const True: StoryObj<TYPE_FC> = {
	args: {
		src: true
	}
}

export const False: StoryObj<TYPE_FC> = {
	args: {
		src: false
	}
}
