import { useContext } from 'react'
import ActiveRoomsContext from '../../contexts/activeRoomsContext'

const ChatBox = () => {
	const { chatDetails } = useContext<any>(ActiveRoomsContext)

	return (
		<div className=" bg-gray-50 p-2 flex gap-2 shadow-md">
			<div className="relative">
				<img
					src={`./${chatDetails?.avatar}`}
					alt={chatDetails?.name}
					className="w-10 h-10 p-1 rounded-full ring-2 ring-green-600 object-cover"
				/>
				<span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-600 border-2 border-white-500 dark:border-gray-800 rounded-full"></span>
			</div>
			<div>
				<p className="text-lg font-bold text-gray-900">{chatDetails?.name}</p>
				<p className="text-xs text-gray-500">{chatDetails?.email}</p>
			</div>
		</div>
	)
}

export default ChatBox
