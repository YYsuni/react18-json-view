export declare type Collapsed =
	| undefined
	| number
	| boolean
	| ((params: { node: Record<string, any> | Array<any>; indexOrName: number | string | undefined; depth: number; size: number }) => boolean | void)

export type DisplaySize = undefined | number | boolean | 'collapsed' | 'expanded'

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
	matchesURL?: boolean
	collapsed?: boolean
	className?: string
}
export declare type CustomizeNode = (params: {
	node: any
	indexOrName: number | string | undefined
	depth: number
}) => CustomizeOptions | React.FC | React.Component | React.ReactElement<any, any> | undefined

export type CustomizeCollapseStringUI = ((str_show: string, truncated: boolean) => JSX.Element | string) | string

export type NodeMeta = { depth: number; indexOrName?: number | string; parent?: Record<string, any> | Array<any>; parentPath: string[], currentPath: string[] }
