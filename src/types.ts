export declare type Collapsed =
	| number
	| boolean
	| ((params: {
			node: Record<string, any> | Array<any>
			indexOrName: number | string | undefined
			depth: number
			size: number
	  }) => boolean)

export declare type Editable =
	| boolean
	| {
			add?: boolean
			edit?: boolean
			delete?: boolean
	  }

export declare type CustomizeOptions = {
	add?: boolean
	edit?: boolean
	delete?: boolean
	enableClipboard?: boolean
	collapsed?: boolean
	className?: string
}
export declare type CustomizeNode = (params: {
	node: any
	indexOrName: number | string | undefined
	depth: number
}) => CustomizeOptions | React.FC | React.Component | React.ReactElement<any, any> | undefined
