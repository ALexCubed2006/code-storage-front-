import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	files: [],
	uploadedFiles: [],
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
		addUploadedAmount: (state, action) => {
			state.uploadedAmount += action.payload.amount
		},
		updateIsPublic: (state, action) => {
			state.files = state.files.map((file) => {
				if (file.id === action.payload.fileId) {
					return { ...file, isPublic: action.payload.isPublic }
				}
				return file
			})
		},
	},
})

export const {
	setFiles,
	setUploadedFiles,
	setUploadedFile,
	addUploadedAmount,
	updateIsPublic,
} = fileSlice.actions

export default fileSlice.reducer
