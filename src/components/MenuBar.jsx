import { useDispatch, useSelector } from 'react-redux'
import { toggleModal } from '../redux/menuSlice'
import Button from '../shared/Button'
import FileUploader from './FileUploader'
import Modal from '../shared/Modal'

export default function MenuBar({ isMenuOpen }) {
	const dispatch = useDispatch()
	const isModalOpen = useSelector((state) => state.menu.isModalOpen)
	function openModal() {
		dispatch(toggleModal())
	}
	return (
		<>
			{isMenuOpen && (
				<div className='border-l-2 border-zinc-300 w-1/6 h-full flex flex-col p-2'>
					<Button onClick={openModal}>Send File</Button>
					<Modal isModalOpen={isModalOpen} onClose={openModal}>
						<FileUploader />
					</Modal>

					<Button onClick={() => {}}>Community</Button>
				</div>
			)}
		</>
	)
}
