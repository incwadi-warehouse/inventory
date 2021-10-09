import request from './index'

export const list = function () {
  return request().get('/api/reservation/list')
}

export const show = function (id) {
  return request().get('/api/reservation/' + id)
}

export const create = function (data) {
  return request().post('/api/reservation/new', data)
}

export const update = function (id, data) {
  return request().put('/api/reservation/' + id, data)
}

export const remove = function (id) {
  return request().delete('/api/reservation/' + id)
}

export default { list, show, create, update, remove }
