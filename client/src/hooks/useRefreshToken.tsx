import { useContext } from 'react'
import axios from '../api/axios'

import AuthContext from '../contexts/authContext'

const useRefreshToken = () => {
	const { setAuth } = useContext<any>(AuthContext)

	const refresh = async () => {
		const response = await axios.get('/refresh', {
			withCredentials: true
		})

		setAuth((prev: any) => {
			console.log(JSON.stringify(prev.accessToken))
			console.log(response.data.accessToken)
			return { ...prev, accessToken: response.data.accessToken }
		})
		return response.data.accessToken
	}
	return refresh
}

export default useRefreshToken
