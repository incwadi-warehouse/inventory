import request from './index'

export const list = function (data) {
  return request().get('/api/directory/', { params: data })
}

export default { list }
