import axios from 'axios'
import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import StartPage from './pages/StartPage'
import { logOut, setUserData } from './redux/authSlice'

function App() {
	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token)

	// что использовать?
	// useLayoutEffect или useEffect?
	useLayoutEffect(() => {
		// get user data and set it in redux store
		async function getUserData() {
			if (!token) return
			const res = await axios.get(
				'http://localhost:3456/api/access/isAuthorized',
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				},
			)

			if (res.data?.error) {
				console.warn(res.data.error)
				localStorage.removeItem('token')
				dispatch(logOut())
				return null
			}

			const { name, email, role, groupRole } = res.data

			if (name && email) {
				dispatch(setUserData({ name, email, role, groupRole }))
			}
		}
		getUserData()
	}, [token])

	// return main routes of app
	return (
		<>
			<Routes>
				<Route path='/' element={<StartPage />} />
				<Route path='/home' element={<HomePage />} />
				<Route path='/login' element={<LoginPage type={'login'} />} />
				<Route path='/register' element={<LoginPage type='register' />} />
			</Routes>
		</>
	)
}

export default App
