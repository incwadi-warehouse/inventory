import axios from 'axios'

const axiosInstance = function () {
  return axios.create({
    baseURL: window.config.baseUrl,
    timeout: 50000,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export default axiosInstance()
