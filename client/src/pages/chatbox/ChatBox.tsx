import {
	useState,
	useContext,
	useEffect,
	useRef,
	useCallback,
	MouseEvent,
	KeyboardEvent
} from 'react'

import EmojiPicker from 'emoji-picker-react'
import Dropzone from 'react-dropzone'
import axios from '../../api/axios'

import ActiveRoomsContext from '../../contexts/activeRoomsContext'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useSocketContext } from '../../hooks/useSocketContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import MessageHistory from '../../components/MessageHistory'

type privateMessagesType = {
	message: string
	room: string
	sender: string
	fileType: string
}

const ChatBox = () => {
	const { auth }: any = useAuthContext()
	const { chatDetails, onlineBuddies } = useContext<any>(ActiveRoomsContext)

	const axiosPrivate = useAxiosPrivate()
	const [messages, setMessages] = useState<privateMessagesType[]>([])
	const [messageText, setMessageText] = useState<string | undefined>('')
	const { socket }: any = useSocketContext()
	const [file, setFile]: any = useState(null)

	const messageRef = useRef<HTMLInputElement>(null)

	// called in useEffect()
	const getMessages = useCallback(async () => {
		let isMounted = true
		const controller = new AbortController()
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
		return () => {
			isMounted = false
			controller.abort()
		}
	}, [axiosPrivate, chatDetails.activeRoom])

	const changeHandler = (val: string) => {
		setMessageText(val)
	}

	/* Send a chat message */
	const handleSendMessage = async (
		event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
	) => {
		event.preventDefault()

		// get the message from ref
		//const message: string | undefined = messageRef?.current?.value

		// this will trigger a re-render of the ChatBox component
		// setMessageText(message)

		if (socket && messageText) {
			// Save the message to the Message database collection
			try {
				await axiosPrivate.post('/messages', {
					message: messageText,
					room: chatDetails.activeRoom,
					sender: auth.user._id,
					fileType: ''
				})
				/* Emit */
				socket.emit('private-message-sent', {
					message: messageText,
					room: chatDetails.activeRoom,
					sender: auth.user.name,
					fileType: ''
				})
			} catch (error) {
				console.log(error)
			}
		}
		// clear and refocus text box after sending
		if (messageRef.current) {
			setMessageText('')
			messageRef.current.value = ''
			messageRef?.current?.focus()
			// latestMessageRef?.current.scrollIntoView()
		}
	}

	/* File upload */
	const onDrop = (files: any) => {
		setFile(files[0])
		// latestMessageRef?.current.scrollIntoView()
	}

	const uploadFile = async () => {
		// upload file
		let formData = new FormData()
		formData.append('file', file)
		const uploadedFile = await axios.post('/upload', formData)

		// Save the file details to the Message collection
		try {
			await axiosPrivate.post('/messages', {
				message: `${uploadedFile.data.file.destination}/${uploadedFile.data.file.filename}`,
				room: chatDetails.activeRoom,
				sender: auth.user._id,
				fileType: uploadedFile.data.file.mimetype
			})
			/* Emit */
			socket.emit('private-message-sent', {
				message: `${uploadedFile.data.file.destination}/${uploadedFile.data.file.filename}`,
				room: chatDetails.activeRoom,
				sender: auth.user.name,
				fileType: uploadedFile.data.file.mimetype
			})
		} catch (error) {
			console.log(error)
		}
		setFile(null)
		// clear and refocus after sending
		if (messageRef.current) {
			messageRef?.current?.focus()
			// latestMessageRef?.current.scrollIntoView()
		}
	}

	// clear upload button
	const clearUpload = () => {
		setFile(null)
	}

	/* Update the message window when a chat message is sent or received. */
	useEffect(() => {
		if (socket) {
			socket.on(
				'private-message',
				async ({ message, room, sender, fileType }: privateMessagesType) => {
					// update the messages state
					setMessages([...messages, { message, room, sender, fileType }])
				}
			)
		}
	}, [socket, messages, setMessages])

	/* Fetch the room's message history */
	useEffect(() => {
		getMessages()
	}, [getMessages])

	/* scroll to the latest message (bottom) */
	useEffect(() => {
		// latestMessageRef.current.scrollIntoView()
	}, [messages])

	/* focus the message input */
	useEffect(() => {
		messageRef?.current?.focus()
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
								? 'bottom-0 left-7 absolute w-3.5 h-3.5 bg-green-600 border-2 border-white-500 dark:border-gray-800 rounded-full'
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
			<section className="h-5/6 relative">
				<MessageHistory messages={messages} />
			</section>
			{/* chat text input */}

			{/* Emoji Picker */}
			{/* <div className="mb-16 ml-2">
				<EmojiPicker />
			</div> */}

			<div className="flex absolute bottom-0 justify-between p-2 w-full h-16 bg-gray-100">
				<div className="flex gap-4 justify-end items-center px-1 lg:px-4 w-1/6">
					{/* Emoji */}
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
					<Dropzone onDrop={onDrop}>
						{({ getRootProps, getInputProps }) => (
							<section>
								<div {...getRootProps()}>
									<input {...getInputProps()} />
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 hover:cursor-pointer"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
										/>
									</svg>
								</div>
							</section>
						)}
					</Dropzone>
				</div>
				{file && (
					<>
						<div className="absolute bottom-[48px] left-2 drop-shadow-md bg-white border border-blue-100 rounded-lg p-4">
							<div className="absolute right-1 top-1 flex justify-center items-center p-2 rounded-full w-3 h-3 bg-violet-900 hover:bg-violet-700 hover:cursor-pointer">
								{/* close button */}
								<button
									type="button"
									onClick={clearUpload}
									className="text-sm text-yellow-500 font-bold"
								>
									x
								</button>
							</div>
							{/* Image preview */}
							<img
								className="overflow-hidden object-cover max-w-[100px] max-h-[100px]"
								src={URL.createObjectURL(file)}
								alt={file.name}
							/>
							<button
								className="button mt-2 text-center w-full bg-violet-600 hover:bg-violet-500 text-white"
								onClick={uploadFile}
							>
								Upload
							</button>
						</div>
					</>
				)}

				<form className="flex w-full">
					{/* Chat message text input */}
					<input
						disabled={file ? true : false}
						type="text"
						id="message"
						name="message"
						value={messageText}
						ref={messageRef}
						onChange={e => changeHandler(e.target.value)}
						className="bg-white border focus:outline-0 rounded-tl-full rounded-bl-full p-2 block w-5/6"
					/>

					{/* Send message button */}

					<button
						disabled={file ? true : false}
						type="submit"
						onClick={handleSendMessage}
						className={`rounded-tr-full rounded-br-full font-bold 
							${
								messageText
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
