import { useSelector } from 'react-redux'
import FileComponent from './FileComponent'

export default function FilePaginator() {
	const files = useSelector((state) => state.file.files)

	return (
		<div className='grid grid-cols-1'>
			{files.map((file) => (
				<FileComponent key={file.id} file={file} />
			))}
		</div>
	)
}
