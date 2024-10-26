import NavPanel from '../components/NavPanel/NavPanel'
import Home from '../content/Home'

export default function HomePage() {
	return (
		<div className='h-[100vh] w-full flex flex-col'>
			<NavPanel />
			<Home />
		</div>
	)
}
