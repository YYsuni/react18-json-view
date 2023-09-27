interface Props {
	displayArrayKey: boolean
	indexOrName: number | string
	parent?: Record<string, any> | Array<any>
	children: React.ReactNode
}

export default function NameKey({ displayArrayKey, indexOrName, parent, children }: Props) {
	const isArray = Array.isArray(parent)

	if (!isArray || displayArrayKey) {
		return (
			<>
				<span>
					<span className={typeof indexOrName === 'number' ? 'json-view--index' : 'json-view--property'}>{indexOrName}</span>
					<span>: </span>
				</span>
				{children}
			</>
		)
	}

	return (
		<>
			<span />
			{children}
			<span>,</span>
		</>
	)
}
