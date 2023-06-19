import { useEffect, useContext } from 'react'
import { axiosPrivate } from '../api/axios'
import { useRefreshToken } from './useRefreshToken'
import AuthContext from '../contexts/authContext'

/* 
This hook add interceptors to the axiosPrivate 
For more information about Axios Interceptors 
see, https://axios-http.com/docs/interceptors 
*/
const useAxiosPrivate = () => {
	const { auth } = useContext<any>(AuthContext)
	const refresh = useRefreshToken()

	useEffect(() => {
		const requestIntercept = axiosPrivate.interceptors.request.use(
			config => {
				if (!config.headers['Authorization']) {
					config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
				}
				return config
			},
			error => Promise.reject(error)
		)

		const responseIntercept = axiosPrivate.interceptors.response.use(
			/* Any status code that lie within the 
			range of 2xx cause this function to trigger */
			response => response,

			/* Any status codes that falls outside the 
			range of 2xx cause this function to trigger */
			async error => {
				const prevRequest = error?.config
				if (error?.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true
					const newAccessToken = await refresh()
					prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
					return axiosPrivate(prevRequest)
				}
				return Promise.reject(error)
			}
		)
		/* clean up the interceptors */
		return () => {
			axiosPrivate.interceptors.request.eject(requestIntercept)
			axiosPrivate.interceptors.response.eject(responseIntercept)
		}
	}, [auth, refresh])

	return axiosPrivate
}

export default useAxiosPrivate
