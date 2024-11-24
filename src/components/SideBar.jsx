export default function SideBar() {
	return (
		<div className='w-full h-full box-border p-4 border rounded-r-2xl flex flex-col border-zinc-300  box-shadow'>
			<button className='w-full h-12 hover:bg-zinc-100 transition-all rounded active:text-blue-500 active:scale-95 flex items-center justify-center mb-2 shadow'>
				<span className='inline-flex items-center justify-center'>
					<i className='fi fi-rr-star mr-2 h-[48px] flex items-center justify-center' />
					Favorite
				</span>
			</button>
		</div>
	)
}
