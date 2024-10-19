import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	name: null,
	email: null,
	role: 'GUEST',
	groupRole: null,
	token: localStorage.getItem('token'),
	files: [],
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

		// setting user files
		setUserFiles: (state, action) => {
			state.files = action.payload.files
		},
		setUploadFile: (state, action) => {
			state.files.push(action.payload.file)
		},

		// setting token in redux store
		setToken: (state, action) => {
			state.token = action.payload.token
		},

		// removing token from redux store and log out the user
		logOut: (state) => {
			state = initialState
			localStorage.removeItem('token')
		},
	},
})

// actions
export const { setUserData, setUserFiles, setUploadFile, setToken, logOut } = authSlice.actions

export default authSlice.reducer
