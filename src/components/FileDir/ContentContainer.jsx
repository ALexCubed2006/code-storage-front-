import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUploadedAmount, setFiles } from '../../redux/file.slice'
import FileComponent from './FileComponent'
import './Styles.css'

export default function ContentContainer() {
	// TODO: check rerenders and optimize
	const [files, setFilesState] = useState(null)
	const token = useSelector((state) => state.auth.token)
	const uploadedAmount = useSelector((state) => state.auth.uploadedAmount)
	const stateFiles = useSelector((state) => state.file.files)
	const dispatch = useDispatch()

	console.log('[ContentContainer] rendered component', files)

	useEffect(() => {
		console.log('[ContentContainer] useEffect', stateFiles)
		// TODO: add file download
		if (!token) return
		if (stateFiles.length) {
			console.log('[ContentContainer] set files', stateFiles)
			setFilesState(stateFiles)
			return
		}

		// 
		const uploadFiles = async () => {
			const res = axios.get(
				'http://localhost:3456/api/upload/getUserFiles',
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					params: {
						skip: uploadedAmount,
						amount: 10,
					},
				},
			)

			if ((await res).data?.error) {
				console.warn((await res).data.error)
				return
			}
			dispatch(addUploadedAmount({ amount: 10 }))
			const data = (await res).data

			dispatch(setFiles({ files: data }))
			setFilesState(data)
		}
		uploadFiles()
	}, [])

	return (
		<div className='w-full h-full box-border p-8 border rounded-2xl flex flex-col border-zinc-300  box-shadow'>
			<div>test</div>
			<div className='grid grid-cols-1'>
				{files
					? files.map((file) => (
							<FileComponent key={file.id} file={file} />
					  ))
					: null}
			</div>
		</div>
	)
}
