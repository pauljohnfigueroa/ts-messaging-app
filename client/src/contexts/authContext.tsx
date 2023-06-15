import { createContext, useState, useReducer, ReactNode } from 'react'

type ChildrenType = {
	children: ReactNode
}

const AuthContext = createContext({})

export const authReducer = (state: any, action: any) => {
	switch (action.type) {
		case 'user/login':
			return { user: action.payload }
		case 'user/refresh':
			return { user: action.payload }
		case 'user/logout':
			return { user: null }
		default:
			return state
	}
}
export const AuthContextProvider = ({ children }: ChildrenType) => {
	// const [auth, setAuth] = useState({})
	const [state, dispatch] = useReducer(authReducer, { user: null })

	console.log('AuthContextProvider state:', state)

	//const values = { auth, setAuth }
	const values = { ...state, dispatch }

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthContext
