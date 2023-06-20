import { createContext, useReducer, ReactElement } from 'react'

const initState = {
	socket: null
}

export const enum SOCKET_ACTION_TYPE {
	CONNECT,
	DISCONNECT
}

type SocketReducerAction = {
	type: SOCKET_ACTION_TYPE
	payload: typeof initState
}

type socketState = {
	state?: object | null
	socket?: object | null
}

const SocketContext = createContext({})

export const socketReducer = (state: socketState, action: SocketReducerAction): socketState => {
	switch (action.type) {
		case SOCKET_ACTION_TYPE.CONNECT:
			return { ...state, socket: action.payload }
		case SOCKET_ACTION_TYPE.DISCONNECT:
			return { ...state, socket: null }
		default:
			return state
	}
}

type ChildrenType = {
	children?: ReactElement
}

export const SocketContextProvider = ({ children }: ChildrenType) => {
	const [state, dispatch] = useReducer(socketReducer, initState)

	// console.log('SocketContextProvider state:', state)
	const values = { ...state, dispatch }

	return <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
}

export default SocketContext
