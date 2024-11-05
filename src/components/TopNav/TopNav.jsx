import { useContext, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AppLink from '../../shared/AppLink'
import Menu from '../Menu/Menu'
import './TopNav.css'
import { AuthContext } from '../../context'

export default function TopNav() {
	console.log('[TopNav] rendered')
	
	const isLoggedIn = useContext(AuthContext)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const navRef = useRef(null)

	function handleMenuOpen() {
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<div className='relative top-0 left-0 text-lg z-10'>
			<div
				className={
					isMenuOpen
						? 'w-full h-[75px] transition-all hover:bg-zinc-50 grid-marking__top-panel--open'
						: 'w-full h-[75px] transition-all hover:bg-zinc-50 grid-marking__top-panel'
				}
				ref={navRef}
			>
				<div className='w-full h-full flex items-center'>test</div>
				<div className='flex justify-center items-center text-zinc-700'>
					<Link
						to='/home'
						className='grow h-full flex items-center justify-center box-content border-b-2 border-zinc-300 hover:border-blue-200 rounded-1 hover:bg-zinc-100 transition-all [&>*]:hover:text-black [&>*]:active:scale-95 [&>*]:active:text-blue-500 active:border-blue-500'
					>
						<span className='inline-flex items-center justify-center'>
							<i className=' fi-bs-home mr-2 h-[48px] flex items-center justify-center' />
							Home
						</span>
					</Link>
					<Link
						to='/'
						className='grow h-full flex items-center justify-center box-content border-b-2 border-zinc-300 hover:border-blue-200 rounded-1 hover:bg-zinc-100 transition-all [&>*]:hover:text-black [&>*]:active:scale-95 [&>*]:active:text-blue-500 active:border-blue-500'
					>
						<span className='inline-flex items-center justify-center'>
							<i className='fi fi-bs-users-alt mr-2 h-[48px] flex items-center justify-center' />
							Community
						</span>
					</Link>
					{isLoggedIn ? (
						<Link
							to='/profile'
							className='grow h-full flex items-center justify-center box-content border-b-2 border-zinc-300 hover:border-blue-200 rounded-1 hover:bg-zinc-100 transition-all [&>*]:hover:text-black [&>*]:active:scale-95 [&>*]:active:text-blue-500 active:border-blue-500'
						>
							<span className='inline-flex items-center justify-center'>
								<i className=' fi fi-bs-user mr-2 h-[48px] flex items-center justify-center' />
								Profile
							</span>
						</Link>
					) : (
						<AppLink
							authType={'redirectLogin'}
							className='grow h-full flex items-center justify-center box-content border-b-2 border-zinc-300 hover:border-blue-200 rounded-1 hover:bg-zinc-100 transition-all [&>*]:hover:text-black [&>*]:active:scale-95 [&>*]:active:text-blue-500 active:border-blue-500'
						>
							<span className='inline-flex items-center justify-center'>
								<i className='fi fi-br-user-add mr-2 flex items-center justify-center' />
								Login
							</span>
						</AppLink>
					)}
				</div>
				<div className='w-full h-full flex items-center justify-end'>
					<button
						className='h-full [&>*]:text-3xl [&>*]:text-zinc-500 [&>*]:hover:text-black hover:bg-zinc-100 px-4 active:bg-zinc-200 [&>*]:active:scale-95'
						onClick={handleMenuOpen}
					>
						<i className='fi fi-bs-menu-burger w-[48px] h-[48px] flex items-center justify-center' />
					</button>
				</div>
				{isMenuOpen && (
					<Menu
						setIsMenuOpen={setIsMenuOpen}
						isLoggedIn={isLoggedIn}
					/>
				)}
			</div>
		</div>
	)
}
