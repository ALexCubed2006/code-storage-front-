import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	name: null,
	email: null,
	role: 'GUEST',
	groupRole: null,
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
			state.role = action.payload.role
			state.groupRole = action.payload.groupRole
		},

		// setting token in redux store
		setToken: (state, action) => {
			state.token = action.payload.token
		},

		// removing token from redux store and log out the user
		logOut: (state) => {
			state = initialState
		},
	},
})

// actions
export const { setUserData, setToken, logOut } = authSlice.actions

export default authSlice.reducer
