import { useRef, useState } from 'react'

export default function EditableTextField({
	type,
	children,
	role,
	editMode,
	setValues = () => {},
}) {
	console.log('[EditableTextField] rendered')
	const inputRef = useRef(children)
	let prevValue = null
	let [ignoreFocus, setIgnoreFocus] = useState(false)

	return (
		<>
			<div className='w-full flex'>
				<input
					type='text'
					className={
						editMode
							? 'my-1 p-2 w-full h-auto shadow-sm rounded-s border border-zinc-200 block'
							: 'my-1 p-2 w-full h-auto shadow-sm rounded-s border border-zinc-200 bg-zinc-100 block text-zinc-500'
					}
					disabled={!editMode}
					ref={inputRef}
					placeholder={type + ': ' + children}
					onFocus={() => {
						if (!ignoreFocus) {
							prevValue = inputRef.current.value
							inputRef.current.value = children
							setIgnoreFocus(true)
						}
					}}
					onChange={(e) => {
						setValues((prev) => {
							console.log(e.target.value)
							console.log(prev)
							return {
								...prev,
								[type]: e.target.value,
							}
						})
					}}
				/>
			</div>
		</>
	)
}
