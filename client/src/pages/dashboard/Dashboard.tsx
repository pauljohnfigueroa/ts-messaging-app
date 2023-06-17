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
		<div className="md:grid md:grid-cols-6 h-screen">
			<div className="flex flex-col col-span-6 md:col-span-2">
				{/* Logo */}
				<h1 className=" md:h-20 text-yellow-50 text-5xl bg-violet-700 font-bold px-2 py-4 tracking-wider">
					Tokativ
				</h1>
				{/* Sidebar */}
				<section className="hidden md:block md:h-full md:w-full bg-violet-700">
					<Sidebar />
				</section>
			</div>
			{/* Main */}
			<main className="flex flex-col col-span-6 md:col-span-4 h-full">
				<Navigation />
				{chatBoxOpen && <ChatBox />}
			</main>
		</div>
	)
}

export default Dashboard
