import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import menuSlice from './menuSlice'

const reducer = {
	auth: authSlice,
	menu: menuSlice,
}

export default configureStore({
	reducer,
})
