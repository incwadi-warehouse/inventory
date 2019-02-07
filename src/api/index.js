import axios from 'axios'

const axiosInstance = function () {
  return axios.create({
    baseURL: window.config.baseUrl,
    timeout: 50000,
    headers: {
      'Content-Type': 'application/json',
      'PHP_AUTH_USER': 'admin',
      'PHP_AUTH_PW': 'password'
    }
  })
}

export default axiosInstance()
