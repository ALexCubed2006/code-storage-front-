import axios from 'axios'
import { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	API_URL_ACCESS_TYPES,
	API_URL_CHANGE_DATA,
	ROLES,
	ROUTES,
} from '../config'
import { changeUserData, logOut } from '../redux/auth.slice'
import EditableTextField from '../shared/EditableTextField'
import './Content.css'

export default function Profile() {
	console.log('[Profile] rendered component')
	const dispatch = useDispatch()
	const name = useSelector((state) => state.auth.name)
	const role = useSelector((state) => state.auth.role)
	const phoneNumber = useSelector((state) => state.auth.phoneNumber)
	const email = useSelector((state) => state.auth.email)
	const token = useSelector((state) => state.auth.token)
	const [editMode, setEditMode] = useState(false)

	useLayoutEffect(() => {
		setValues({
			name,
			role,
			phoneNumber,
			email,
		})
	}, [name, role, phoneNumber, email])

	const [values, setValues] = useState({
		name,
		role,
		phoneNumber,
		email,
	})

	async function editProfile(type, value) {
		const access = await axios.post(
			API_URL_ACCESS_TYPES.editProfile,
			{
				type: type,
				value: value,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)

		if (access.data?.error) {
			console.warn(access.data.error)
		}

		if (access.data.access) {
			const res = await axios.put(
				`${API_URL_CHANGE_DATA}/change-${type}`,
				{
					value,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			console.log(res.data)
			if (res.data?.error) {
				console.warn(res.data.error)
			}
			if (res.data.success) {
				dispatch(changeUserData({ type, value }))
			}
		}
	}

	function handleSwitchEditMode() {
		setEditMode(!editMode)
	}

	function handleCancelProfile() {
		setEditMode(false)
		setValues()
	}

	function handleSaveProfile() {
		setEditMode(false)
		editProfile('name', values.name)
		editProfile('role', values.role)
		editProfile('phoneNumber', values.phoneNumber)
		editProfile('email', values.email)
	}

	const navigate = useNavigate()
	function handleLogout() {
		setEditMode(false)
		dispatch(logOut())
		navigate(ROUTES.default)
	}

	return (
		<div className='w-[60%] h-[80%] box-border m-auto'>
			<div
				className={
					editMode
						? 'w-full h-full box-border px-8 py-4 border rounded-2xl border-zinc-300 box-shadow flex flex-col justify-between'
						: 'w-full h-full box-border px-8 py-4 border rounded-2xl bg-zinc-50 border-zinc-300 box-shadow flex flex-col justify-between'
				}
			>
				<div>
					<div className='profile-grid-name-marking mt-2'>
						<div className='w-16 h-16 flex items-center justify-center text-5xl shadow-xl rounded border border-zinc-200'>
							<i className='fi fi-rs-user flex items-center justify-center' />
						</div>
						<div className='flex flex-col justify-between'>
							<p className='text-2xl indent-2'>
								{name ? name : 'Guest'}
							</p>
							<p className='text-sm text-zinc-500'>
								role: {role.toLowerCase()}
							</p>
						</div>
					</div>

					<div className='my-4 h-full flex flex-col justify-between'>
						<EditableTextField
							type={'email'}
							editMode={editMode}
							setValues={setValues}
						>
							{email}
						</EditableTextField>
						<EditableTextField
							type={'phoneNumber'}
							editMode={editMode}
							setValues={setValues}
						>
							{phoneNumber ? phoneNumber : 'not specified'}
						</EditableTextField>
						<EditableTextField
							type={'name'}
							editMode={editMode}
							setValues={setValues}
						>
							{name}
						</EditableTextField>

						<select
							className={
								editMode
									? 'my-1 p-2 w-full h-auto shadow-sm rounded-s border border-zinc-200 block'
									: 'my-1 p-2 w-full h-auto shadow-sm rounded-s border border-zinc-200 bg-zinc-100 block text-zinc-500'
							}
							disabled={!editMode}
							onChange={(e) => {
								setValues({
									...values,
									role: e.target.value,
								})
							}}
						>
							<option value={role}>{role}</option>
							{ROLES.admin !== role && (
								<option value={ROLES.admin}>
									{ROLES.admin}
								</option>
							)}
							{ROLES.user !== role && (
								<option value={ROLES.user}>{ROLES.user}</option>
							)}
							{ROLES.guest !== role && (
								<option value={ROLES.guest}>
									{ROLES.guest}
								</option>
							)}
						</select>
					</div>
				</div>

				<div className='w-full flex justify-between'>
					{editMode ? (
						<button
							className='flex items-center justify-center'
							onClick={handleLogout}
						>
							<span className='px-8 p-2 h-12 bg-red-100 hover:bg-red-300 transition-all rounded active:text-red-500 active:scale-95 inline-flex items-center justify-center mb-2 shadow'>
								Logout
								<i className='fi fi-rs-exit flex items-center justify-center ml-2' />
							</span>
						</button>
					) : (
						''
					)}
					{editMode ? (
						<div className='flex justify-end items-center'>
							<button
								className='px-8 p-2 h-12 bg-red-100 hover:bg-red-300 transition-all rounded active:text-red-500 active:scale-95 flex items-center justify-center mb-2 shadow'
								onClick={handleCancelProfile}
							>
								Cancel
							</button>
							<button
								className='px-8 p-2 h-12 bg-lime-100 hover:bg-lime-300 transition-all rounded active:text-lime-500 active:scale-95 flex items-center justify-center mb-2 shadow'
								onClick={handleSaveProfile}
							>
								Save
							</button>
						</div>
					) : (
						<button
							className='px-8 p-2 h-12 bg-lime-100 hover:bg-lime-300 transition-all rounded active:text-blue-500 active:scale-95 flex items-center justify-center mb-2 shadow'
							onClick={handleSwitchEditMode}
						>
							Edit
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
