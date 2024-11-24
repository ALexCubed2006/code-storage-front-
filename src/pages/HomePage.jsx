import { memo } from 'react'
import TopNav from '../components/TopNav/TopNav'
import Home from '../content/Home'

const HomePage = memo(() => {
	return (
		<div className='h-[100vh] w-full flex flex-col'>
			<TopNav />
			<Home />
		</div>
	)
})

export default HomePage
