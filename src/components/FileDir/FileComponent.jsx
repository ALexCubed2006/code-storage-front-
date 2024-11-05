import axios from 'axios'
import { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_URL_UPLOAD } from '../../config'
import { setUploadedFile } from '../../redux/file.slice'
import FileImg from './FileImg'
import FileTxt from './FileTxt'
import './Styles.css'

const FileComponent = memo(({ file }) => {
	console.log('[FileComponent] rendered')

	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token)
	let localDownloadedFile = null

	const codeFileTypes = [
		'txt',
		'js',
		'css',
		'html',
		'json',
		'jsx',
		'md',
		'sass',
		'scss',
		'ts',
		'tsx',
	]
	const imgFileTypes = ['png', 'jpg', 'jpeg', 'gif', 'svg']
	const fileType = file.name.split('.').pop()

	const fileUploadedAt = new Date(file.uploadedAt)
	const fileUploadedAtFormatted = fileUploadedAt.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	// download file from server
	// and open it in new window
	const handleReview = useCallback(async function (file) {
		if (localDownloadedFile) {
			console.log(
				'[FileComponent] handleReview - local',
				localDownloadedFile,
			)
			openFile(localDownloadedFile)
			return null
		}
		console.log('[FileComponent] handleReview')

		// get file from server
		console.log('[handleReview] download', file)
		const uploadedFile = await axios.post(
			`${API_URL_UPLOAD}/getFile`,
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
		openFile(uploadedFile)

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
	}, [])

	async function handleDownload(file) {
		console.log('download', file)
	}

	async function handleDelete(file) {
		console.log('delete', file)
	}

	function openFile(uploadedFile) {
		console.log('[FileComponent] openFile')
		const fileExtension = uploadedFile.data.fileExtension
		// open code file in new window
		if (codeFileTypes.includes(fileExtension)) {
			const fileWindow = window.open(
				'http://localhost:5173/uploadedCodeFile',
			)

			uploadedFile.data.file.split('\n').forEach((line) => {
				fileWindow.document.write(line + '<br>')
			})
		}

		// open image file in new window
		if (imgFileTypes.includes(fileExtension)) {
			const fileWindow = window.open(
				'http://localhost:5173/uploadedImgFile',
			)

			fileWindow.document.write(
				`<img src="data:image/${fileExtension};base64,${uploadedFile.data.file}" />`,
			)
		}

		return null
	}

	return (
		<div className='w-full h-auto border border-zinc-300 hover:border-zinc-500 hover:shadow-md transition-all grid-marking items-center p-2'>
			<div>
				<p>{file.name}</p>
				{/* <p>{fileUploadedAtFormatted}</p> */}
			</div>

			{codeFileTypes.includes(fileType) ? (
				<FileTxt file={file} />
			) : imgFileTypes.includes(fileType) ? (
				<FileImg file={file} />
			) : (
				<div>test</div>
			)}

			<div className='flex justify-end items-center [&>*]:text-2xl'>
				<button
					className='flex items-center justify-center w-10 h-10 ml-2 shadow hover:bg-zinc-200 rounded-lg transition-all active:scale-95 active:text-blue-500'
					onClick={() => handleReview(file)}
				>
					<i className='fi fi-rs-eye w-6 h-6 flex items-center justify-center' />
				</button>
				<button
					className='flex items-center justify-center w-10 h-10 ml-2 shadow hover:bg-zinc-200 rounded-lg transition-all active:scale-95 active:text-green-500'
					onClick={() => handleDownload(file)}
				>
					<i className='fi fi-sr-download w-6 h-6 flex items-center justify-center' />
				</button>
				<button
					className='flex items-center justify-center w-10 h-10 ml-2 shadow hover:bg-zinc-200 rounded-lg transition-all active:scale-95 active:text-red-500'
					onClick={() => handleDelete(file)}
				>
					<i className='fi fi-rs-trash w-6 h-6 flex items-center justify-center' />
				</button>
			</div>
		</div>
	)
})

export default FileComponent
