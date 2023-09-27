export const argTypes = {
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
	theme: {
		control: 'select',
		options: ['default', 'a11y', 'github', 'vscode', 'atom', 'winter-is-coming'],
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
	collapseStringMode: {
		control: 'select',
		options: ['directly', 'word', 'address'],
		table: {
			defaultValue: { summary: 'word' }
		}
	},
	collapseObjectsAfterLength: {
		control: 'number',
		description: 'When an integer value is assigned, the object and array will initially collapse.',
		table: {
			defaultValue: { summary: 99 }
		}
	},
	collapsed: {
		description:
			'When set to true, all nodes will be collapsed by default. Use an integer value to collapse at a specific depth. The collapsed also can be a function. ',
		table: {
			defaultValue: { summary: false }
		}
	},
	enableClipboard: {
		control: 'boolean',
		description: 'Boolean',
		table: {
			defaultValue: { summary: false }
		}
	},
	editable: {
		table: {
			defaultValue: { summary: false }
		},
		description:
			'When set to true, you can add, edit, or delete the property, and the actions will trigger onAdd, onEdit, or onDelete. Options is available.'
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
	},
	customizeNode: {
		description: 'Highly customize every node.'
	},
	displayArrayKey: {
		control: 'boolean',
		description: 'Sets whether to display the array key or not.',
		table: {
			defaultValue: { summary: true }
		}
	}
}
