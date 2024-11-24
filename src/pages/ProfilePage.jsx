import { memo } from 'react'
import TopNav from '../components/TopNav/TopNav'
import Profile from '../content/Profile'

const ProfilePage = memo(() => {
	return (
		<div className='h-[100vh] w-full flex flex-col'>
			<TopNav />
			<Profile />
		</div>
	)
})

export default ProfilePage
