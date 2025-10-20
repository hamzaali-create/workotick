
export default function LazyLoad({ loading, loader, children }:any) {
	return (
		loading ? loader : children
	)
}
