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
	const { dispatch, onlineBuddies, chatDetails } = useContext<any>(ActiveRoomsContext)

	const [buddies, setBuddies] = useState<Buddy[]>([])
	const axiosPrivate = useAxiosPrivate()

	const navigate = useNavigate()
	const location = useLocation()

	const openChat: ChatProps = async (userId, buddyId, name, email, avatar) => {
		// close any open chat window first
		dispatch({ type: ACTIVE_ROOMS_ACTION_TYPES.CHAT_BOX_OPEN, payload: false })
		// leave the previous room to avoid cross-talk to other room
		if (chatDetails) {
			socket.emit('leave-previous-room', chatDetails.activeRoom)
		}
		// clear the chat details
		dispatch({
			type: ACTIVE_ROOMS_ACTION_TYPES.SET_CHAT_DETAILS,
			payload: {}
		})

		try {
			// get the room id
			const response = await axiosPrivate.post('/rooms', {
				name: userId,
				members: [userId, buddyId]
			})
			const room = response.data
			// open the chat window
			dispatch({ type: ACTIVE_ROOMS_ACTION_TYPES.CHAT_BOX_OPEN, payload: true })
			// set the chat details
			dispatch({
				type: ACTIVE_ROOMS_ACTION_TYPES.SET_CHAT_DETAILS,
				payload: { buddyId, name, email, avatar, activeRoom: room._id }
			})
			// join room
			socket.emit('user-private-chat', room._id)
		} catch (err) {
			console.log('Refresh Token expired in OpenChat.')
			navigate('/login', { state: { from: location }, replace: true })
		}
	}

	/* Fetch all users */
	useEffect(() => {
		let isMounted = true
		const controller = new AbortController()

		const getUsers = async () => {
			try {
				await axiosPrivate
					.get('/users', {
						signal: controller.signal
					})
					.then(response => {
						isMounted && setBuddies(response.data)
					})
					.catch(err => {
						if (err.name === 'CanceledError') {
							console.log('BuddyList CanceledError')
						}
					})
			} catch (err) {
				console.log('Refresh Token expired in BuddyList.')
				navigate('/login', { state: { from: location }, replace: true })
			}
		}
		getUsers()

		/* clean up */
		return () => {
			isMounted = false
			controller.abort()
		}
	}, [axiosPrivate, location, navigate, onlineBuddies])

	/* A user logs in */
	useEffect(() => {
		if (socket) {
			socket.on('user-logged-in', (userId: string) => {
				dispatch({ type: ACTIVE_ROOMS_ACTION_TYPES.GO_ONLINE, payload: userId })
			})
		}
	}, [socket, dispatch])

	/* A user logs out */
	useEffect(() => {
		if (socket) {
			socket.on('user-logged-out', (userId: string) => {
				dispatch({ type: ACTIVE_ROOMS_ACTION_TYPES.GO_OFFLINE, payload: userId })
			})
		}
	}, [socket, dispatch])

	return (
		<article>
			<h3 className="text-yellow-300 text-2xl font-bold px-3 py-4 tracking-wider">Tok Buddies</h3>
			{buddies.length > 0 ? (
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
													onlineBuddies?.includes(buddy._id) || buddy.isOnline
														? 'bottom-4 right-12 absolute w-3 h-3 bg-green-500  dark:border-gray-800 rounded-full'
														: 'hidden'
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
