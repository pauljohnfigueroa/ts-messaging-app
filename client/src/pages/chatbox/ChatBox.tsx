const ChatBox = () => {
	return (
		<div className=" bg-gray-50 p-2 flex gap-2 shadow-md">
			<div className="relative">
				<img
					src="./assets/images/john-wick.jpg"
					alt="John Wick"
					className="w-10 h-10 p-1 rounded-full ring-2 ring-green-600 object-cover"
				/>
				<span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-600 border-2 border-white-500 dark:border-gray-800 rounded-full"></span>
			</div>
			<div>
				<p className="text-lg font-bold text-gray-900">John Wick</p>
				<p className="text-xs text-gray-500">john@gmail.com</p>
			</div>
		</div>
	)
}

export default ChatBox
