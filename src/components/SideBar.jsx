export default function SideBar({ children }) {
	console.log('[SideBar] rendered')

	return (
		<div className='w-full h-full box-border p-4 border rounded-r-2xl flex flex-col border-zinc-300  box-shadow'>
			{children}
		</div>
	)
}
