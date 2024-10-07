import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import StartPage from './pages/StartPage'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<StartPage />} />
				<Route path='/home' element={<HomePage />} />
				<Route path='/login' element={<LoginPage type={'login'}/>} />
				<Route path='/register' element={<LoginPage type='register' />} />
			</Routes>
		</>
	)
}

export default App
