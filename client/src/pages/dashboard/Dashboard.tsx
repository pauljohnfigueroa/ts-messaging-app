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
			<section className="hidden md:block md:h-full md:w-full sm:col-span-6 md:col-span-2 bg-violet-700">
				{/* Logo */}
				<h1 className="text-yellow-50 text-5xl font-bold px-2 py-4 tracking-wider h-20">Tokativ</h1>
				<Sidebar />
			</section>
			{/* Main */}
			<main className="flex flex-col col-span-6 md:col-span-4 h-full w-full bg-violet-50">
				<Navigation />
				{chatBoxOpen && <ChatBox />}
			</main>
		</div>
	)
}

export default Dashboard
