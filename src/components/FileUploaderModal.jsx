import  { useContext, useState } from 'react'
import { AuthContext } from '../context'
import { createPortal } from 'react-dom'
import Modal from '../shared/Modal'
import FileUploader from './FileDir/FileUploader'

const FileUploaderModal = ({ type }) => {
	const isLoggedIn = useContext(AuthContext)
	const [isModalOpen, setIsModalOpen] = useState(false)
	return (
		<>
			<button
				className='w-full h-12 hover:bg-zinc-100 transition-all rounded active:text-blue-500 active:scale-95 flex items-center justify-center mb-2 shadow'
				onClick={() => {
					if (!isLoggedIn) return
					setIsModalOpen(true)
				}}
			>
				<span className='inline-flex items-center justify-center'>
					<i className='fi fi-sr-download mr-2 h-[48px] flex items-center justify-center' />
					Upload File
				</span>
			</button>
			{isModalOpen &&
				createPortal(
					<Modal
						className=''
						modalClassName='flex items-center justify-center z-50 absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-20'
						isModalOpen={isModalOpen}
						setModalClose={() => setIsModalOpen(false)}
					>
						<FileUploader closeModal={() => setIsModalOpen(false)}/>
					</Modal>,
					document.body,
				)}
		</>
	)
}

export default FileUploaderModal
