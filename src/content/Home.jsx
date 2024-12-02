import ContentContainer from '../components/FileDir/ContentContainer'
import FileUploaderModal from '../components/FileUploaderModal'
import SideBar from '../components/SideBar'
import './Content.css'

export default function Home() {
	return (
		<div className='w-full h-full content-grid-layout'>
			<div className='mr-[20px] my-[20px]'>
				<SideBar>
					<FileUploaderModal />
				</SideBar>
			</div>
			<div className='mx-[20px] my-[20px]'>
				<ContentContainer />
			</div>
		</div>
	)
}
