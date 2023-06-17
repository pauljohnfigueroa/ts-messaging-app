import { createContext, useReducer, ReactElement } from 'react'

const initState = {
	activeRooms: [],
	chatBoxOpen: false
}

const ActiveRoomsContext = createContext({})

export const enum ACTIVE_ROOMS_ACTION_TYPES {
	JOIN,
	LEAVE,
	CHAT_BOX_OPEN
}

type activeRoomsAction = {
	type: ACTIVE_ROOMS_ACTION_TYPES
	payload?: any
}

type activeRoomsState = {
	state?: object | null
	activeRooms?: object | null
	chatBoxOpen?: boolean
}

const activeRoomsReducer = (
	state: activeRoomsState,
	action: activeRoomsAction
): activeRoomsState => {
	switch (action.type) {
		case ACTIVE_ROOMS_ACTION_TYPES.JOIN:
			return { ...state, activeRooms: action.payload }
		case ACTIVE_ROOMS_ACTION_TYPES.LEAVE:
			return { ...state, activeRooms: action.payload }
		case ACTIVE_ROOMS_ACTION_TYPES.CHAT_BOX_OPEN:
			return { ...state, chatBoxOpen: action.payload }
		default:
			return state
	}
}

type ChildrenType = {
	children?: ReactElement
}

export const ActiveRoomsContextProvider = ({ children }: ChildrenType) => {
	const [state, dispatch] = useReducer(activeRoomsReducer, initState)

	console.log('ActiveRoomsContextProvider state:', state)
	const values = { ...state, dispatch }

	return <ActiveRoomsContext.Provider value={values}>{children}</ActiveRoomsContext.Provider>
}

export default ActiveRoomsContext
