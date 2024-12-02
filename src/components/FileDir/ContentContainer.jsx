import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_URL_UPLOAD_TYPES, TABS } from '../../config'
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
	const [tab, setTab] = useState(TABS.personal)
	const [type, setType] = useState(API_URL_UPLOAD_TYPES.getUserFiles)

	console.log('[ContentContainer] rendered component')
	console.log('[ContentContainer] page', page)

	// fetch files from server
	const uploadFiles = async (type, page = 1, count = 10) => {
		if(!isLoggedIn) return

		const res = await axios.get(type, {
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

		uploadFiles(type)

		console.log('[ContentContainer] useEffect file downloaded')

		return () => {
			controller.abort()
		}
	}, [])

	function uploadFirstPage(type) {
		console.log('[ContentContainer] uploadFirstPage')

		if (!isLoggedIn) return

		uploadFiles(type)

		setPage(1)
		setPrevButtonDisabled(true)
		setNextButtonDisabled(false)
	}

	// FIXME: fix pagination bug
	function handleSkipNext() {
		console.log('[ContentContainer] handleSkipNext', fileCount)

		if (!isLoggedIn) return

		if ((page + 1) * 10 > fileCount) {
			setNextButtonDisabled(true)
		}
		setPrevButtonDisabled(false)
		setPage((prev) => prev + 1)

		uploadFiles(type, page + 1)

		console.log('[ContentContainer] handleSkipNext file downloaded')
	}

	function handleSkipPrev() {
		console.log('[ContentContainer] handleSkipPrev')

		if (!isLoggedIn) return

		if (page < 1) return
		setNextButtonDisabled(false)
		setPage((prev) => prev - 1)

		if (page - 1 === 1) {
			setPrevButtonDisabled(true)
		}

		uploadFiles(type, page - 1)
	}

	return (
		<div className='w-full h-full box-border px-8 py-4 border rounded-2xl flex flex-col justify-between border-zinc-300  box-shadow'>
			<div>
				<div className='w-full h-[50px] flex items-center justify-between'>
					<button
						className={
							tab === TABS.personal
								? 'flex items-center justify-center p-2 shadow hover:bg-zinc-200 rounded-lg transition-all active:scale-95 active:text-blue-500 bg-zinc-200'
								: 'flex items-center justify-center p-2 shadow hover:bg-zinc-200 rounded-lg transition-all active:scale-95 active:text-blue-500'
						}
						onClick={() => {
							if (tab === TABS.personal) return
							setTab(TABS.personal)
							setType(API_URL_UPLOAD_TYPES.getUserFiles)
							uploadFirstPage(API_URL_UPLOAD_TYPES.getUserFiles)
						}}
					>
						Your files
					</button>
					<div>{/* TODO: implement search */} search</div>
					<button
						className={
							tab === TABS.favorite
								? 'flex items-center justify-center p-2 shadow hover:bg-zinc-200 rounded-lg transition-all active:scale-95 active:text-blue-500 bg-zinc-200'
								: 'flex items-center justify-center p-2 shadow hover:bg-zinc-200 rounded-lg transition-all active:scale-95 active:text-blue-500'
						}
						onClick={() => {
							if (tab === TABS.favorite) return
							setTab(TABS.favorite)
							setType(API_URL_UPLOAD_TYPES.getFavorites)
							uploadFirstPage(API_URL_UPLOAD_TYPES.getFavorites)
						}}
					>
						Favorite files
					</button>
				</div>

				<FilePaginator tab={tab} />
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
