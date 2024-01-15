import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import JsonView from '../index'
import { argTypes, largeArray } from './share'
import { stringifyForCopying } from '../utils'

type TYPE_FC = typeof JsonView

export default {
	title: 'JSON View',
	component: JsonView,

	argTypes,
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

export const DisplaySize: StoryObj<TYPE_FC> = {
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
		displaySize: true
	}
}

export const SM: StoryObj<TYPE_FC> = {
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
		enableClipboard: true,
		displaySize: true
	},
	decorators: [
		Story => (
			<div className='text-sm'>
				<Story />
			</div>
		)
	]
}

export const XS: StoryObj<TYPE_FC> = {
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
		enableClipboard: true,
		displaySize: true
	},
	decorators: [
		Story => (
			<div className='text-xs'>
				<Story />
			</div>
		)
	]
}
export const LG: StoryObj<TYPE_FC> = {
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
		enableClipboard: true,
		displaySize: true
	},
	decorators: [
		Story => (
			<div className='text-lg'>
				<Story />
			</div>
		)
	]
}
export const XL: StoryObj<TYPE_FC> = {
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
		enableClipboard: true,
		displaySize: true
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
		},
		collapseObjectsAfterLength: 20
	}
}

export const Array: StoryObj<TYPE_FC> = {
	args: {
		src: ['string', 123456, false, null, { string: 'string', number: 123456, boolean: false, null: null, Date: new Date(), Symbol: Symbol('JSON View') }],
		collapsed: 1
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
		],
		collapseObjectsAfterLength: 20
	}
}

export const String: StoryObj<TYPE_FC> = {
	args: {
		src: 'string'
	}
}

export const LongString: StoryObj<TYPE_FC> = {
	args: {
		src: 'long string long string long string long string',
		collapseStringsAfterLength: 20,
		collapseStringMode: 'word'
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

export const Collapsed_Function: StoryObj<TYPE_FC> = {
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
			arr: ['string', 123456, false, null, [123, 123, 123, [123, 123, 123]]],
			arr2: [1, 2]
		},
		collapsed: params => {
			if (params.depth > 3) return true
			if (params.depth > 2 && params.size > 4) return true
			return false
		}
	},
	decorators: [
		Story => (
			<div style={{ minWidth: 300 }}>
				<Story />
			</div>
		)
	]
}

export const CustomizeNode: StoryObj<TYPE_FC> = {
	args: {
		editable: true,
		src: {
			suni: 'suni',
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
			arr: ['string', 123456, false, null, [1, 2, 3]]
		},
		customizeNode: params => {
			if (params.node === 'suni') return () => <span className='underline'>suni</span>
			if (params.node === 123) return <b>123</b>
			if (params.indexOrName === 'obj') return { add: false, delete: false, enableClipboard: false }
			if (params.node === 'string') return { edit: true, enableClipboard: false, delete: false }
			if (params.indexOrName === 'arr') return { collapsed: false }
			if (params.depth > 2) return { collapsed: true }
			if (params.indexOrName === 'func') return { className: 'underline' }
		}
	},
	decorators: [
		Story => (
			<div style={{ minWidth: 300 }}>
				<Story />
			</div>
		)
	]
}

export const MatchesURL: StoryObj<TYPE_FC> = {
	args: {
		src: {
			string: 'string',
			link: 'https://www.google.com/',
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
		matchesURL: true
	}
}

export const CustomizeCopy: StoryObj<TYPE_FC> = {
	args: {
		src: {
			string: 'string',
			link: 'https://www.google.com/',
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
		customizeCopy: (node: any) => stringifyForCopying(node, 4)
	}
}

export const LargeArray: StoryObj<TYPE_FC> = {
	args: {
		src: {
			obj: {
				k1: 123,
				k2: '123',
				k3: false
			},
			largeArray: largeArray
		},
		displaySize: true
	}
}
