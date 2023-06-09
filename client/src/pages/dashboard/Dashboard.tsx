import { useContext } from 'react'
import Navigation from '../../components/Navigation'
import Sidebar from '../../components/Sidebar'
import ChatBox from '../chatbox/ChatBox'

import ActiveRoomsContext from '../../contexts/activeRoomsContext'
import { useAuthContext } from '../../hooks/useAuthContext'

const Dashboard = () => {
	const { auth }: any = useAuthContext()
	const { chatBoxOpen } = useContext<any>(ActiveRoomsContext)

	return (
		<div className="flex flex-col lg:grid lg:grid-cols-12 h-screen md:h-screen">
			<div className="flex flex-col col-span-12 lg:col-span-3">
				<section>
					{/* Logo */}
					<h1 className="h-20 text-yellow-50 text-5xl bg-violet-700 font-bold px-2 py-4 tracking-wider">
						Tokativ
					</h1>
					<div className="hidden lg:flex items-center justify-center bg-violet-700 px-8">
						<img
							src={auth.user.avatar}
							alt={auth.user.name}
							className="w-28 h-28 p-1 rounded-full object-cover"
						/>
					</div>
				</section>
				{/* Sidebar */}
				<section className="hidden md:block lg:h-full md:w-full bg-violet-700">
					<Sidebar />
				</section>
			</div>
			{/* Main */}
			<main className="flex flex-col col-span-12 lg:col-span-9 h-full">
				<Navigation />
				{chatBoxOpen && <ChatBox />}
				{/* Cards */}
			</main>
		</div>
	)
}

export default Dashboard
