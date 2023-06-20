import axios from '../api/axios'

import { useAuthContext } from './useAuthContext'
import { AUTH_ACTION_TYPE } from '../contexts/authContext'

export const useRefreshToken = () => {
	const { auth, dispatch }: any = useAuthContext()

	const refresh = async () => {
		const response = await axios.get('/refresh', {
			withCredentials: true
		})
		const newAccessToken = response.data.accessToken
		/* refresh the accessToken and also send the authenticated user credentials with it. */
		dispatch({
			type: AUTH_ACTION_TYPE.REFRESH,
			payload: { user: auth.user, accessToken: newAccessToken }
		})
		return newAccessToken
	}

	return refresh
}
