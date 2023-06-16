import Navigation from '../../components/Navigation'
// import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'

const Dashboard = () => {
	// const navigate = useNavigate()

	// const users = () => {
	// 	navigate('/users')
	// }

	return (
		<div className="grid grid-cols-6 h-screen">
			{/* Sidebar */}
			<Sidebar />

			{/* Main */}
			<main className="col-span-6 md:col-span-4 h-screen w-full">
				<div className="bg-violet-900">
					<Navigation />
				</div>
				<div className=" bg-gray-50 p-2 flex gap-2 shadow-md">
					<div className="relative">
						{/* Chat box Header */}
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
			</main>
		</div>
	)
}

export default Dashboard
