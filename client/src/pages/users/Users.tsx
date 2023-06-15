import { useState, useEffect } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useNavigate, useLocation } from 'react-router-dom'

const Users = () => {
	const [users, setUsers] = useState([])
	const axiosPrivate = useAxiosPrivate()

	const navigate = useNavigate()
	const location = useLocation()

	/* Fetch all users */
	useEffect(() => {
		let isMounted = true
		const controller = new AbortController()

		const getUsers = async () => {
			try {
				const response = await axiosPrivate.get('/users', {
					// signal: controller.signal
				})
				// console.log('response', response.data)
				isMounted && setUsers(response.data)
			} catch (err) {
				console.log('Users')
				navigate('/login', { state: { from: location }, replace: true })
			}
		}
		getUsers()

		/* clean up */
		return () => {
			isMounted = false
			controller.abort()
		}
	}, [axiosPrivate, location, navigate])

	return (
		<article>
			<h1 className="text-xl font-bold">Users List</h1>
			{users?.length ? (
				<ul>
					{users.map((user: any, i) => (
						<li key={i}>{user?.email}</li>
					))}
				</ul>
			) : (
				<p>No users</p>
			)}
		</article>
	)
}

export default Users
