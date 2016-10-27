import axios from 'axios'

const xhr = axios.create()
xhr.interceptors.request.use((config) => {
  const headers = config.headers
  if (headers) {
    headers.Authorization = 'Basic VEVTVF9XRUJTRVJWOkNvcGFydEA5ODc'
  }
  console.log('headers..', headers)
  return config
}, (error) => {
  return Promise.reject(error)
})

xhr.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.status === 401) {
    console.log('No access to API')
  }
  return Promise.reject(error)
})
export default xhr
