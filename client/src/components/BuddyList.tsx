import { useState, useEffect } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useNavigate, useLocation } from 'react-router-dom'

type Users = {
	name: string
	email: string
	avatar: string
	activeRooms: string[]
	refreshToken: string
	isOnline: boolean
}

const BuddyList = () => {
	const [users, setUsers] = useState<Users[]>([])
	const axiosPrivate = useAxiosPrivate()

	const navigate = useNavigate()
	const location = useLocation()

	const openChat = (userId: string) => {
		alert(`userId: ${userId}`)
	}

	/* Fetch all users */
	useEffect(() => {
		// let isMounted = true
		const controller = new AbortController()

		const getUsers = async () => {
			try {
				const response = await axiosPrivate.get('/users', {
					//signal: controller.signal
				})
				// console.log('response', response.data)
				// isMounted && setUsers(response.data)
				setUsers(response.data)
			} catch (err) {
				console.log('Refresh Token expired.')
				navigate('/login', { state: { from: location }, replace: true })
			}
		}
		getUsers()

		/* clean up */
		return () => {
			// isMounted = false
			controller.abort()
		}
	}, [axiosPrivate, location, navigate])

	return (
		<article>
			<h3 className="text-yellow-300 text-2xl font-bold px-3 py-4 tracking-wider">Tok Buddies</h3>
			{users?.length ? (
				<ul>
					{users.map((user: any, i) => (
						<li key={user._id}>
							<div
								onClick={e => openChat(user._id)}
								className="my-1 px-8 flex items-center gap-2 hover:cursor-pointer hover:bg-violet-900"
							>
								<div className="relative">
									<img
										src={user.avatar}
										alt={user.name}
										className="w-10 h-10 p-1 rounded-full object-cover"
									/>
									<span className="bottom-4 right-12 absolute w-3 h-3 bg-green-500  dark:border-gray-800 rounded-full"></span>
								</div>
								<div>
									<p className="text-md text-gray-100">{user.name}</p>
								</div>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p>No users</p>
			)}
		</article>
	)
}

export default BuddyList
