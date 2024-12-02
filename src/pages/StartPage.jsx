import { memo } from 'react'
import TopNav from '../components/TopNav/TopNav'
import Main from '../content/Main'

const StartPage = memo(() => {
	return (
		<div className='h-[100vh] w-full flex flex-col'>
			<TopNav />
			<Main />
		</div>
	)
})

export default StartPage
