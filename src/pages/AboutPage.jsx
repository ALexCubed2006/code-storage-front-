import { Link } from 'react-router-dom'
import TopNav from '../components/TopNav/TopNav'

export default function AboutPage() {
	return (
		<div className='w-screen h-screen flex flex-col'>
			<TopNav />

			<div className='w-full h-full flex flex-col items-center justify-start text-2xl'>
				<h1>About</h1>
				<p>-----</p>
				<p>Code Storage</p>
				<p>Version: 1.0</p>
				<p>Created by AlexCubed</p>
				<p>-----</p>
				<p>Name: Alex Yakubitski</p>
				<p>
					Student:{' '}
					<a href='https://belstu.by/'>
						BSTU - Belarusian State Technological University
					</a>
				</p>
				<p>Course: 1 Informational systems and technologies</p>
				<p>-----</p>
				<p>
					email:{' '}
					<a
						href='mailto:alexyakubitski@gmail.com'
						className='underline text-blue-500'
					>
						alexyakubitski@gmail.com
					</a>
				</p>
				<p>
					Github:
					<a
						href='https://github.com/ALexCubed2006'
						target='_blank'
						className='underline text-blue-500'
					>
						click
					</a>
				</p>
				<p>
					dockerhub:
					<a
						href='https://hub.docker.com/u/alexcubed'
						target='_blank'
						className='underline text-blue-500'
					>
						click
					</a>
				</p>
				<p>-----</p>
				<p>
					Used technologies:{' '}
					<Link to='/used' className='underline text-blue-500'>
						click
					</Link>
				</p>
			</div>
		</div>
	)
}
