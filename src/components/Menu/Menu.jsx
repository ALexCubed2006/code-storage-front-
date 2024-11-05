import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppLink from '../../shared/AppLink'
import Modal from '../../shared/Modal'
import FileUploader from '../FileDir/FileUploader'
import './Menu.css'

export default function Menu({ setIsMenuOpen, isLoggedIn }) {
	const [isFileModalOpen, setIsFileModalOpen] = useState(false)

	console.log('[Menu] rendered')
	function handleClick() {
		setIsMenuOpen(false)
		setIsFileModalOpen(false)
	}
	return (
		<div
			className='grid-menu-marking fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20'
			onClick={() => setIsMenuOpen(false)}
		>
			<div className='flex items-center justify-center'>
				<Modal
					className=''
					modalClassName={
						'h-full w-full z-50 flex items-center justify-center'
					}
					isModalOpen={isFileModalOpen}
					onClose={() => setIsFileModalOpen(false)}
				>
					<FileUploader />
				</Modal>
			</div>
			<div
				className='flex flex-col items-center w-1/5 h-screen absolute right-0 bg-zinc-50 z-50'
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className='w-full h-[75px] flex justify-center items-center text-3xl hover:cursor-default'
					onClick={handleClick}
				>
					<i className='fi fi-bs-shopping-bag w-16 h-16 flex items-center justify-center text-zinc-500 hover:text-blue-500 hover:bg-zinc-200 rounded-lg active:scale-95 transition-all' />
				</button>

				<div className='w-full grow flex flex-col justify-start items-center mt-8 px-1'>
					{isLoggedIn ? (
						<Link
							to='/profile'
							className='w-full h-12 bg-zinc-100 hover:bg-zinc-200 transition-all rounded active:text-blue-500 active:scale-95 flex items-center justify-center mb-2 shadow'
							onClick={() => setIsMenuOpen(false)}
						>
							Profile
						</Link>
					) : (
						<>
							<AppLink
								authType={'redirectLogin'}
								className='w-full h-12 bg-zinc-100 hover:bg-zinc-200 transition-all rounded active:text-blue-500 active:scale-95 flex items-center justify-center mb-2 shadow'
								onClick={() => setIsMenuOpen(false)}
							>
								Login
							</AppLink>
							<AppLink
								authType={'redirectRegister'}
								className='w-full h-12 bg-zinc-100 hover:bg-zinc-200 transition-all rounded active:text-blue-500 active:scale-95 flex items-center justify-center mb-2 shadow'
								onClick={() => setIsMenuOpen(false)}
							>
								Register
							</AppLink>
						</>
					)}
					<Link
						to='/home'
						className='w-full h-12 bg-zinc-100 hover:bg-zinc-200 transition-all rounded active:text-blue-500 active:scale-95 flex items-center justify-center mb-2 shadow'
						onClick={() => setIsMenuOpen(false)}
					>
						Home
					</Link>
					<Link
						to='/'
						className='w-full h-12 bg-zinc-100 hover:bg-zinc-200 transition-all rounded active:text-blue-500 active:scale-95 flex items-center justify-center mb-2 shadow'
						onClick={() => setIsMenuOpen(false)}
					>
						Community
					</Link>
					<button
						className='w-full h-12 bg-zinc-100 hover:bg-zinc-200 transition-all rounded active:text-blue-500 active:scale-95 flex items-center justify-center mb-2 shadow'
						onClick={() => setIsFileModalOpen((prev) => !prev)}
					>
						Send File
					</button>
				</div>
			</div>
		</div>
	)
}
