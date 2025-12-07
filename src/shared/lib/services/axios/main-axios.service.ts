import axios from 'axios'

export const mainAxios = axios.create({
	withCredentials: true,
})

/*
mainAxios.interceptors.request.use(() => {

})
 */
