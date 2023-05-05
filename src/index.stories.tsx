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

export const Primary: StoryObj<TYPE_FC> = {
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
		}
	}
}

export const Copy: StoryObj<TYPE_FC> = {
	args: {
		src: {
			string: 'string',
			longString: 'long string long string long string long string long string long string',
			number: 123456,
			boolean: false,
			null: null,
			func: function () {},
			Symbol: Symbol('JSON View'),
			arr: ['string', 123456, false, null]
		},
		enableClipboard: true
	}
}

export const Copy_sm: StoryObj<TYPE_FC> = {
	args: {
		src: {
			string: 'string',
			longString: 'long string long string long string long string long string long string',
			number: 123456,
			boolean: false,
			null: null,
			func: function () {},
			Symbol: Symbol('JSON View'),
			arr: ['string', 123456, false, null]
		},
		enableClipboard: true
	},
	decorators: [
		Story => (
			<div className='text-sm'>
				<Story />
			</div>
		)
	]
}

export const Copy_xs: StoryObj<TYPE_FC> = {
	args: {
		src: {
			string: 'string',
			longString: 'long string long string long string long string long string long string',
			number: 123456,
			boolean: false,
			null: null,
			func: function () {},
			Symbol: Symbol('JSON View'),
			arr: ['string', 123456, false, null]
		},
		enableClipboard: true
	},
	decorators: [
		Story => (
			<div className='text-xs'>
				<Story />
			</div>
		)
	]
}
export const Copy_lg: StoryObj<TYPE_FC> = {
	args: {
		src: {
			string: 'string',
			longString: 'long string long string long string long string long string long string',
			number: 123456,
			boolean: false,
			null: null,
			func: function () {},
			Symbol: Symbol('JSON View'),
			arr: ['string', 123456, false, null]
		},
		enableClipboard: true
	},
	decorators: [
		Story => (
			<div className='text-lg'>
				<Story />
			</div>
		)
	]
}
export const Copy_xl: StoryObj<TYPE_FC> = {
	args: {
		src: {
			string: 'string',
			longString: 'long string long string long string long string long string long string',
			number: 123456,
			boolean: false,
			null: null,
			func: function () {},
			Symbol: Symbol('JSON View'),
			arr: ['string', 123456, false, null]
		},
		enableClipboard: true
	},
	decorators: [
		Story => (
			<div className='text-xl'>
				<Story />
			</div>
		)
	]
}

export const BigObject: StoryObj<TYPE_FC> = {
	args: {
		src: {
			string: 'string',
			longString: 'long string long string long string long string',
			number: 123456,
			boolean: false,
			null: null,
			Date: new Date(),
			Symbol: Symbol('JSON View'),
			arr: ['string', 123456, false, null],

			bigObject: {
				abc0: 'abc',
				abc1: 'abc',
				abc2: 'abc',
				abc3: 'abc',
				abc4: 'abc',
				abc5: 'abc',
				abc6: 'abc',
				abc7: 'abc',
				abc8: 'abc',
				abc9: 'abc',
				abc10: 'abc',
				abc11: 'abc',
				abc12: 'abc',
				abc13: 'abc',
				abc14: 'abc',
				abc15: 'abc',
				abc16: 'abc',
				abc17: 'abc',
				abc18: 'abc',
				abc19: 'abc',
				abc20: 'abc',
				abc21: 'abc',
				abc22: 'abc',
				abc23: 'abc',
				abc24: 'abc',
				abc25: 'abc',
				abc26: 'abc',
				abc27: 'abc',
				abc28: 'abc',
				abc29: 'abc'
			}
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

export const BigArray: StoryObj<TYPE_FC> = {
	args: {
		src: [
			'string',
			123456,
			false,
			null,
			{ string: 'string', number: 123456, boolean: false, null: null, Date: new Date(), Symbol: Symbol('JSON View') },
			[
				'string',
				123456,
				false,
				'string',
				123456,
				false,
				'string',
				123456,
				false,
				'string',
				123456,
				false,
				'string',
				123456,
				false,
				'string',
				123456,
				false,
				'string',
				123456,
				false,
				'string',
				123456,
				false
			]
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
