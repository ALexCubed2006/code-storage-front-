import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUploadedFiles } from '../redux/file.slice'
import FileComponent from './FileComponent'

export default function ContentContainer() {
	const [files, setFiles] = useState([])
	const fileIds = useSelector((state) => state.auth.fileIds)
	const token = useSelector((state) => state.auth.token)
	const uploadedAmount = useSelector((state) => state.auth.uploadedAmount)
	const dispatch = useDispatch()

	useEffect(() => {
		// TODO: add file download
		const uploadFiles = async () => {
			const res = axios.get('http://localhost:3456/api/upload/getUserFiles', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				params: {
					skip: uploadedAmount,
					amount: 10,
				},
			})
			const data = (await res).data

			dispatch(setUploadedFiles({ files: data }))
			setFiles(data)
		}
		uploadFiles()
	}, [])

	return (
		<div className='w-full h-full box-border p-8 border rounded-2xl border-zinc-500 grid grid-cols-2'>
			{files.map((file, index) => (
				<FileComponent key={index} file={file} />
			))}
		</div>
	)
}
