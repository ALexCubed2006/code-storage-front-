import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppLink from '../../shared/AppLink'
import MenuBar from '../MenuBar'
import './NavPanel.css'

export default function NavPanel() {
	// TODO: some refactor
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<>
			<div className='relative top-0 left-0'>
				<div className='w-full h-[75px] border-b border-zinc-500 flex'>
					<div className='w-auto h-16 m-auto flex items-center justify-center icon-size-big'>
						<i className='fi fi-bs-shopping-bag w-16 h-16 flex items-center justify-center' />
						<span className='text-3xl font-black font-verdana'>
							Code Storage
						</span>
					</div>

					<div className='flex items-center justify-end grow py-4'>
						<AppLink
							authType={'redirectLogin'}
							className='w-28 h-12 mr-2 flex items-center justify-start border border-zinc-500 rounded-lg hover:border-[2px] icon-size'
						>
							<i className='fi fi-br-user-add w-[48px] h-[48px] flex items-center justify-center' />
							Login
						</AppLink>

						<Link
							to='/home'
							className='w-28 h-12 mr-2 flex items-center justify-start border border-zinc-500 rounded-lg hover:border-[2px] icon-size'
						>
							<i className=' fi-bs-home w-[48px] h-[48px] flex items-center justify-center' />
							Home
						</Link>

						<Link
							to='/'
							className='w-40 h-12 mr-2 flex items-center justify-start border border-zinc-500 rounded-lg hover:border-[2px] icon-size'
						>
							<i className='fi fi-bs-users-alt w-[48px] h-[48px] flex items-center justify-center' />
							Community
						</Link>

						<button
							onClick={() => setIsMenuOpen((prev) => !prev)}
							className='w-12 h-12 mr-2 flex items-center justify-center border border-zinc-500 rounded-lg hover:border-[2px] icon-size'
						>
							<i className='fi fi-bs-menu-burger w-[48px] h-[48px] flex items-center justify-center'></i>
						</button>
					</div>
				</div>
			</div>
			{isMenuOpen && <MenuBar></MenuBar>}
		</>
	)
}
