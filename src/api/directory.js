import request from './index'

export const list = function (data) {
  return request().get('/api/directory/', { params: data })
}

export const cover = function (id, url) {
  return request().post('/api/directory/cover/' + id, { url })
}

export default { list, cover }
