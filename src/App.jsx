import axios from 'axios'
import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { API_URL_ACCESS, API_URL_UPLOAD } from './config'
import { AuthContext, LangContext, ThemeContext } from './context'
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
			const res = await axios.get(`${API_URL_ACCESS}/isAuthorized`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			const files = await axios.get(`${API_URL_UPLOAD}/getUserFileIds`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (res.data?.error) {
				console.warn(res.data.error)
				localStorage.removeItem('token')
				dispatch(logOut())
				return null
			}
			dispatch(setUserData(res.data))

			if (files.data) {
				const filesIdArray = files.data.map((file) => file.id)
				dispatch(setUserFilesId({ filesIdArray }))
			}
		}
		getUserData()
	}, [token])

	// return main routes of app
	// TODO: add more routes
	return (
		<>
			<ThemeContext.Provider value={'light'}>
				<LangContext.Provider value={'en'}>
					<AuthContext.Provider value={!!token}>
						<Routes>
							<Route path='/' element={<StartPage />} />
							<Route path='/home' element={<HomePage />} />
							<Route path='/profile' element={<ProfilePage />} />
							<Route
								path='/login'
								element={<LoginPage type={'login'} />}
							/>
							<Route
								path='/register'
								element={<LoginPage type='register' />}
							/>
						</Routes>
					</AuthContext.Provider>
				</LangContext.Provider>
			</ThemeContext.Provider>
		</>
	)
}

export default App
