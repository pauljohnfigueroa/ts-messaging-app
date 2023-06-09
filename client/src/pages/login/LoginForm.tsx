import { useContext, useState, MouseEvent, KeyboardEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import axios from '../../api/axios'

import AuthContext from '../../contexts/authContext'
import { useSocketContext } from '../../hooks/useSocketContext'
import { AUTH_ACTION_TYPE } from '../../contexts/authContext'

const LoginForm = () => {
	const { dispatch } = useContext<any>(AuthContext)
	const { socket }: any = useSocketContext()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate()
	const location = useLocation()
	const navigateFrom = location.state?.from?.pathname || '/'

	const login = async (event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
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
			/* reset form fields */
			setEmail('')
			setPassword('')

			const accessToken = response?.data?.accessToken
			const user = response?.data?.user

			dispatch({ type: AUTH_ACTION_TYPE.LOGIN, payload: { user, accessToken } })
			navigate(navigateFrom, { replace: true })
			if (socket) {
				socket.emit('user-logs-in', user._id)
			}
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
	}

	return (
		<section className="grid h-screen place-items-center">
			<div className="bg-violet-700 rounded-lg m-4 p-4 md:w-1/2 lg:w-1/3">
				<h1 className="text-4xl font-bold text-yellow-400">Tokativ</h1>
				<form>
					<div className="px-4 py-2">
						<label className="w-full text-yellow-300" htmlFor="email">
							Email
						</label>
						<input
							className="h-10 rounded w-full p-2 text-violet-800"
							type="email"
							name="email"
							id="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div className="px-4 py-2">
						<label className="w-full text-yellow-300" htmlFor="password">
							Password
						</label>
						<input
							className="h-10 rounded w-full p-2 text-violet-800"
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
							type="submit"
							onClick={login}
						>
							Log in
						</button>
					</div>
				</form>
				<p className="p-4 text-yellow-50">
					Don't have an account?
					<a href="/register">
						<span className="font-bold text-yellow-300 hover:text-yellow-100">Register Here.</span>
					</a>
				</p>
			</div>
		</section>
	)
}

export default LoginForm
