import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './pages/login/LoginForm'
import RegisterForm from './pages/register/RegisterForm'
import Dashboard from './pages/dashboard/Dashboard'
import Users from './pages/users/Users'

import { io } from 'socket.io-client'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
	const { auth }: any = useAuthContext()
	const [socket, setSocket] = useState<any>(null)

	/* check if the user is authenticated */
	const isAuth = Boolean(auth?.accessToken)

	/* Socket.io-client */
	// const socket = io('http://localhost:8000')
	// socket.on('connect', () => {
	// 	console.log(`TS Socket connected! - ${socket.id}`)
	// })

	// socket.on('disconnect', () => {
	// 	console.log(`TS Socket disconnected! - ${socket.id}`) // undefined
	// })

	useEffect(() => {
		if (isAuth && !socket) {
			const newSocket = io('http://localhost:8000', {
				query: {
					accessToken: auth?.accessToken,
					userId: auth?.user?._id
				}
			})

			newSocket.on('connect', () => {
				console.log(`newSocket on connect ${newSocket.id}`)
			})

			newSocket.on('disconnect', () => {
				console.log(`newSocket on disconnect ${newSocket.id}`)
			})
			setSocket(newSocket)
		}
		/* clean up */
		return () => {
			if (socket) {
				console.log('Run clean up.')
				socket.off('connect')
				socket.off('disconnect')
			}
		}
	}, [isAuth, socket, setSocket])

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
