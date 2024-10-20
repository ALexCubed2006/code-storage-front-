import NavPanel from '../components/NavPanel/NavPanel'
import Main from '../content/Main'

export default function StartPage() {
	return (
		<div className='h-[100vh] w-full flex flex-col'>
			<NavPanel />
			<Main />
		</div>
	)
}
