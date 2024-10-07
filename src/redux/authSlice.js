import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	token: null,
}

export const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload
			localStorage.setItem('token', action.payload)
		},
	},
})

export const { setToken } = authSlice.actions

export default authSlice.reducer

