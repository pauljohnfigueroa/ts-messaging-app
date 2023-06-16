import BuddyList from './BuddyList'
import RoomList from './RoomList'

const Sidebar = () => {
	return (
		<section className="col-span-6 md:col-span-2 bg-violet-700 w-full h-full">
			{/* Logo */}
			<h1 className="text-yellow-50 text-5xl font-bold px-2 py-4 tracking-wider">Tokativ</h1>
			{/* Tok Buddies */}
			<BuddyList />
			{/* Tok Rooms */}
			<RoomList />
		</section>
	)
}

export default Sidebar
