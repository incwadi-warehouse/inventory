import axios from 'axios'

const axiosInstance = function () {
  return axios.create({
    baseURL: window.config.api + '/v1',
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
