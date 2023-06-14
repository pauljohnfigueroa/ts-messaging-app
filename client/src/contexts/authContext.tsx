import { createContext, useState, ReactNode } from 'react'

interface Props {
	children?: ReactNode
}

const AuthContext = createContext({})

export const AuthContextProvider = ({ children }: Props) => {
	const [auth, setAuth] = useState({})

	const values = { auth, setAuth }
	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthContext
