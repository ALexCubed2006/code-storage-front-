import { Link } from 'react-router-dom'

export default function ErrorPage() {
	return (
		<div className='w-screen h-screen flex items-center justify-center'>
			<div className='w-full h-full flex flex-col items-center justify-center'>
				<p className='text-9xl font-bold text-zinc-500'>404</p>
				<p className='text-3xl font-bold text-zinc-500'>
					Page Not Found
				</p>
				<Link
					to='/'
					className='text-xl font-bold text-zinc-500 bg-zinc-100 p-4 m-4 hover:bg-zinc-200 rounded-lg'
				>
					Go Home
				</Link>
			</div>
		</div>
	)
}
