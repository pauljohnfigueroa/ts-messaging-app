import { useState, useEffect } from 'react'
import axios from '../../api/axios'

const Users = () => {
	const [users, setUsers] = useState([])

	/* Fetch all users */
	useEffect(() => {
		let isMounted = true
		const controller = new AbortController()

		const getUsers = async () => {
			try {
				const response = await axios.get('/users', {
					signal: controller.signal
				})
				console.log(response)
				isMounted && setUsers(response.data)
			} catch (error) {
				console.error(error)
			}
		}
		getUsers()

		/* clean up */
		return () => {
			isMounted = false
			controller.abort()
		}
	}, [])

	return (
		<article>
			<h1 className="text-xl font-bold">Users List</h1>
			{users?.length ? (
				<ul>
					{users.map((user, i) => (
						<li key={i}>{user}</li>
					))}
				</ul>
			) : (
				<p>No users</p>
			)}
		</article>
	)
}

export default Users
