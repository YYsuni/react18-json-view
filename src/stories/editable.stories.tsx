import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import JsonView from '../index'
import { argTypes, largeArray } from './share'
import { stringifyForCopying } from '../utils'

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
				k3: false,
				nested: {
					k4: 'nested'
				}
			},
			arr: ['string', 123456, false, null]
		},
		onEdit: ({ newValue, src, oldValue, indexOrName, parentPath }) => {
			console.log('[onEdit]', indexOrName, newValue, oldValue, src, parentPath)
		},
		onDelete: ({ value, src, indexOrName, parentPath }) => {
			console.log('[onDelete]', indexOrName, value, src, parentPath)
		},
		onAdd: ({ src, indexOrName, parentPath }) => {
			console.log('[onAdd]', indexOrName, src, parentPath)
		},
		onChange: ({ src, indexOrName, parentPath }) => {
			console.log('[onChange]', indexOrName, src, parentPath)
		}
	},
	decorators: [
		Story => (
			<div
				className='flex h-full items-center justify-center overflow-auto p-8'
				style={{ backgroundImage: 'linear-gradient(140deg, rgb(165, 142, 251), rgb(233, 191, 248))' }}>
				<div className='max-w-[600px] shrink-0 rounded-xl bg-white/90 p-6 font-mono shadow backdrop-blur'>
					<Story />
				</div>
			</div>
		)
	]
} as Meta<TYPE_FC>

export const Primary: StoryObj<TYPE_FC> = {}

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
			arr: ['string', 123456, false, null],
			nest: {
				nest: {
					nest: {
						nest: {
							over: 'over'
						}
					}
				}
			}
		},
		displaySize: 'collapsed'
	}
}

export const XS: StoryObj<TYPE_FC> = {
	decorators: [
		Story => (
			<div className='text-xs'>
				<Story />
			</div>
		)
	]
}
export const LG: StoryObj<TYPE_FC> = {
	decorators: [
		Story => (
			<div className='text-lg'>
				<Story />
			</div>
		)
	]
}
export const XL: StoryObj<TYPE_FC> = {
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

export const Editable_Options: StoryObj<TYPE_FC> = {
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
		editable: {
			add: false,
			edit: true,
			delete: false
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
		matchesURL: true,
		editable: true
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
		editable: true,
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
		editable: true,
		displaySize: true,
		collapsed: 2
	}
}

export const CustomIcons: StoryObj<TYPE_FC> = {
	args: {
		src: {
			obj: {
				k1: 123,
				k2: '123',
				k3: false
			}
		},
		editable: true,
		displaySize: true,
		CopyComponent: ({ onClick, className }) => (
			<svg onClick={onClick} className={className} height='512' viewBox='0 0 24 24' width='512' xmlns='http://www.w3.org/2000/svg' data-name='Layer 1'>
				<path d='m15 20h-10a5.006 5.006 0 0 1 -5-5v-10a5.006 5.006 0 0 1 5-5h10a5.006 5.006 0 0 1 5 5v10a5.006 5.006 0 0 1 -5 5zm9-1v-13a1 1 0 0 0 -2 0v13a3 3 0 0 1 -3 3h-13a1 1 0 0 0 0 2h13a5.006 5.006 0 0 0 5-5z' />
			</svg>
		),
		CopiedComponent: ({ className, style }) => (
			<svg className={className} style={style} xmlns='http://www.w3.org/2000/svg' version='1.1' x='0px' y='0px' viewBox='0 0 512 512' width='512' height='512'>
				<path d='M405.333,0H106.667C47.786,0.071,0.071,47.786,0,106.667v298.667C0.071,464.214,47.786,511.93,106.667,512h298.667   C464.214,511.93,511.93,464.214,512,405.333V106.667C511.93,47.786,464.214,0.071,405.333,0z M426.667,172.352L229.248,369.771   c-16.659,16.666-43.674,16.671-60.34,0.012c-0.004-0.004-0.008-0.008-0.012-0.012l-83.563-83.541   c-8.348-8.348-8.348-21.882,0-30.229s21.882-8.348,30.229,0l83.541,83.541l197.44-197.419c8.348-8.318,21.858-8.294,30.176,0.053   C435.038,150.524,435.014,164.034,426.667,172.352z' />
			</svg>
		),
		EditComponent: ({ onClick, className }) => (
			<svg onClick={onClick} className={className} fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
		),
		CancelComponent: ({ onClick, className }) => (
			<svg onClick={onClick} className={className}  enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg"><g id="background"><rect fill="none" height="32" width="32"/></g><g id="cancel"><polygon points="2,26 6,30 16,20 26,30 30,26 20,16 30,6 26,2 16,12 6,2 2,6 12,16  "/></g></svg>
		),
		DoneComponent: ({ onClick, className }) => (
			<svg onClick={onClick} className={className} height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><path d="M36 14l-2.83-2.83-12.68 12.69 2.83 2.83L36 14zm8.49-2.83L23.31 32.34 14.97 24l-2.83 2.83L23.31 38l24-24-2.82-2.83zM.83 26.83L12 38l2.83-2.83L3.66 24 .83 26.83z"/></svg>
		),
	}
}
