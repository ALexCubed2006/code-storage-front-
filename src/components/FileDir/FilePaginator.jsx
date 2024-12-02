import { memo } from 'react'
import { useSelector } from 'react-redux'
import FileComponent from './FileComponent'

const FilePaginator = memo(({ tab }) => {
	console.log('[FilePaginator] rendered')
	const files = useSelector((state) => state.file.files)

	return (
		<div className='grid grid-cols-1'>
			{files.map((file) => (
				<FileComponent key={file.id} file={file} tab={tab} />
			))}
		</div>
	)
})

export default FilePaginator
