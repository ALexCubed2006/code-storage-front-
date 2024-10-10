import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	name: null,
	email: null,
	token: localStorage.getItem('token'),
}

export const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		// setting user data in redux store
		setUserData: (state, action) => {
			state.name = action.payload.name
			state.email = action.payload.email
		},

		// setting token in redux store
		setToken: (state, action) => {
			state.token = action.payload.token
		},
	},
})

// actions
export const { setUserData, setToken } = authSlice.actions

export default authSlice.reducer
