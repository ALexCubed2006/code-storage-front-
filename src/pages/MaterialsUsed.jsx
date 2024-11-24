import { Link } from 'react-router-dom'
import TopNav from '../components/TopNav/TopNav'

export default function MaterialsUsed() {
	return (
		<div className='w-screen h-screen flex flex-col'>
			<TopNav />
			<div className='w-full h-full flex flex-col items-center justify-start text-2xl'>
				<h1>Materials Used</h1>
				<p>-----</p>
				<p>React</p>
				<p>React Router</p>
				<p>Redux</p>
				<p>Tailwind</p>
				<p>Axios</p>
				<p>Flaticons</p>
				<p>-----</p>
				<p>Vite</p>
				<p>Yarn</p>
				<p>-----</p>
				<Link to='/about' className='underline text-blue-500'>
					Back
				</Link>
			</div>
		</div>
	)
}
