import { createContext, useReducer, ReactElement } from 'react'

const initState = {
	auth: {
		accessToken: undefined,
		user: {}
	}
}

export const enum AUTH_ACTION_TYPE {
	LOGIN,
	REFRESH,
	LOGOUT
}

type AuthReducerAction = {
	type: AUTH_ACTION_TYPE
	payload?: typeof initState
}

type authState = {
	state?: object | null
	auth?: object | null
}

const AuthContext = createContext({})

export const authReducer = (state: authState, action: AuthReducerAction): authState => {
	switch (action.type) {
		case AUTH_ACTION_TYPE.LOGIN:
			return { ...state, auth: action.payload }
		case AUTH_ACTION_TYPE.REFRESH:
			return { ...state, auth: action.payload }
		case AUTH_ACTION_TYPE.LOGOUT:
			return { state: null }
		default:
			return state
	}
}

type ChildrenType = {
	children?: ReactElement
}

export const AuthContextProvider = ({ children }: ChildrenType) => {
	const [state, dispatch] = useReducer(authReducer, initState)

	// console.log('AuthContextProvider state:', state)
	const values = { ...state, dispatch }

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthContext
