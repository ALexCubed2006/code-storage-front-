import { useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { API_URL_UPLOAD_TYPES, FILE_TYPES } from '../../config'
import { setUploadedFile } from '../../redux/file.slice'
import Button from '../../shared/Button'

export default function FileUploader() {
	const [selectedFile, setSelectedFile] = useState(null)
	const [uploadedFileState, setUploadedFileState] = useState(null)
	const [drug, setDrug] = useState(false)
	const inputRef = useRef(null)

	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token)

	function handleChange(e) {
		setSelectedFile(e.target.files[0])
		setDrug(true)
	}

	// send file to server
	async function handleUpload() {
		if (!selectedFile) return

		const data = new FormData()
		data.append('file', selectedFile)

		const res = await fetch(API_URL_UPLOAD_TYPES.file, {
			method: 'POST',
			body: data,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		const uploaded = await res.json()

		if (!uploaded) {
			console.warn('Error uploading file')
			return
		}
		setUploadedFileState(uploaded)
		dispatch(
			setUploadedFile({
				file: { id: uploaded.id, name: uploaded.fileName },
			}),
		)
		toast.success('File successfully uploaded')

		// clear inputs
		clearSelectedFile()

		return null
	}

	// drag and drop events
	function dragStartHandler(e) {
		e.preventDefault()
		setDrug(true)
	}

	function dragLeaveHandler(e) {
		e.preventDefault()
		setDrug(false)
	}

	function onDropHandler(e) {
		e.preventDefault()
		setSelectedFile(e.dataTransfer.files[0])
	}

	function clearSelectedFile() {
		setSelectedFile(null)
		setDrug(false)
		inputRef.current.value = ''
	}

	return (
		<div className='flex items-center justify-center bg-white rounded-2xl w-full h-full shadow-lg'>
			<div className='m-auto p-6 border border-zinc-400 rounded-2xl flex'>
				<div className='flex flex-col items-center pr-4'>
					<Button
						onClick={() => inputRef.current.click()}
						className='w-full h-12 bg-zinc-50 hover:bg-zinc-100 transition-all rounded active:text-blue-500 active:scale-95 flex items-center justify-center mb-2 p-2 shadow'
					>
						Select file
					</Button>
					<input
						type='file'
						multiple
						accept={FILE_TYPES.accepted.join(', ')}
						onChange={handleChange}
						ref={inputRef}
						className='m-0 p-0 w-0 h-0 overflow-hidden opacity-0'
					/>
					<Button
						onClick={clearSelectedFile}
						className='w-full h-12 bg-zinc-50 hover:bg-zinc-100 transition-all rounded active:text-red-500 active:scale-95 flex items-center justify-center mb-2 p-2 shadow'
					>
						Clear
					</Button>
					<Button
						onClick={handleUpload}
						className='w-full h-12 bg-zinc-50 hover:bg-zinc-100 transition-all rounded active:text-lime-500 active:scale-95 flex items-center justify-center mb-2 p-2 shadow'
					>
						Upload
					</Button>
				</div>

				{drug ? (
					<div
						onDragStart={(e) => dragStartHandler(e)}
						onDragLeave={(e) => dragLeaveHandler(e)}
						onDragOver={(e) => dragStartHandler(e)}
						onDrop={(e) => onDropHandler(e)}
						className='w-[70vh] h-[70vh] border-4 transition-colors duration-500 border-blue-300 border-dashed rounded-lg p-6 flex-grow'
					>
						{
							// if file selected
							// show it in field
							selectedFile ? (
								<div className='flex flex-col p-2 text-zinc'>
									<p className='m-y2'>
										File selected: {selectedFile.name}
									</p>
									<p className='m-y2'>
										Type: {selectedFile.type}
									</p>
									<p className='m-y2'>
										Size: {selectedFile.size} bytes
									</p>
									<p className='m-y2'>
										Last modified:{' '}
										{new Date(
											selectedFile.lastModified,
										).toUTCString()}
									</p>
								</div>
							) : (
								<p className='text-zinc-400'>
									Drop your file here
								</p>
							)
						}
					</div>
				) : (
					<div
						onDragStart={(e) => dragStartHandler(e)}
						onDragLeave={(e) => dragLeaveHandler(e)}
						onDragOver={(e) => dragStartHandler(e)}
						className='w-[70vh] h-[70vh] border-4 transition-colors duration-500 border-zinc-300 border-dashed rounded-lg p-6'
					>
						<p className='text-zinc-400'>
							Drag & Drop your files here
						</p>
					</div>
				)}
			</div>
			<Toaster />
		</div>
	)
}
