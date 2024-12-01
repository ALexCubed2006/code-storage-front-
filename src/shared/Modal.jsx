export default function Modal({
	children,
	isModalOpen,
	setModalClose,
	className,
	modalClassName,
}) {
	return (
		<div
			className={isModalOpen ? modalClassName : 'hidden'}
			onClick={setModalClose}
		>
			<div onClick={(e) => e.stopPropagation()} className={className}>
				{children}
			</div>
		</div>
	)
}
