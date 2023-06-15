import { useContext } from 'react'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './pages/login/LoginForm'
import RegisterForm from './pages/register/RegisterForm'
import Dashboard from './pages/dashboard/Dashboard'
import Users from './pages/users/Users'

import { io } from 'socket.io-client'

// import AuthContext from './contexts/authContext'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
	// const { auth } = useContext<any>(AuthContext)
	const { user }: any = useAuthContext()

	/* check if the user is authenticated */
	const isAuth = Boolean(user?.accessToken)

	/* Socket.io-client */
	const socket = io('http://localhost:8000')
	socket.on('connect', () => {
		console.log(`TS Socket connected! - ${socket.id}`)
	})

	socket.on('disconnect', () => {
		console.log(`TS Socket disconnected! - ${socket.id}`) // undefined
	})

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
