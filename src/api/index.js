import axios from 'axios'

const axiosInstance = function () {
  return axios.create({
    baseURL: process.env.API,
    timeout: 50000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })
}

export default axiosInstance()
