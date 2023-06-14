import { useContext } from 'react'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './pages/login/LoginForm'
import RegisterForm from './pages/register/RegisterForm'
import Dashboard from './pages/dashboard/Dashboard'
import Users from './pages/users/Users'

import AuthContext from './contexts/authContext'

import { io } from 'socket.io-client'

function App() {
	/* Socket.io-client */
	const socket = io('http://localhost:8000')
	socket.on('connect', () => {
		console.log(`TS Socket connected! - ${socket.id}`)
	})

	socket.on('disconnect', () => {
		console.log(`TS Socket disconnected! - ${socket.id}`) // undefined
	})

	/* check if the user is authenticated */
	// const isAuth = true // replace with actual code
	const { auth } = useContext<any>(AuthContext)

	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={auth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
					/>
					<Route path="/login" element={<LoginForm />} />
					<Route path="/register" element={<RegisterForm />} />
					<Route path="/dashboard" element={auth ? <Dashboard /> : <Navigate to="/" />} />
					<Route path="/users" element={auth ? <Users /> : <Navigate to="/" />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
