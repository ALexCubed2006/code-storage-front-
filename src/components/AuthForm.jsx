import axios from 'axios'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../redux/authSlice'

export default function AuthForm({ type }) {
	const email = useRef(null)
	const password = useRef(null)
	const name = useRef(null)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	// if you already have token
	// you will be redirected
	// to main page

	const token = localStorage.getItem('token')
	useEffect(() => {
		if (token) {
			navigate('/')
		}
	}, [navigate, token])

	// login
	// then set token in redux store
	// and redirect to main page
	const login = async (email, password, name = null) => {
		const res = await axios.post(`http://localhost:3456/api/auth/${type}`, {
			email: email.current.value,
			password: password.current.value,
			name,
		})

		localStorage.setItem('token', res.data.token)
		if (res.data.token) {
			dispatch(setToken({ token: res.data.token }))
			navigate('/')
		}
	}

	return (
		<main className='flex w-full h-[100vh] justify-center items-center box-border'>
			<div className='flex flex-col items-center w-[500px] h-[550px] m-auto border border-zinc-900 rounded-xl absolute'>
				<h1 className='p-6'>
					{type === 'login' ? 'Login Form' : 'Register Form'}
				</h1>

				<div className='flex flex-col grow p-4 justify-around items-center m-auto my-10 mb-20'>
					<input
						type='email'
						ref={email}
						id='email'
						className='border-b-2 border-zinc-500 transition-[border] duration-300 hover:border-zinc-900 p-1 m-2 focus:outline-none'
						placeholder='email'
					/>
					{type === 'register' && (
						<input
							type='text'
							ref={name}
							id='name'
							className='border-b-2 border-zinc-500 transition-[border] duration-300 hover:border-zinc-900 p-1 m-2 focus:outline-none'
							placeholder='name'
						/>
					)}
					<input
						autoComplete='off'
						type='password'
						ref={password}
						id='password'
						className='border-b-2 border-zinc-500 transition-[border] duration-300 hover:border-zinc-900 p-1 m-2 focus:outline-none'
						placeholder='password'
					/>
				</div>
				{type === 'login' ? (
					<button
						onClick={() => login(email, password)}
						className='border-b-2 border-zinc-500 transition-[border] duration-300 hover:border-zinc-900 p-1 m-2 focus:outline-none'
					>
						Login
					</button>
				) : (
					<button
						onClick={() => login(email, password, name)}
						className='border-b-2 border-zinc-500 transition-[border] duration-300 hover:border-zinc-900 p-1 m-2 focus:outline-none'
					>
						Register
					</button>
				)}
			</div>
		</main>
	)
}
