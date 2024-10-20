import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUploadFile } from '../redux/authSlice'
import Button from '../shared/Button'
import FileComponent from '../shared/FileComponent'

export default function FileUploader() {
	const acceptedFiles = [
		'.js',
		'.ts',
		'.jsx',
		'.tsx',
		'.css',
		'.scss',
		'.sass',
		'.html',
		'.htm',
		'.xml',
		'.xhtml',
		'.md',
		'.png',
		'.jpg',
		'.jpeg',
		'.gif',
		'.svg',
	]
	const [selectedFile, setSelectedFile] = useState(null)
	const [uploadedFile, setUploadedFile] = useState(null)
	const [drug, setDrug] = useState(false)
	const inputRef = useRef(null)

	const dispatch = useDispatch()

	function handleChange(e) {
		setSelectedFile(e.target.files[0])
		setDrug(true)
	}

	// send file to server
	async function handleUpload() {
		if (!selectedFile) return

		const data = new FormData()
		data.append('file', selectedFile)

		const res = await fetch('http://localhost:3456/api/upload/file', {
			method: 'POST',
			body: data,
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
			},
		})
		const uploaded = await res.json()

		if (!uploaded) {
			console.warn('Error uploading file')
			return
		}
		setUploadedFile(uploaded)
		dispatch(
			setUploadFile({ file: { id: uploaded.id, name: uploaded.fileName } }),
		)

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
		<div className='flex items-center justify-center bg-white rounded-2xl'>
			<div className='m-auto p-6 border border-zinc-500 rounded-2xl flex w-[800px] h-[600px]'>
				<div className='flex flex-col items-center pr-4'>
					<Button
						onClick={() => inputRef.current.click()}
						className='m-2 p-2 border-2 border-zinc-500 rounded-lg'
					>
						Select file
					</Button>
					<input
						type='file'
						multiple
						accept={acceptedFiles.join(', ')}
						onChange={handleChange}
						ref={inputRef}
						className='m-0 p-0 w-0 h-0 overflow-hidden opacity-0'
					/>
					<Button
						onClick={clearSelectedFile}
						className='m-2 p-2 border-2 border-zinc-500 rounded-lg'
					>
						Clear
					</Button>
					<Button
						onClick={handleUpload}
						className='m-2 p-2 border-2 border-zinc-500 rounded-lg'
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
						className='w-full h-full border-4 transition-colors duration-500 border-blue-300 border-dashed rounded-lg p-6 flex-grow'
					>
						{
							// if file selected
							// show it in field
							selectedFile ? (
								<FileComponent file={selectedFile} />
							) : (
								<p>Drag and drop your files here</p>
							)
						}
					</div>
				) : (
					<div
						onDragStart={(e) => dragStartHandler(e)}
						onDragLeave={(e) => dragLeaveHandler(e)}
						onDragOver={(e) => dragStartHandler(e)}
						className='w-full h-full border-4 transition-colors duration-500 border-zinc-300 border-dashed rounded-lg p-6'
					>
						<p>Drop your files here</p>
					</div>
				)}
			</div>
		</div>
	)}
