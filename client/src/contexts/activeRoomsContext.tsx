import { createContext, useReducer, ReactElement } from 'react'

const initState = {
	chatBoxOpen: false, // we might need to move this to its own Context
	chatDetails: {},
	onlineBuddies: []
}

const ActiveRoomsContext = createContext({})

export const enum ACTIVE_ROOMS_ACTION_TYPES {
	CHAT_BOX_OPEN,
	SET_CHAT_DETAILS,
	GO_ONLINE,
	GO_OFFLINE
}

type activeRoomsAction = {
	type: ACTIVE_ROOMS_ACTION_TYPES
	payload?: any
}

type ChatDetailType = {
	userId?: string
	name?: string
	email?: string
	avatar?: string
	activeRoom?: string
}

type activeRoomsState = {
	activeRooms?: object | null
	chatBoxOpen?: boolean
	chatDetails?: ChatDetailType
	onlineBuddies?: any | null
}

const activeRoomsReducer = (
	state: activeRoomsState,
	action: activeRoomsAction
): activeRoomsState => {
	switch (action.type) {
		case ACTIVE_ROOMS_ACTION_TYPES.CHAT_BOX_OPEN:
			return { ...state, chatBoxOpen: action.payload }
		case ACTIVE_ROOMS_ACTION_TYPES.SET_CHAT_DETAILS:
			return { ...state, chatDetails: action.payload }
		// Add newly loged in user in the array
		case ACTIVE_ROOMS_ACTION_TYPES.GO_ONLINE:
			return { ...state, onlineBuddies: [...state.onlineBuddies, action.payload] }
		// Remove offline user from the array
		case ACTIVE_ROOMS_ACTION_TYPES.GO_OFFLINE:
			return {
				...state,
				onlineBuddies: state.onlineBuddies.filter((id: any) => id !== action.payload)
			}

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
