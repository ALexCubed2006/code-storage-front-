import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AppLink({ children, authType }) {
	const navigate = useNavigate()

	//
	async function login() {
		const response = await axios.get(`http://localhost:3456/api/auth/${authType}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			}
		})

		if (response.data.navigate) {
			navigate(response.data.navigate)
		} else navigate('/login')
	}

	return <button onClick={login}>{children}</button>
}
