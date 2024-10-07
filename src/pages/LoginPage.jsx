//import axios from 'axios'
import AuthForm from '../components/authForm/AuthForm'

export default function LoginPage({ type }) {
	// async function getUsers() {
	// 	const res = await axios.get('http://localhost:3456/getUsers', {
	// 		headers: {
	// 			Authorization: `Bearer ${localStorage.getItem('token')}`,
	// 		},
	// 	})
	// 	console.log(res.data)
	// }
	return (
		<div>
			<AuthForm type={type}/>
		</div>
	)
}
