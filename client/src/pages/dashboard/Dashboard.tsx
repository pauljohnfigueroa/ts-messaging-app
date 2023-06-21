import { useContext, useEffect } from 'react'
import Navigation from '../../components/Navigation'
// import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import ChatBox from '../chatbox/ChatBox'

import ActiveRoomsContext from '../../contexts/activeRoomsContext'
import { useSocketContext } from '../../hooks/useSocketContext'
import { useAuthContext } from '../../hooks/useAuthContext'

const Dashboard = () => {
	const { auth }: any = useAuthContext()
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
		<div className="flex flex-col md:grid md:grid-cols-12 h-screen sm:h-screen">
			<div className="flex flex-col col-span-12 md:col-span-3">
				<section>
					{/* Logo */}
					<h1 className="h-20 text-yellow-50 text-5xl bg-violet-700 font-bold px-2 py-4 tracking-wider">
						Tokativ
					</h1>
					<div className="hidden sm:flex items-center justify-center bg-violet-700 px-8">
						<img
							src={auth.user.avatar}
							alt={auth.user.name}
							className="w-28 h-28 p-1 rounded-full object-cover"
						/>
					</div>
				</section>
				{/* Sidebar */}
				<section className="hidden md:block md:h-full md:w-full bg-violet-700">
					<Sidebar />
				</section>
			</div>
			{/* Main */}
			<main className="flex flex-col col-span-12 md:col-span-9 h-full">
				<Navigation />
				{chatBoxOpen && <ChatBox />}
				{/* User cards */}
				<div className="grid grid-cols-12 m-4 gap-2">
					{/* User card */}
					<article className="col-span-12 md:col-span-4 bg-violet-200 rounded-2xl p-1">
						<div className="flex">
							<div className="flex flex-col min-w-[30%] justify-center items-center">
								<img
									src="./assets/images/eric-clapton.jpg"
									className="w-20 h-20 p-1 rounded-full object-cover"
								/>
								<p className="p-1 text-sm font-bold text-violet-700">Eric Clapton</p>
							</div>
							<div className="flex flex-col p-2">
								<div className="p-2">
									<p className="text-sm leading-3 font-bold text-violet-800">About</p>
									<div className="mt-2 mb-1 text-sm leading-5 text-violet-900">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									</div>
								</div>
								<div className="flex relative p-2">
									<div className="flex text-xs text-violet-900">London, England</div>
									<div className="flex justify-center items-center p-2 rounded-full w-10 h-10 bg-violet-900 hover:bg-violet-700 absolute right-0 bottom-0 hover:cursor-pointer">
										<span className="text-3xl text-yellow-500 font-bold">+</span>
									</div>
								</div>
							</div>
						</div>
					</article>

					{/* User card */}
					<article className="col-span-12 md:col-span-4 bg-violet-200 rounded-2xl p-1">
						<div className="flex">
							<div className="flex flex-col min-w-[30%] justify-center items-center">
								<img
									src="./assets/images/eric-clapton.jpg"
									className="w-20 h-20 p-1 rounded-full object-cover"
								/>
								<p className="p-1 text-sm font-bold text-violet-700">Eric Clapton</p>
							</div>
							<div className="flex flex-col p-2">
								<div className="p-2">
									<p className="text-sm leading-3 font-bold text-violet-800">About</p>
									<div className="mt-2 mb-1 text-sm leading-5 text-violet-900">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									</div>
								</div>
								<div className="flex relative p-2">
									<div className="flex text-xs text-violet-900">London, England</div>
									<div className="flex justify-center items-center p-2 rounded-full w-10 h-10 bg-violet-900 absolute right-0 bottom-0">
										<span className="text-3xl text-yellow-500 font-bold">+</span>
									</div>
								</div>
							</div>
						</div>
					</article>

					{/* User card */}
					<article className="col-span-12 md:col-span-4 bg-violet-200 rounded-2xl p-1">
						<div className="flex">
							<div className="flex flex-col min-w-[30%] justify-center items-center">
								<img
									src="./assets/images/eric-clapton.jpg"
									className="w-20 h-20 p-1 rounded-full object-cover"
								/>
								<p className="p-1 text-sm font-bold text-violet-700">Eric Clapton</p>
							</div>
							<div className="flex flex-col p-2">
								<div className="p-2">
									<p className="text-sm leading-3 font-bold text-violet-800">About</p>
									<div className="mt-2 mb-1 text-sm leading-5 text-violet-900">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									</div>
								</div>
								<div className="flex relative p-2">
									<div className="flex text-xs text-violet-900">London, England</div>
									<div className="flex justify-center items-center p-2 rounded-full w-10 h-10 bg-violet-900 absolute right-0 bottom-0">
										<span className="text-3xl text-yellow-500 font-bold">+</span>
									</div>
								</div>
							</div>
						</div>
					</article>

					{/* User card */}
					<article className="col-span-12 md:col-span-4 bg-violet-200 rounded-2xl p-1">
						<div className="flex">
							<div className="flex flex-col min-w-[30%] justify-center items-center">
								<img
									src="./assets/images/eric-clapton.jpg"
									className="w-20 h-20 p-1 rounded-full object-cover"
								/>
								<p className="p-1 text-sm font-bold text-violet-700">Eric Clapton</p>
							</div>
							<div className="flex flex-col p-2">
								<div className="p-2">
									<p className="text-sm leading-3 font-bold text-violet-800">About</p>
									<div className="mt-2 mb-1 text-sm leading-5 text-violet-900">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									</div>
								</div>
								<div className="flex relative p-2">
									<div className="flex text-xs text-violet-900">London, England</div>
									<div className="flex justify-center items-center p-2 rounded-full w-10 h-10 bg-violet-900 absolute right-0 bottom-0">
										<span className="text-3xl text-yellow-500 font-bold">+</span>
									</div>
								</div>
							</div>
						</div>
					</article>

					{/* User card */}
					<article className="col-span-12 md:col-span-4 bg-violet-200 rounded-2xl p-1">
						<div className="flex">
							<div className="flex flex-col min-w-[30%] justify-center items-center">
								<img
									src="./assets/images/eric-clapton.jpg"
									className="w-20 h-20 p-1 rounded-full object-cover"
								/>
								<p className="p-1 text-sm font-bold text-violet-700">Eric Clapton</p>
							</div>
							<div className="flex flex-col p-2">
								<div className="p-2">
									<p className="text-sm leading-3 font-bold text-violet-800">About</p>
									<div className="mt-2 mb-1 text-sm leading-5 text-violet-900">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									</div>
								</div>
								<div className="flex relative p-2">
									<div className="flex text-xs text-violet-900">London, England</div>
									<div className="flex justify-center items-center p-2 rounded-full w-10 h-10 bg-violet-900 absolute right-0 bottom-0">
										<span className="text-3xl text-yellow-500 font-bold">+</span>
									</div>
								</div>
							</div>
						</div>
					</article>
				</div>
			</main>
		</div>
	)
}

export default Dashboard
