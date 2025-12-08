import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // WW backend
  withCredentials: true, // required if using Sanctum for auth
})

export default api
