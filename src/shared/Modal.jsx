export default function Modal({ children, isModalOpen, onClose }) {
	return (
		<div
			className={
				isModalOpen
					? 'h-screen w-screen fixed top-0 left-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'
					: 'hidden'
			}
			onClick={onClose}
		>
			<div onClick={(e) => e.stopPropagation()}>{children}</div>
		</div>
	)
}
