import FileImg from './FileImg'
import FileTxt from './FileTxt'

export default function FileComponent({ file }) {
	const codeFileTypes = [
		'txt',
		'js',
		'css',
		'html',
		'json',
		'jsx',
		'md',
		'sass',
		'scss',
		'ts',
		'tsx',
	]
	const imgFileTypes = ['png', 'jpg', 'jpeg', 'gif', 'svg']
	const fileType = file.name.split('.').pop()

	const fileUploadedAt = new Date(file.uploadedAt)
	const fileUploadedAtFormatted = fileUploadedAt.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	return (
		<div className='w-full h-full border border-zinc-500'>
			<p>{file.name}</p>
			<p>{fileType}</p>

			{codeFileTypes.includes(fileType) ? (
				<FileTxt file={file} />
			) : imgFileTypes.includes(fileType) ? (
				<FileImg file={file} />
			) : null}

			<p>{fileUploadedAtFormatted}</p>
		</div>
	)
}
