import { memo } from 'react'
import AuthForm from '../components/AuthForm/AuthForm'

const LoginPage = memo(({ type }) => {
	return (
		<div className='h-[100vh] w-full flex flex-col'>
			<AuthForm type={type} />
		</div>
	)
})

export default LoginPage
