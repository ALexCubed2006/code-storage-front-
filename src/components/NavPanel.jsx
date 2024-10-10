import { Link } from 'react-router-dom'
import AppLink from '../shared/AppLink'
import './NavPanel.css'

export default function NavPanel() {
	return (
		<div className='w-full h-[75px] border-b border-zinc-900 flex absolute'>
			<div>test</div>

			<div className='flex items-center justify-end grow p-4'>
				<AppLink authType={'redirectLogin'} className='p-2 m-2'>
					login
				</AppLink>
				<AppLink authType={'redirectRegister'} className='p-2 m-2'>
					register
				</AppLink>
				<Link
					to='/home'
					className='w-12 h-12 flex items-center justify-center border border-zinc-900 rounded-lg hover:border-[2px] icon-size'
				>
					<i className=' fi-bs-home w-[48px] h-[48px] flex items-center justify-center' />
				</Link>
				<button className='w-12 h-12 flex items-center justify-center border border-zinc-900 rounded-lg hover:border-[2px] icon-size'>
					<i className='fi fi-bs-menu-burger w-[48px] h-[48px] flex items-center justify-center'></i>
				</button>
			</div>
		</div>
	)
}
