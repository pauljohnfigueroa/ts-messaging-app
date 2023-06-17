import BuddyList from './BuddyList'
import RoomList from './RoomList'

const Sidebar = () => {
	return (
		<div>
			{/* Tok Buddies */}
			<BuddyList />
			{/* Tok Rooms */}
			<RoomList />
		</div>
	)
}

export default Sidebar
