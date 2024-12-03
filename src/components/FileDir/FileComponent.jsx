import axios from 'axios'
import hljs from 'highlightjs'
import { memo, useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import {
	API_URL_UPLOAD_TYPES,
	APP_URL,
	FILE_REVIEW_WINDOWS,
	FILE_TYPES,
	TABS,
} from '../../config'
import {
	deleteFromFavorites,
	deleteUserFile,
	setUploadedFile,
	updateIsPublic,
} from '../../redux/file.slice'
import Modal from '../../shared/Modal'
import './Styles.css'

const FileComponent = memo(({ file, tab }) => {
	console.log('[FileComponent] rendered')

	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token)
	let localDownloadedFile = null
	const [deleted, setDeleted] = useState(false)

	const fileType = file.name.split('.').pop()

	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
	const previewRef = useRef(null)

	// download file from server
	// and open it in new window
	const handleReview = useCallback(
		async (file, type = FILE_REVIEW_WINDOWS.newWindow, root = null) => {
			if (deleted) return

			if (localDownloadedFile) {
				if (type === FILE_REVIEW_WINDOWS.newWindow) {
					openFile(localDownloadedFile)
				}

				if (type === FILE_REVIEW_WINDOWS.local) {
					openFileLocal(
						localDownloadedFile,
						root,
						localDownloadedFile.data.fileExtension,
					)
				}
				return null
			}

			const uploadedFile = await axios.post(
				API_URL_UPLOAD_TYPES.getFile,
				{
					fileName: file.fileInfo + '-' + file.name,
					id: file.id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)

			if (uploadedFile.data?.error) {
				console.warn(uploadedFile.data.error)
				return null
			}
			const fileExtension = uploadedFile.data.fileExtension

			if (type === FILE_REVIEW_WINDOWS.newWindow) {
				openFile(uploadedFile)
			}

			if (type === FILE_REVIEW_WINDOWS.local) {
				openFileLocal(uploadedFile, root, fileExtension)
			}

			// set downloaded file in redux store
			localDownloadedFile = uploadedFile
			dispatch(
				setUploadedFile({
					file: {
						id: file.id,
						name: file.name,
						fileInfo: file.fileInfo,
						fileExtension: fileExtension,
						data: uploadedFile.data,
					},
				}),
			)

			return null
		},
		[],
	)

	async function handleDownload(file) {
		if (deleted) return
		const uploadedFile = await axios.post(
			API_URL_UPLOAD_TYPES.getFile,
			{
				fileName: file.fileInfo + '-' + file.name,
				id: file.id,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)

		if (uploadedFile.data?.error) {
			console.warn(uploadedFile.data.error)
			return null
		}

		const fileExtension = uploadedFile.data.fileExtension
		const blob = new Blob([uploadedFile.data.file], { type: fileExtension })
		const url = window.URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = file.name
		a.click()
	}

	async function handleDelete(file) {
		if (deleted) return
		setIsDeleteModalOpen(true)
	}

	async function deleteFile(file) {
		if (deleted) return
		setIsDeleteModalOpen(false)
		setDeleted((prev) => false)
		const res = await axios.delete(API_URL_UPLOAD_TYPES.deleteFile, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: {
				fileName: file.fileInfo + '-' + file.name,
				id: file.id,
			},
		})

		if (res.data?.error) {
			console.warn(res.data.error)
			return null
		}

		dispatch(
			deleteUserFile({
				fileId: file.id,
			}),
		)
		return null
	}

	function openFile(uploadedFile) {
		console.log('[FileComponent] openFile')
		const fileExtension = uploadedFile.data.fileExtension

		// open html and etc files in new window
		if (FILE_TYPES.pages.includes(fileExtension)) {
			const fileWindow = window.open(`${APP_URL}/uploadedTxtFile`)

			fileWindow.document.write(uploadedFile.data.file)
		}

		// open code files in new window
		if (FILE_TYPES.code.includes(fileExtension)) {
			const fileWindow = window.open(`${APP_URL}/uploadedCodeFile`)
			const code = uploadedFile.data.file
			const highlightedCode = hljs.highlightAuto(code).value
			fileWindow.document.write(
				`<pre><code>${highlightedCode}</code></pre>`,
			)
		}

		// open image files in new window
		if (FILE_TYPES.image.includes(fileExtension)) {
			const fileWindow = window.open(`${APP_URL}/uploadedImgFile`)

			fileWindow.document.write(
				`<img src="data:image/${fileExtension};base64,${uploadedFile.data.file}" />`,
			)
		}

		setDeleted(true)
		return null
	}

	function openFileLocal(uploadedFile, root, fileExtension) {
		// open html and etc files in new window
		if (FILE_TYPES.pages.includes(fileExtension)) {
			const html = uploadedFile.data.file
			const parser = new DOMParser()
			const doc = parser.parseFromString(html, 'text/html')
			const htmlContent = doc.documentElement.outerHTML
			root.current.innerHTML = ''
			root.current.appendChild(document.createTextNode(htmlContent))
		}

		// open code files in new window
		if (FILE_TYPES.code.includes(fileExtension)) {
			const code = uploadedFile.data.file
			const highlightedCode = hljs.highlightAuto(code).value
			root.current.innerHTML = `<pre><code>${highlightedCode}</code></pre>`
		}

		// open image files in new window
		if (FILE_TYPES.image.includes(fileExtension)) {
			const img = document.createElement('img')
			img.src = `data:image/${fileExtension};base64,${uploadedFile.data.file}`
			root.current.innerHTML = ''
			root.current.appendChild(img)
		}
	}

	async function handleSetIsPublic(file) {
		console.log(file)
		const res = await axios.put(
			API_URL_UPLOAD_TYPES.publicFile,
			{
				fileId: file.id,
				isPublic: !file.isPublic,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		if (res.data?.error) {
			console.warn(res.data.error)
			return null
		}

		dispatch(updateIsPublic({ fileId: file.id, isPublic: !file.isPublic }))

		if (!file.isPublic) {
			toast.success('File is now public')
		} else {
			toast.success('File is now private')
		}
	}

	async function handleAddToFavourite(file) {
		const res = await axios.put(
			API_URL_UPLOAD_TYPES.addToFavorites,
			{
				fileId: file.id,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)

		if (res.data?.error) {
			console.warn(res.data.error)
			return null
		}

		toast.success('File successfully added to favourites')
	}

	async function handleDeleteFromFavourite(file) {
		const res = await axios.put(
			API_URL_UPLOAD_TYPES.deleteFromFavorites,
			{
				fileId: file.id,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		if (res.data?.error) {
			console.warn(res.data.error)
			return null
		}

		dispatch(deleteFromFavorites({ fileId: file.id }))
	}

	return (
		<div className='w-full h-auto border border-zinc-300 hover:border-zinc-500 hover:shadow-md transition-all grid-marking items-center p-1'>
			<div className='overflow-hidden'>
				<p>{file.name}</p>
				{/* <p>{fileUploadedAtFormatted}</p> */}
			</div>

			<button
				className='w-full flex items-center justify-center p-2 transition-all shadow hover:bg-zinc-200 rounded-lg active:scale-95 active:text-blue-500'
				onClick={() => {
					setIsPreviewModalOpen(true)
					handleReview(file, FILE_REVIEW_WINDOWS.local, previewRef)
				}}
			>
				Preview
			</button>

			{createPortal(
				<Modal
					isModalOpen={isPreviewModalOpen}
					setModalClose={() => {
						setIsPreviewModalOpen((prev) => !prev)
					}}
					modalClassName='flex items-center justify-center z-50 absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-20'
					className='flex flex-col items-center justify-center w-[80%] h-[80%] bg-white z-50 p-6 border border-zinc-300 rounded-lg shadow-lg overflow-y-scroll'
				>
					<div
						ref={previewRef}
						className='w-full h-full text-xs font-mono whitespace-pre'
					>
						Loading...
					</div>
				</Modal>,
				document.body,
			)}

			<div className='flex justify-end items-center [&>*]:text-2xl'>
				{isMenuOpen ? (
					<>
						{tab === TABS.favorite ? (
							<button
								className='flex items-center justify-center w-10 h-10 shadow hover:bg-zinc-200 rounded-lg transition-all active:scale-95 active:text-red-500 active:bg-red-100'
								onClick={() => {
									setIsMenuOpen(false)
									handleDeleteFromFavourite(file)
								}}
							>
								{/* Delete from favorites */}
								<i className='fi fi-rr-delete-document w-6 h-6 flex items-center justify-center' />
							</button>
						) : (
							<>
								<button
									className='flex items-center justify-center w-10 h-10 ml-2 shadow hover:bg-zinc-200 rounded-lg transition-all active:scale-95 active:text-pink-300 active:bg-pink-100'
									onClick={() => {
										setIsMenuOpen(false)
										handleAddToFavourite(file)
									}}
								>
									{/* Add to favorites */}
									<i className='fi fi-rs-heart w-6 h-6 flex items-center justify-center' />
								</button>
								<button
									className='flex items-center justify-center w-10 h-10 ml-2 shadow hover:bg-zinc-200 rounded-lg transition-all active:scale-95 active:text-indigo-500 active:bg-indigo-100'
									onClick={() => {
										setIsMenuOpen(false)
										handleSetIsPublic(file)
									}}
								>
									{!file.isPublic ? (
										// Public
										<i className='fi fi-sr-globe w-6 h-6 flex items-center justify-center' />
									) : (
										// Private
										<i className='fi fi-rr-lock w-6 h-6 flex items-center justify-center' />
									)}
								</button>
							</>
						)}
						<button
							className='flex items-center justify-center w-10 h-10 ml-2 shadow hover:bg-zinc-200 rounded-lg transition-all active:scale-95 active:text-blue-500 active:bg-blue-100'
							onClick={() => {
								setIsMenuOpen(false)
								handleReview(file)
							}}
							disabled={deleted}
						>
							{/* Review */}
							<i className='fi fi-rs-eye w-6 h-6 flex items-center justify-center' />
						</button>
						<button
							className='flex items-center justify-center w-10 h-10 ml-2 shadow hover:bg-zinc-200 rounded-lg transition-all active:scale-95 active:text-green-500 active:bg-green-100'
							onClick={() => {
								setIsMenuOpen(false)
								handleDownload(file)
							}}
							disabled={deleted}
						>
							{/* Download */}
							<i className='fi fi-sr-download w-6 h-6 flex items-center justify-center' />
						</button>
						{tab === TABS.favorite ? (
							''
						) : (
							<button
								className='flex items-center justify-center w-10 h-10 ml-2 shadow hover:bg-zinc-200 rounded-lg transition-all active:scale-95 active:text-red-500 active:bg-red-100'
								onClick={() => {
									setIsMenuOpen(false)
									handleDelete(file)
								}}
								disabled={deleted}
							>
								{/* Delete */}
								<i className='fi fi-rs-trash w-6 h-6 flex items-center justify-center' />
							</button>
						)}
						<button
							className='flex items-center justify-center w-6 h-10 ml-2 shadow hover:bg-zinc-200 rounded-lg transition-all active:scale-95 active:text-zinc-500'
							onClick={() => setIsMenuOpen(false)}
						>
							{/* Close menu */}
							<i className='fi fi-sr-menu-dots-vertical w-2 h-6 flex items-center justify-center' />
						</button>
					</>
				) : (
					<button
						className='flex items-center justify-center w-10 h-10 ml-2 shadow hover:bg-zinc-200 rounded-lg transition-all active:scale-95 active:text-blue-500'
						onClick={() => setIsMenuOpen(true)}
					>
						{/* Open menu */}
						<i className='fi fi-sr-menu-dots w-6 h-6 flex items-center justify-center' />
					</button>
				)}
			</div>
			{createPortal(
				<Modal
					isModalOpen={isDeleteModalOpen}
					setModalClose={() => {
						setIsDeleteModalOpen((prev) => !prev)
					}}
					modalClassName='flex items-center justify-center z-50 absolute top-0 left-0 w-screen h-screen'
					className='flex flex-col items-center justify-center bg-white z-50 p-6 border border-zinc-300 rounded-lg shadow-lg'
				>
					<div className='flex flex-col items-center justify-center'>
						<p className='mb-4'>
							Are you sure you want to delete this file?
						</p>
						<div className='flex justify-end w-full'>
							<button
								onClick={() => deleteFile(file)}
								className='flex items-center justify-center p-4 ml-2 shadow hover:bg-red-200 rounded-lg transition-all active:scale-95 active:text-red-500'
							>
								Delete
							</button>
							<button
								onClick={() => setIsDeleteModalOpen(false)}
								className='flex items-center justify-center p-4 ml-2 shadow hover:bg-zinc-200 rounded-lg transition-all active:scale-95 active:text-blue-500'
							>
								Cancel
							</button>
						</div>
					</div>
				</Modal>,
				document.body,
			)}

			<Toaster />
		</div>
	)
})

export default FileComponent
