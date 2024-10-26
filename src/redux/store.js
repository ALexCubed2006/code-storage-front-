import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth.slice'
import fileSlice from './file.slice'

const reducer = {
	auth: authSlice,
	file: fileSlice,
}

export default configureStore({
	reducer,
})
