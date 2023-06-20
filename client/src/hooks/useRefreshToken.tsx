import axios from '../api/axios'

import { useAuthContext } from './useAuthContext'
import { AUTH_ACTION_TYPE } from '../contexts/authContext'

export const useRefreshToken = () => {
	const { auth, dispatch }: any = useAuthContext()

	const refresh = async () => {
		const response = await axios.get('/refresh', {
			withCredentials: true
		})

		/* refresh the accessToken and also send the authenticated user credentials with it. */
		dispatch({
			type: AUTH_ACTION_TYPE.REFRESH,
			payload: { user: auth.user, accessToken: response.data.accessToken }
		})

		return response.data.accessToken
	}
	return refresh
}
