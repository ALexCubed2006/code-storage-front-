import AuthForm from '../components/AuthForm/AuthForm'

export default function LoginPage({ type }) {
	return (
		<div className='h-[100vh] w-full flex flex-col'>
			<AuthForm type={type} />
		</div>
	)
}
