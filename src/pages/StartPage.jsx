import { memo } from 'react'
import TopNav from '../components/TopNav/TopNav'

const StartPage = memo(() => {
	return (
		<div className='h-[100vh] w-full flex flex-col'>
			<TopNav />
		</div>
	)
})

export default StartPage
