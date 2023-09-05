export default function SingleLoading({ width = 16, height = 16 }) {
	return (
		<span
			className='inline-block h-4 animate-pulse rounded-full bg-gradient-to-r from-[rgba(222,222,222,0.60)] to-[rgba(242,242,242,0.60)]'
			style={{ width, height }}
		/>
	)
}
