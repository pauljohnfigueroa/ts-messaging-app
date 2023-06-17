import { useContext, useEffect } from 'react'
import Navigation from '../../components/Navigation'
// import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import ChatBox from '../chatbox/ChatBox'

import ActiveRoomsContext from '../../contexts/activeRoomsContext'
import { useSocketContext } from '../../hooks/useSocketContext'

const Dashboard = () => {
	const { socket }: any = useSocketContext()
	const { chatBoxOpen } = useContext<any>(ActiveRoomsContext)

	useEffect(() => {
		if (socket) {
			socket.on('hello', (message: string) => {
				console.log(message)
			})
		}
	}, [socket])

	return (
		<div className="grid grid-cols-6 h-screen">
			{/* Sidebar */}
			<Sidebar />

			{/* Main */}
			<main className="col-span-6 md:col-span-4 h-screen w-full">
				<Navigation />
				{chatBoxOpen && <ChatBox />}
			</main>
		</div>
	)
}

export default Dashboard
