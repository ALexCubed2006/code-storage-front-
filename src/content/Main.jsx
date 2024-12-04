import axios from 'axios'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import FileComponentPublic from '../components/FileDir/FileComponentPublic'
import SideBar from '../components/SideBar'
import { API_URL_UPLOAD_TYPES } from '../config'
import Modal from '../shared/Modal'

export default function Main() {
	console.log('[Main] rendered')
	const [publicFiles, setPublicFiles] = useState([])
	const token = useSelector((state) => state.auth.token)

	const [isModalOpen, setIsModalOpen] = useState(false)

	useEffect(() => {
		if (!token) return
		async function fetchPublicFiles() {
			const res = await axios.get(API_URL_UPLOAD_TYPES.getPublicFiles, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				params: {
					amount: 10,
				},
			})

			if (res.data?.error) {
				console.warn(res.data.error)
				return null
			}

			console.log(res.data)
			setPublicFiles(res.data)
		}
		fetchPublicFiles()
	}, [])

	function handleSearchUser() {
		setIsModalOpen(true)
	}

	if (!token)
		return (
			<div className='w-[60%] h-full m-auto flex items-center justify-center text-6xl text-center text-zinc-500 font-bold'>
				You need to be logged in to view this page
			</div>
		)

	return (
		<div className='w-full h-full content-grid-layout'>
			<div className='mr-[20px] my-[20px]'>
				<SideBar>
					<button
						className='w-full h-12 hover:bg-zinc-100 transition-all rounded active:text-blue-500 active:scale-95 flex items-center justify-center mb-2 shadow'
						onClick={() => handleSearchUser()}
					>
						<i className='fi fi-rs-user mr-2 h-[48px] flex items-center justify-center' />
						Find User
					</button>
				</SideBar>
			</div>
			<div className='mx-[20px] my-[20px]'>
				<div className='w-full h-full box-border px-8 py-4 border rounded-2xl flex flex-col justify-between border-zinc-300  box-shadow'>
					{/* TODO: add files */}
					<div>
						<div>
							{/* TODO: add search */}
							pass
						</div>
						{publicFiles.map((file) => (
							<FileComponentPublic key={file.id} file={file} />
						))}
					</div>
					<div>{/* TODO: add pagination */}</div>
				</div>
			</div>
			{createPortal(
				<Modal
					isModalOpen={isModalOpen}
					setModalClose={() => setIsModalOpen(false)}
					modalClassName='flex items-center justify-center z-50 absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-20'
					className='flex flex-col items-center justify-center bg-white z-50 p-6 border border-zinc-300 rounded-lg shadow-lg'
				></Modal>,
				document.body,
			)}
		</div>
	)
}
