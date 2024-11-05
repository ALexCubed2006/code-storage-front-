export default function Modal({
	children,
	isModalOpen,
	setModalClose,
	className,
	modalClassName,
}) {
	// TODO: add animation
	// TODO: add close button
	return (
		<div
			className={isModalOpen ? modalClassName : 'hidden'}
			onClick={setModalClose}
		>
			{/* FIXME: fix styles */}
			<div onClick={(e) => e.stopPropagation()} className={className}>
				{children}
			</div>
		</div>
	)
}
