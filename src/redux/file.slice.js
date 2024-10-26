import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	files: [],
	uploadedFiles: [],
	uploadedAmount: 0,
}

export const fileSlice = createSlice({
	name: 'fileSlice',
	initialState,
	reducers: {
		setFiles: (state, action) => {
			state.files = action.payload.files
		},
		setUploadedFiles: (state, action) => {
			state.uploadedFiles = action.payload.files
			state.uploadedAmount = state.uploadedFiles.length
		},
		setUploadedFile: (state, action) => {
			state.uploadedFiles.push(action.payload.file)
		},
	},
})

export const { setFiles, setUploadedFiles, setUploadedFile } = fileSlice.actions

export default fileSlice.reducer
