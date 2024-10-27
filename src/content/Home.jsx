import ContentContainer from '../components/FileDir/ContentContainer'
import './Content.css'

export default function Home() {
	return (
		<div className='w-full h-full'>
			<div className='w-full h-full content-grid-layout'>
				<div>
					{/* TODO: add sidebar */}
				</div>
				<div className='mx-[5%] my-[2%]'>
					<ContentContainer />
				</div>
			</div>
		</div>
	)
}
