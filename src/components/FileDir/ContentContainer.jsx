import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_URL_UPLOAD } from '../../config'
import { AuthContext } from '../../context'
import { addUploadedAmount, setFiles } from '../../redux/file.slice'
import FileComponent from './FileComponent'
import './Styles.css'

export default function ContentContainer() {
	// TODO: check rerenders and optimize
	const isLoggedIn = useContext(AuthContext)
	const [filesState, setFilesState] = useState(null)
	const token = useSelector((state) => state.auth.token)
	const uploadedAmount = useSelector((state) => state.auth.uploadedAmount)
	const stateFiles = useSelector((state) => state.file.files)
	const dispatch = useDispatch()

	console.log('[ContentContainer] rendered component', filesState)

	useEffect(() => {
		console.log('[ContentContainer] useEffect', stateFiles)

		if (!isLoggedIn) return
		if (stateFiles.length) {
			console.log('[ContentContainer] set files', stateFiles)
			setFilesState(stateFiles)
			return
		}

		const uploadFiles = async () => {
			const res = axios.get(`${API_URL_UPLOAD}/getUserFiles`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				params: {
					skip: uploadedAmount,
					amount: 10,
				},
			})

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

		console.log('[ContentContainer] useEffect file downloaded')
	}, [])

	return (
		<div className='w-full h-full box-border px-8 py-4 border rounded-2xl flex flex-col border-zinc-300  box-shadow'>
			<div className='w-full h-[50px] flex items-center justify-between'>
				<div>
					{/* TODO: add sort by date */}
					Last Uploaded
				</div>
				<div>
					{/* TODO: add filter */}
					div
				</div>
			</div>
			<div className='grid grid-cols-1'>
				{filesState
					? filesState.map((file) => (
							<FileComponent key={file.id} file={file} />
					  ))
					: null}
			</div>
		</div>
	)
}
