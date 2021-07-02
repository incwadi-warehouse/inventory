import request from './index'

export const list = function () {
  return request().get('/api/format/')
}

export const show = function (id) {
  return request().get('/api/format/' + id)
}

export const create = function (data) {
  return request().post('/api/format/new', data)
}

export const edit = function (id, data) {
  return request().put('/api/format/' + id, data)
}

export const remove = function (id) {
  return request().delete('/api/format/' + id)
}
