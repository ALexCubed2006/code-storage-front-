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
		addFile: (state, action) => {
			if (files.length >= 10) return
			state.files.push(action.payload.file)
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
		deleteUserFile: (state, action) => {
			state.files = state.files.filter(
				(file) => file.id !== action.payload.fileId,
			)
		},
		deleteFromFavorites: (state, action) => {
			state.files = state.files.filter(
				(file) => file.id !== action.payload.fileId,
			)
		},
	},
})

export const {
	setFiles,
	addFile,
	setUploadedFiles,
	setUploadedFile,
	addUploadedAmount,
	updateIsPublic,
	deleteUserFile,
	deleteFromFavorites,
} = fileSlice.actions

export default fileSlice.reducer
