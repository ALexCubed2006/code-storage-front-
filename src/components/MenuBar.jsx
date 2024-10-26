export default function MenuBar({ children }) {
	return (
		<div className='p-2 w-1/6 h-[calc(100vh-75px)] bg-white border-l-2 border-zinc-500 absolute right-0 top-[75px] z-50 overflow-y-auto'>
			{/* TODO: add animation */}
			{children}
		</div>
	)
}
