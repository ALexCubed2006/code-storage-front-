import TopNav from '../components/TopNav/TopNav'
import Profile from '../content/Profile'

export default function ProfilePage() {
	return (
		<div className='h-[100vh] w-full flex flex-col'>
			<TopNav />
			<Profile />
		</div>
	)
}
