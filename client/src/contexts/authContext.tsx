import { createContext, useReducer, ReactNode } from 'react'

type ChildrenType = {
	children: ReactNode
}

const AuthContext = createContext({})

export const authReducer = (state: any, action: any) => {
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
	// const [auth, setAuth] = useState({})
	const [state, dispatch] = useReducer(authReducer, { auth: null })

	console.log('AuthContextProvider state:', state)

	//const values = { auth, setAuth }
	const values = { ...state, dispatch }

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthContext
