import axios from 'axios'
import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import StartPage from './pages/StartPage'
import { logOut, setUserData, setUserFilesId } from './redux/auth.slice'

function App() {
	console.log('[App] rendered')
	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token)

	useLayoutEffect(() => {
		// get user data and set it in redux store
		async function getUserData() {
			if (!token) return
			const res = await axios.get(
				'http://localhost:3456/api/access/isAuthorized',
				{
					headers: {
						Authorization: `Bearer ${token}`,
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
			const files = await axios.get(
				'http://localhost:3456/api/upload/getUserFileIds',
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			dispatch(setUserFilesId({ files: files.data }))
		}
		getUserData()
	}, [token])

	// return main routes of app
	// TODO: add more routes
	return (
		<>
			<Routes>
				<Route path='/' element={<StartPage />} />
				<Route path='/home' element={<HomePage />} />
				<Route path='/profile' element={<ProfilePage />} />
				<Route path='/login' element={<LoginPage type={'login'} />} />
				<Route
					path='/register'
					element={<LoginPage type='register' />}
				/>
			</Routes>
		</>
	)
}

export default App
