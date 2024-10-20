export default function Button({ children, onClick }) {
	return (
		<button
			className='w-full p-2 mb-2 border border-zinc-500 rounded-lg hover:border-[2px] active:bg-zinc-100'
			onClick={onClick}
		>
			{children}
		</button>
	)
}
