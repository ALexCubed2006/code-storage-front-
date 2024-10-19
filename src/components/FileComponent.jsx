export default function FileComponent({ file }) {
	return (
		<div className='w-full h-full bg-blank-img bg-no-repeat bg-contain bg-center flex items-center justify-center'>
			<div className='w-[220px] h-[370px] flex flex-col text-2xl underline underline-offset-[16px]'>{file.name}</div>
		</div>
	)
}
