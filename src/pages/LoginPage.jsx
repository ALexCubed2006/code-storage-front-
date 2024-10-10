import AuthForm from '../components/AuthForm'

export default function LoginPage({ type }) {
	return (
		<div>
			<AuthForm type={type} />
		</div>
	)
}
