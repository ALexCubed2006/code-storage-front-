import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_URL_REDIRECT } from '../config'

export default function AppLink({ children, authType, className }) {
	const navigate = useNavigate()

	// check if user is logged in
	async function loginCheck() {
		const token = localStorage.getItem('token')
		const response = await axios.get(`${API_URL_REDIRECT}/${authType}`, {
			headers: {
				Authorization: `Bearer ${token ? token : ''}`,
			},
		})

		// redirect to route, which path comes from server response
		if (response.data.navigate) {
			navigate(response.data.navigate)
		} else {
			navigate(`/login`)
		}
	}

	return (
		<button onClick={loginCheck} className={className}>
			{children}
		</button>
	)
}
