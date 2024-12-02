import axios from 'axios'
import { memo, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { API_URL_UPLOAD_TYPES } from '../../config'

const FileComponentPublic = memo(({ file }) => {
	console.log('[FileComponentPublic] rendered')
	const token = useSelector((state) => state.auth.token)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	async function handleRateFile() {
		const res = await axios.put(
			API_URL_UPLOAD_TYPES.rateFile,
			{
				fileId: file.id,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)

		if (res.data?.error) {
			console.warn(res.data.error)
			return null
		}

		toast.success('File successfully rated')
	}

	async function handleAddToFavourite(file) {
		const res = await axios.put(
			API_URL_UPLOAD_TYPES.addToFavorites,
			{
				fileId: file.id,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)

		if (res.data?.error) {
			console.warn(res.data.error)
			return null
		}

		toast.success('File successfully added to favourites')
	}

	return (
		<div className='w-full h-auto border border-zinc-300 hover:border-zinc-500 hover:shadow-md transition-all grid-marking items-center p-1'>
			<div className='overflow-hidden'>{file.name}</div>
			<div>test</div>
			<div className='flex justify-end items-center [&>*]:text-2xl'>
				{isMenuOpen ? (
					<>
						<button
							className='flex items-center justify-center w-10 h-10 ml-2 shadow hover:bg-zinc-200 rounded-lg transition-all active:scale-95 active:text-amber-300 active:bg-amber-100'
							onClick={() => {
								setIsMenuOpen(false)
								handleRateFile(file)
							}}
						>
							<i className='fi fi-rr-star w-6 h-6 flex items-center justify-center' />
						</button>
						<button
							className='flex items-center justify-center w-10 h-10 ml-2 shadow hover:bg-zinc-200 rounded-lg transition-all active:scale-95 active:text-pink-300 active:bg-pink-100'
							onClick={() => {
								setIsMenuOpen(false)
								handleAddToFavourite(file)
							}}
						>
							<i className='fi fi-rs-heart w-6 h-6 flex items-center justify-center' />
						</button>

						<button
							className='flex items-center justify-center w-6 h-10 ml-2 shadow hover:bg-zinc-200 rounded-lg transition-all active:scale-95 active:text-zinc-500'
							onClick={() => setIsMenuOpen(false)}
						>
							<i className='fi fi-sr-menu-dots-vertical w-2 h-6 flex items-center justify-center' />
						</button>
					</>
				) : (
					<button
						className='flex items-center justify-center w-10 h-10 ml-2 shadow hover:bg-zinc-200 rounded-lg transition-all active:scale-95 active:text-blue-500'
						onClick={() => setIsMenuOpen(true)}
					>
						<i className='fi fi-sr-menu-dots w-6 h-6 flex items-center justify-center' />
					</button>
				)}
			</div>
			<Toaster />
		</div>
	)
})

export default FileComponentPublic
