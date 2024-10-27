import TopNav from '../components/TopNav/TopNav'
import Home from '../content/Home'

export default function HomePage() {
	return (
		<div className='h-[100vh] w-full flex flex-col'>
			<TopNav />
			<Home />
		</div>
	)
}
