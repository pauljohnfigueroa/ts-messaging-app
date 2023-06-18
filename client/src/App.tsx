import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './pages/login/LoginForm'
import RegisterForm from './pages/register/RegisterForm'
import Dashboard from './pages/dashboard/Dashboard'
import Users from './pages/users/Users'

import { io } from 'socket.io-client'
import { useAuthContext } from './hooks/useAuthContext'
import { useSocketContext } from './hooks/useSocketContext'
import { SOCKET_ACTION_TYPE } from './contexts/socketContext'

function App() {
	const { auth }: any = useAuthContext()
	const { socket, dispatch }: any = useSocketContext()

	/* check if the user is authenticated */
	const isAuth = Boolean(auth?.accessToken)

	/* Initialize the socket */
	useEffect(() => {
		if (isAuth && !socket) {
			const newSocket = io('http://localhost:8000', {
				/* autoConnect is set to false so the connection
				is not established right away.
				We will manually call socket.connect() later,
				once the user has selected a username. */
				autoConnect: false,

				/* send to server */
				query: {
					accessToken: auth?.accessToken,
					userId: auth?.user?._id,
					userName: auth?.user?.name
				}
			})
			/* socket connect */
			newSocket.on('connect', () => {
				console.log(`newSocket on connect ${newSocket.id}`)
			})
			/* Socket disconnect */
			newSocket.on('disconnect', () => {
				console.log(`newSocket on disconnect ${newSocket.id}`)
			})

			/* The connect_error event will be emitted upon connection failure:
				- due to the low-level errors (when the server is down for example)
				- due to middleware errors */
			newSocket.on('connect_error', (err: any) => {
				if (err.message === 'Unauthorized') {
					console.log('Unauthorized')
				}
			})
			/* socket state */
			dispatch({ type: SOCKET_ACTION_TYPE.CONNECT, payload: newSocket })
		}
		/* a user connects */
		if (socket) {
			socket.connect()
			socket.emit('user-connects', socket.id)
		}

		/* clean up */
		return () => {
			if (socket) {
				socket.off('connect')
				socket.off('disconnect')
				socket.off('connect_error')
				console.log('Run clean up.')
			}
		}
	}, [isAuth, auth, socket, dispatch])

	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={isAuth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
					/>
					<Route path="/login" element={<LoginForm />} />
					<Route path="/register" element={<RegisterForm />} />
					<Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/" />} />
					<Route path="/users" element={isAuth ? <Users /> : <Navigate to="/" />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
