import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000/' })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user')).token
    }`
  }

  return req
})

// export const logIn = () => API.get('/login')
export const logIn = (formData) => API.post('/login', formData)
export const signUp = (formData) => API.post('/signUp', formData)
export const getTasks = () => API.get('/task')
export const saveOnline = (data) => API.post('/task', data)
