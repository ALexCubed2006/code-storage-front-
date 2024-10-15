import { useRef, useState } from 'react'

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
	const [selectedFile, setSelectedFile] = useState([])
	const [uploadedFile, setUploadedFile] = useState(null)
	const inputRef = useRef(null)

	function handleChange(e) {
		setSelectedFile(e.target.files[0])
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
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		const uploaded = await res.json()

		if (!uploaded) {
			console.warn('Error uploading file')
			return
		}

		setUploadedFile(uploaded)
		inputRef.current.value = ''

		return null
	}
	return (
		<div>
			{/*<button onClick={handleUpload}>Upload</button>*/}
			<input
				type='file'
				multiple
				accept={acceptedFiles.join(', ')}
				onChange={handleChange}
				ref={inputRef} /*className="m-0 p-0 w-0 h-o overflow-hidden"*/
			/>
			<button onClick={handleUpload}>Upload</button>
		</div>
	)
}
