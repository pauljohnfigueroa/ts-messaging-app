import { createContext, useReducer, ReactNode } from 'react'

const initState = { auth: null }

type ChildrenType = {
	children: ReactNode
}

const enum AUTH_ACTION_TYPE {
	LOGIN = 'user/login',
	REFRESH = 'user/refresh',
	LOGOUT = 'user/logout'
}

interface authState {
	state?: object | null
	auth?: object | null
}

type AuthReducerAction = {
	type: AUTH_ACTION_TYPE
	payload: typeof initState
}

const AuthContext = createContext({})

export const authReducer = (state: authState, action: AuthReducerAction): authState => {
	switch (action.type) {
		case 'user/login':
			return { ...state, auth: action.payload }
		case 'user/refresh':
			return { ...state, auth: { accessToken: action.payload } }
		case 'user/logout':
			return { state: null }
		default:
			return state
	}
}

export const AuthContextProvider = ({ children }: ChildrenType) => {
	const [state, dispatch] = useReducer(authReducer, initState)

	console.log('AuthContextProvider state:', state)
	const values = { ...state, dispatch }

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthContext
