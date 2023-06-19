import axios from '../api/axios'

import { useAuthContext } from './useAuthContext'
import { AUTH_ACTION_TYPE } from '../contexts/authContext'

export const useRefreshToken = () => {
	const { dispatch }: any = useAuthContext()

	const refresh = async () => {
		const response = await axios.get('/refresh', {
			withCredentials: true
		})
		/* refresh the accessToken */
		dispatch({ type: AUTH_ACTION_TYPE.REFRESH, payload: response.data })

		return response.data.accessToken
	}
	return refresh
}
