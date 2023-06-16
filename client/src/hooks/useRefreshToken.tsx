import axios from '../api/axios'

import { useAuthContext } from './useAuthContext'

const useRefreshToken = () => {
	const { dispatch }: any = useAuthContext()

	const refresh = async () => {
		const response = await axios.get('/refresh', {
			withCredentials: true
		})
		/* refresh the accessToken */
		dispatch({ type: 'user/refresh', payload: response.data })

		return response.data.accessToken
	}
	return refresh
}
export default useRefreshToken
