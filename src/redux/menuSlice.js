import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isMenuOpen: false,
    isModalOpen: false,
}

export const menuSlice = createSlice({
	name: 'menuSlice',
	initialState,
	reducers: {
		toggleMenu: (state) => {
			state.isMenuOpen = !state.isMenuOpen
		},
        toggleModal: (state) => {
            state.isModalOpen = !state.isModalOpen
        },
	},
})

// actions
export const { toggleMenu, toggleModal } = menuSlice.actions

export default menuSlice.reducer
