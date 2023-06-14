import { useContext, useState } from 'react'
import axios from '../../api/axios'

import AuthContext from '../../contexts/authContext'

const LoginForm = () => {
	const { setAuth } = useContext<any>(AuthContext)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const login = async (event: any) => {
		event.preventDefault()
		try {
			const response = await axios.post(
				'/login',
				JSON.stringify({
					email,
					password
				}),
				{
					headers: {
						'Content-Type': 'application/json'
					},
					withCredentials: true
				}
			)
			const accessToken = response?.data?.accessToken
			const user = response?.data?.user
			console.log(response)
			setAuth({ user, accessToken })
		} catch (err: any) {
			if (!err?.response) {
				console.log('No response from server.')
			} else if (err?.response?.status === 400) {
				console.log('Invalid email or password.')
			} else if (err?.response?.status === 401) {
				console.log('Unauthorized.')
			} else {
				console.log('Log in failed.')
			}
		}

		/* reset form fields */
		setEmail('')
		setPassword('')
	}

	return (
		<div className="bg-violet-700 rounded-lg m-4 p-4 text-yellow-200 md:w-1/2 lg:w-1/3">
			<h1 className="text-4xl font-bold">Tokativ</h1>
			<form>
				<div className="px-4 py-2">
					<label className="w-full" htmlFor="email">
						Email
					</label>
					<input
						className="h-10 rounded w-full"
						type="text"
						name="email"
						id="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div className="px-4 py-2">
					<label className="w-full" htmlFor="password">
						Password
					</label>
					<input
						className="h-10 rounded w-full"
						type="password"
						name="password"
						id="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<div className="p-4">
					<button
						className="p-2 rounded text-violet-800 uppercase font-medium bg-yellow-400 hover:text-violet-900 hover:bg-yellow-300 w-full"
						type="button"
						onClick={login}
					>
						Log in
					</button>
				</div>
			</form>
			<p className="p-4">Don't have an account? Register Here.</p>
		</div>
	)
}

export default LoginForm
