import { useState, useContext, useEffect, useRef, MouseEvent } from 'react'
import ActiveRoomsContext from '../../contexts/activeRoomsContext'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useSocketContext } from '../../hooks/useSocketContext'
import { useAuthContext } from '../../hooks/useAuthContext'

import uuid from 'react-uuid'

const ChatBox = () => {
	const { auth }: any = useAuthContext()
	const { chatDetails, onlineBuddies } = useContext<any>(ActiveRoomsContext)

	const axiosPrivate = useAxiosPrivate()
	const [messages, setMessages] = useState<any>([])
	const [messageText, setMessageText] = useState<string>('')
	const { socket }: any = useSocketContext()

	const messageRef = useRef<any>('')
	const latestMessageRef = useRef<any>(null)

	/* Send a chat message */
	const handleSendMessage = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()

		/* Emit */
		if (socket && messageText.length > 0) {
			socket.emit('private-message-sent', {
				message: messageText,
				room: chatDetails.activeRoom,
				sender: auth.user._id
			})

			// Save the message to the Message collection

			try {
				await axiosPrivate.post('/messages', {
					message: messageText,
					room: chatDetails.activeRoom,
					sender: auth.user._id
				})
			} catch (error) {
				console.log(error)
			}
		}
		setMessageText('')
	}

	/* Update the message window when a chat message is sent or received. */
	useEffect(() => {
		if (socket) {
			socket.on('private-message', async ({ message, room, senderName }: any) => {
				// update the messages state
				setMessages([...messages, { message, room, name: senderName }])
			})
		}
	}, [socket, messages, setMessages])

	/* Fetch the room's message history */
	useEffect(() => {
		let isMounted = true
		const controller = new AbortController()
		const getMessages = async () => {
			try {
				await axiosPrivate
					.get(`/messages/${chatDetails.activeRoom}`, {
						signal: controller.signal
					})
					.then(response => {
						isMounted && setMessages(response.data)
					})
					.catch(err => {
						if (err.name === 'CanceledError') {
							console.log('CanceledError in messages.')
						}
					})
			} catch (err: any) {
				console.log('Refresh Token expired in messages.')
			}
		}
		getMessages()

		return () => {
			isMounted = false
			controller.abort()
		}
	}, [axiosPrivate, chatDetails.activeRoom])

	/* scroll to the latest message (bottom) */
	useEffect(() => {
		latestMessageRef?.current.scrollIntoView()
	}, [messages])

	/* focus the message input */
	useEffect(() => {
		messageRef.current.focus()
	}, [])

	return (
		<div className="relative flex flex-col h-full">
			{/* header */}
			<div className=" flex bg-violet-100 p-2 gap-2 shadow-lg">
				{/* avatar */}
				<div className="relative">
					<img
						src={`./${chatDetails?.avatar}`}
						alt={chatDetails?.name}
						className={`w-10 h-10 p-1 rounded-full object-cover
							${onlineBuddies.includes(chatDetails.buddyId) ? 'ring-2 ring-green-600' : ''}
						`}
					/>
					<span
						className={
							onlineBuddies.includes(chatDetails.buddyId)
								? 'bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-600 border-2 border-white-500 dark:border-gray-800 rounded-full'
								: ''
						}
					></span>
				</div>
				<div>
					{/* heading text */}
					<p className="text-lg font-bold text-gray-900">{chatDetails?.name}</p>
					<p className="text-xs text-gray-500">{chatDetails?.email}</p>
				</div>
			</div>
			{/* chat messages */}
			<section className="h-5/6">
				<div className="px-2 h-[70vh] w-full bg-white overflow-y-auto">
					{messages.length > 0 &&
						messages.map((message: any, id: number) => (
							<article
								key={uuid()}
								className={`flex
									${message.name === auth.user.name ? 'text-right justify-end' : 'text-left justify-start'}
									`}
							>
								<div
									className={`min-w-[10%] max-w-[40%] break-words rounded-2xl my-1 px-2 
										${message.name === auth.user.name ? 'py-4 text-right bg-violet-200' : 'py-4 text-left bg-gray-100'}
										`}
								>
									<div className="px-2 py-1 font-bold">
										{message.name === auth.user.name ? 'You' : message.name}
									</div>
									<div className="px-2 py-1">{message.message}</div>
								</div>
							</article>
						))}
					{/* show the latest message */}
					<div ref={latestMessageRef} />
				</div>
			</section>
			{/* chat text input */}
			<div className="flex absolute bottom-0 justify-between p-2 w-full bg-gray-100">
				<div className="flex justify-between items-center px-1 lg:px-4 w-1/6">
					{/* smiley */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
						/>
					</svg>
					{/* upload photo svg */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
						/>
					</svg>
					{/* upload svg */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
						/>
					</svg>
				</div>
				<form className="flex w-full">
					{/* Chat message text input */}
					<input
						type="text"
						id="message"
						name="message"
						value={messageText}
						ref={messageRef}
						onChange={e => setMessageText(e.target.value)}
						className="bg-white border focus:outline-0 rounded-tl-full rounded-bl-full p-2 block w-5/6"
					/>
					{/* Send message button */}
					<button
						disabled={messageText.length ? false : true}
						type="submit"
						onClick={handleSendMessage}
						className={`rounded-tr-full rounded-br-full font-bold 
							${
								messageText.length
									? 'bg-violet-500 hover:bg-violet-600 text-white block w-1/6'
									: 'bg-gray-400 text-gray-700 block w-1/6 cursor-not-allowed'
							}`}
					>
						Send
					</button>
				</form>
			</div>
		</div>
	)
}

export default ChatBox
