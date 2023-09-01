declare module '*.svg' {
	const src: string
	export default src
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
}

declare type Collapsed =
	| number
	| boolean
	| ((params: {
			node: Record<string, any> | Array<any>
			indexOrName: number | string | undefined
			depth: number
			size: number
	  }) => boolean)

declare type Editable =
	| boolean
	| {
			add?: boolean
			edit?: boolean
			delete?: boolean
	  }

declare type CustomizeOptions = {
	add?: boolean
	edit?: boolean
	delete?: boolean
	enableClipboard?: boolean
	collapsed?: boolean
	className?: string
}
declare type CustomizeNode = (params: {
	node: any
	indexOrName: number | string | undefined
	depth: number
}) => CustomizeOptions | React.FC | typeof React.Component | React.ReactElement<any, any>
