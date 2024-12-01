import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_URL_UPLOAD_TYPES } from '../../config'
import { AuthContext } from '../../context'
import { setFiles } from '../../redux/file.slice'
import FilePaginator from './FilePaginator'
import './Styles.css'

export default function ContentContainer() {
	const dispatch = useDispatch()
	const isLoggedIn = useContext(AuthContext)
	const token = useSelector((state) => state.auth.token)
	const fileCount = useSelector((state) => state.auth.fileIds.length)
	const controller = new AbortController()

	const [page, setPage] = useState(1)
	const [prevButtonDisabled, setPrevButtonDisabled] = useState(true)
	const [nextButtonDisabled, setNextButtonDisabled] = useState(false)

	console.log('[ContentContainer] rendered component')
	console.log('[ContentContainer] page', page)

	// fetch files from server
	const uploadFiles = async (page = 1, count = 10) => {
		const res = await axios.get(API_URL_UPLOAD_TYPES.getUserFiles, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				skip: page * count - count,
				amount: count,
			},
			signal: controller.signal,
		})

		if (res.data?.error) {
			console.warn(res.data.error)
			return null
		}
		const data = res.data

		dispatch(setFiles({ files: data }))
	}
	useEffect(() => {
		console.log('[ContentContainer] useEffect')
		if (!isLoggedIn) return

		uploadFiles()

		console.log('[ContentContainer] useEffect file downloaded')

		return () => {
			controller.abort()
		}
	}, [])

	// FIXME: fix pagination bug
	function handleSkipNext() {
		console.log('[ContentContainer] handleSkipNext', fileCount)
		if ((page + 1) * 10 > fileCount) {
			setNextButtonDisabled(true)
		}
		setPrevButtonDisabled(false)
		setPage((prev) => prev + 1)

		uploadFiles(page + 1)

		console.log('[ContentContainer] handleSkipNext file downloaded')
	}

	function handleSkipPrev() {
		console.log('[ContentContainer] handleSkipPrev')
		if (page < 1) return
		setNextButtonDisabled(false)
		setPage((prev) => prev - 1)

		if (page - 1 === 1) {
			setPrevButtonDisabled(true)
		}

		uploadFiles(page - 1)
	}

	return (
		<div className='w-full h-full box-border px-8 py-4 border rounded-2xl flex flex-col justify-between border-zinc-300  box-shadow'>
			<div>
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

				<FilePaginator />
			</div>

			<div className='w-full flex items-center justify-center'>
				<div className='w-full flex items-center justify-center'>
					<button
						className='mr-1 inline-flex items-center justify-center text-2xl'
						onClick={handleSkipPrev}
						disabled={prevButtonDisabled}
					>
						<i
							className={
								prevButtonDisabled
									? 'fi fi-rr-angle-circle-left w-12 h-12 flex items-center justify-center text-zinc-300'
									: 'fi fi-rr-angle-circle-left w-12 h-12 flex items-center justify-center text-zinc-500 hover:text-blue-500 hover:bg-zinc-200 rounded-lg active:scale-95 transition-all'
							}
						/>
					</button>
					<button
						className='ml-1 inline-flex items-center justify-center text-2xl'
						onClick={handleSkipNext}
						disabled={nextButtonDisabled}
					>
						<i
							className={
								nextButtonDisabled
									? 'fi fi-rr-angle-circle-right w-12 h-12 flex items-center justify-center text-zinc-300'
									: 'fi fi-rr-angle-circle-right w-12 h-12 flex items-center justify-center text-zinc-500 hover:text-blue-500 hover:bg-zinc-200 rounded-lg active:scale-95 transition-all'
							}
						/>
					</button>
				</div>
			</div>
		</div>
	)
}
