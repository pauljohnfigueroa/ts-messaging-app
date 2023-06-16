import { useContext } from 'react'
import SocketContext from '../contexts/socketContext'

export const useSocketContext = () => {
	const context = useContext(SocketContext)

	if (!context) {
		throw Error('useSocketContext must be used inside the SocketContextProvider.')
	}

	return context
}
