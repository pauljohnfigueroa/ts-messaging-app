import { useState, useEffect, useContext } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useNavigate, useLocation } from 'react-router-dom'

import ActiveRoomsContext from '../contexts/activeRoomsContext'
import { ACTIVE_ROOMS_ACTION_TYPES } from '../contexts/activeRoomsContext'

import { useAuthContext } from '../hooks/useAuthContext'
import { useSocketContext } from '../hooks/useSocketContext'

export type Buddy = {
	_id: string
	name: string
	email: string
	avatar: string
	activeRooms: string[]
	refreshToken: string
	isOnline: boolean
}

type ChatProps = (
	userId: string,
	buddyId: string,
	name: string,
	email: string,
	avatar: string
) => void

const BuddyList = () => {
	const { auth }: any = useAuthContext()
	const { socket }: any = useSocketContext()
	const { dispatch, onlineBuddies } = useContext<any>(ActiveRoomsContext)

	const [buddies, setUsers] = useState<Buddy[]>([])
	const axiosPrivate = useAxiosPrivate()

	const navigate = useNavigate()
	const location = useLocation()

	const openChat: ChatProps = async (userId, buddyId, name, email, avatar) => {
		// close any open chat window first
		dispatch({ type: ACTIVE_ROOMS_ACTION_TYPES.CHAT_BOX_OPEN, payload: false })

		const response = await axiosPrivate.post('/rooms', {
			name: userId,
			members: [userId, buddyId]
		})

		//console.log('response.data', response.data)
		const room = response.data
		socket.emit('user-private-chat', room._id)

		// open the chat window
		dispatch({ type: ACTIVE_ROOMS_ACTION_TYPES.CHAT_BOX_OPEN, payload: true })
		dispatch({
			type: ACTIVE_ROOMS_ACTION_TYPES.SET_CHAT_DETAILS,
			payload: { buddyId, name, email, avatar, activeRoom: room._id }
		})
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
	}, [axiosPrivate, location, navigate, onlineBuddies])

	/* A user logs in */
	useEffect(() => {
		socket.on('user-logged-in', (userId: string) => {
			dispatch({ type: ACTIVE_ROOMS_ACTION_TYPES.ONLINE_BUDDIES, payload: userId })
		})
	}, [socket, dispatch])

	return (
		<article>
			<h3 className="text-yellow-300 text-2xl font-bold px-3 py-4 tracking-wider">Tok Buddies</h3>
			{buddies?.length ? (
				<ul>
					{buddies.map(
						(buddy, i) =>
							buddy.name !== auth.user.name && (
								<li key={buddy._id}>
									<div
										onClick={() =>
											openChat(auth?.user?._id, buddy._id, buddy.name, buddy.email, buddy.avatar)
										}
										className="my-1 px-8 flex items-center gap-2 hover:cursor-pointer hover:bg-violet-900"
									>
										<div className="relative">
											<img
												src={buddy.avatar}
												alt={buddy.name}
												className="w-10 h-10 p-1 rounded-full object-cover"
											/>
											<span
												className={
													onlineBuddies.includes(buddy._id) || buddy.isOnline
														? 'bottom-4 right-12 absolute w-3 h-3 bg-green-500  dark:border-gray-800 rounded-full'
														: 'bottom-4 right-12 absolute w-3 h-3 bg-gray-200  dark:border-gray-800 rounded-full'
												}
											></span>
										</div>
										<div>
											<p className="text-md text-gray-100">{buddy.name}</p>
										</div>
									</div>
								</li>
							)
					)}
				</ul>
			) : (
				<p>No users</p>
			)}
		</article>
	)
}

export default BuddyList
