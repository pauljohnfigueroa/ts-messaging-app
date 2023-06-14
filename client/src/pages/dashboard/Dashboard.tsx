import Navigation from '../../components/Navigation'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
	const navigate = useNavigate()

	const users = () => {
		navigate('/users')
	}

	return (
		<div className="grid grid-cols-6 h-screen">
			<section className="col-span-6 md:col-span-2 bg-violet-700 w-full h-full">
				{/* Sidebar */}

				{/* Headings */}
				<h1 className="text-yellow-50 text-5xl font-bold px-2 py-4 tracking-wider">Tokativ</h1>
				<h3 className="text-yellow-300 text-2xl font-bold px-3 py-4 tracking-wider">Tok Buddies</h3>

				{/* Tok Budddy */}
				<div className="px-8 flex items-center gap-2">
					<div className="relative">
						<img
							alt="Eric Clapton"
							src="./assets/images/eric-claptop.jpg"
							className="w-10 h-10 p-1 rounded-full object-cover"
						/>
					</div>
					<div>
						<p className="text-md text-gray-100">Eric Clapton</p>
					</div>
				</div>

				{/* Tok Budddy */}
				<div className="px-8 flex items-center gap-2">
					<div className="relative">
						<img
							src="./assets/images/john-wick.jpg"
							alt="John Wick"
							className="w-10 h-10 p-1 rounded-full object-cover"
						/>
						<span className="bottom-4 right-12 absolute w-3 h-3 bg-green-500  dark:border-gray-800 rounded-full"></span>
					</div>
					<div>
						<p className="text-md text-gray-100">John Wick</p>
					</div>
				</div>

				{/* Tok Budddy */}
				<div className="px-8 flex items-center gap-2">
					<div className="relative">
						<img
							src="./assets/images/steve-lukather.jpg"
							alt="Steve Lukather"
							className="w-10 h-10 p-1 rounded-full object-cover"
						/>
					</div>
					<div>
						<p className="text-md text-gray-100">Steve Lukather</p>
					</div>
				</div>

				{/* Tok Budddy */}
				<div className="px-8 flex items-center gap-2">
					<div className="relative">
						<img
							src="./assets/images/joe-satriani.jpg"
							alt="Joe Satriani"
							className="w-10 h-10 p-1 rounded-full object-cover"
						/>
						<span className="bottom-4 right-12 absolute w-3 h-3 bg-green-500  dark:border-gray-800 rounded-full"></span>
					</div>
					<div>
						<p className="text-md text-gray-100">Joe Satriani</p>
					</div>
				</div>

				{/* Tok Budddy */}
				<div className="px-8 flex items-center gap-2">
					<div>
						<button type="button" className="button hover:cursor-pointer" onClick={users}>
							Users
						</button>
					</div>
				</div>
			</section>

			<main className="col-span-6 md:col-span-4 h-screen w-full">
				{/* Main */}
				<div className="bg-violet-900">
					<Navigation />
				</div>
				<div className=" bg-gray-50 p-2 flex gap-2 shadow-md">
					<div className="relative">
						{/* Chat Header */}
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
