import { useContext } from 'react'
import ActiveRoomsContext from '../../contexts/activeRoomsContext'

const ChatBox = () => {
	const { chatDetails } = useContext<any>(ActiveRoomsContext)

	return (
		<div className="relative flex flex-col h-full">
			{/* header */}
			<div className=" bg-white p-2 flex gap-2 shadow-md">
				{/* avatar */}
				<div className="relative">
					<img
						src={`./${chatDetails?.avatar}`}
						alt={chatDetails?.name}
						className="w-10 h-10 p-1 rounded-full ring-2 ring-green-600 object-cover"
					/>
					<span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-600 border-2 border-white-500 dark:border-gray-800 rounded-full"></span>
				</div>
				<div>
					{/* heading text */}
					<p className="text-lg font-bold text-gray-900">{chatDetails?.name}</p>
					<p className="text-xs text-gray-500">{chatDetails?.email}</p>
				</div>
			</div>
			{/* chat messages */}
			<div className="h-5/6 w-full bg-violet-100 overflow-auto">
				<article className="text-left px-2 py-4">
					<span className="bg-green-300 px-2 py-4 rounded-2xl">Lorem ipsum dolor</span>
				</article>
				<article className="text-right px-2 py-4">
					<span className="bg-blue-300 px-2 py-4 rounded-2xl">Hello World</span>
				</article>
				<article className="text-left px-2 py-4">
					<span className="bg-green-300 px-2 py-4 rounded-2xl">Typescript is awesome.</span>
				</article>
				<article className="text-right px-2 py-4">
					<span className="bg-blue-300 px-2 py-4 rounded-2xl">Keep learning everyday!</span>
				</article>
			</div>
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
				<input
					type="text"
					className="bg-white border rounded-tl-full rounded-bl-full p-2 block w-4/6"
				/>
				<button type="button" className="rounded-tr-full rounded-br-full bg-violet-500 block w-1/6">
					Send
				</button>
			</div>
		</div>
	)
}

export default ChatBox
