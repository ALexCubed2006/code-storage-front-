export default function FileImg({ file }) {
	return (
		<div className='w-full h-full bg-blank-img bg-no-repeat bg-contain bg-center flex items-center justify-center'>
			{/* TODO: add image */}
			<div className='w-[220px] h-[370px] flex flex-col text-2xl underline underline-offset-[16px]'>{file.name}</div>
		</div>
	)
}
