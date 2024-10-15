import { Link } from 'react-router-dom'
import AppLink from '../../shared/AppLink'
import './NavPanel.css'

export default function NavPanel() {
	return (
		<div className='w-full h-[75px] border-b border-zinc-500 flex absolute'>

			<div className='w-auto h-16 m-auto flex items-center justify-center icon-size-big'>
				<i className='fi fi-bs-shopping-bag w-16 h-16 flex items-center justify-center' />
				<span className='text-3xl font-black font-verdana'>Code Storage</span>
			</div>
			
			<div className='flex items-center justify-end grow py-4'>
				<AppLink
					authType={'redirectLogin'}
					className='w-12 h-12 mr-2 flex items-center justify-center border border-zinc-500 rounded-lg hover:border-[2px] icon-size'
				>
					<i className='fi fi-br-user-add w-[48px] h-[48px] flex items-center justify-center' />
				</AppLink>

				<Link
					to='/'
					className='w-12 h-12 mr-2 flex items-center justify-center border border-zinc-500 rounded-lg hover:border-[2px] icon-size'
				>
					<i className='fi fi-bs-users-alt w-[48px] h-[48px] flex items-center justify-center' />
				</Link>

				<Link
					to='/home'
					className='w-12 h-12 mr-2 flex items-center justify-center border border-zinc-500 rounded-lg hover:border-[2px] icon-size'
				>
					<i className=' fi-bs-home w-[48px] h-[48px] flex items-center justify-center' />
				</Link>

				<button
					onClick={() => {}}
					className='w-12 h-12 mr-2 flex items-center justify-center border border-zinc-500 rounded-lg hover:border-[2px] icon-size'
				>
					<i className='fi fi-bs-menu-burger w-[48px] h-[48px] flex items-center justify-center'></i>
				</button>
			</div>
		</div>
	)
}
