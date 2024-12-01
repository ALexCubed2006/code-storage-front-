import axios from 'axios'
import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import {
	API_URL_ACCESS_TYPES,
	API_URL_UPLOAD_TYPES,
	APP_THEMES,
	LANG,
	ROUTES,
} from './config'
import { AuthContext, LangContext, ThemeContext } from './context'
import AboutPage from './pages/AboutPage'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MaterialsUsed from './pages/MaterialsUsed'
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
			const res = await axios.get(API_URL_ACCESS_TYPES.authorization, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			const files = await axios.get(API_URL_UPLOAD_TYPES.getUserFiles, {
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

	return (
		<>
			<ThemeContext.Provider value={APP_THEMES.light}>
				<LangContext.Provider value={LANG.default}>
					<AuthContext.Provider value={!!token}>
						<Routes>
							<Route
								path={ROUTES.default}
								element={<StartPage />}
							/>
							<Route path={ROUTES.home} element={<HomePage />} />
							<Route
								path={ROUTES.profile}
								element={<ProfilePage />}
							/>
							<Route
								path={ROUTES.login}
								element={<LoginPage type={ROUTES.login} />}
							/>
							<Route
								path={ROUTES.register}
								element={<LoginPage type={ROUTES.register} />}
							/>
							<Route
								path={ROUTES.about}
								element={<AboutPage />}
							/>
							<Route
								path={ROUTES.materialsUsed}
								element={<MaterialsUsed />}
							/>
							<Route path={ROUTES.all} element={<ErrorPage />} />
						</Routes>
					</AuthContext.Provider>
				</LangContext.Provider>
			</ThemeContext.Provider>
		</>
	)
}

export default App
