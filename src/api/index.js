import axios from 'axios'

const axiosInstance = function () {
  return axios.create({
    baseURL: process.env.API,
    timeout: 50000,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: localStorage.getItem('user'),
      password: localStorage.getItem('pass')
    }
  })
}

export default axiosInstance()
