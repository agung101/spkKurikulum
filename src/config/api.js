import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})
 
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token) {
    const decoded = jwtDecode(token)
    if (Date.now() <= decoded.exp* 1000)    
      config.headers = { Authorization: `Bearer ${token}` }
    else 
      return Promise.reject(new Error('Token expired'))
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export default api