import axios from '../api/axios'

// import AuthContext from '../contexts/authContext'
import { useAuthContext } from './useAuthContext'

const useRefreshToken = () => {
	// const { setAuth } = useContext<any>(AuthContext)
	const { dispatch }: any = useAuthContext()

	const refresh = async () => {
		const response = await axios.get('/refresh', {
			withCredentials: true
		})

		// setAuth((prev: any) => {
		// 	console.log(JSON.stringify(prev.accessToken))
		// 	console.log(response.data.accessToken)
		// 	return { ...prev, accessToken: response.data.accessToken }
		// })
		console.log('response.data', response.data)
		/* refresh the accessToken */
		dispatch({ type: 'user/refresh', payload: response.data })

		return response.data.accessToken
	}
	return refresh
}
export default useRefreshToken
