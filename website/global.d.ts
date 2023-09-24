declare module '*.svg' {
	export default React.FC<React.SVGProps<SVGSVGElement>>
}

declare type NullableObject = Record<string, any> | null
declare type NullableArray = Record<string, any>[] | null
declare type Nullable<T> = T | null
