import request from './index'

export const list = function () {
  return request().get('/api/bookmark/')
}

export const show = function (id) {
  return request().get('/api/bookmark/' + id)
}

export const create = function (data) {
  return request().post('/api/bookmark/new', data)
}

export const update = function (id, data) {
  return request().put('/api/bookmark/' + id, data)
}

export const remove = function (id) {
  return request().delete('/api/bookmark/' + id)
}

export default { list, show, create, update, remove }
