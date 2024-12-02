import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FileComponentPublic from '../components/FileDir/FileComponentPublic'
import SideBar from '../components/SideBar'
import { API_URL_UPLOAD_TYPES } from '../config'

export default function Main() {
	console.log('[Main] rendered')
	const [publicFiles, setPublicFiles] = useState([])
	const token = useSelector((state) => state.auth.token)

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
					{/* TODO: add buttons */}
					pass
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
		</div>
	)
}
