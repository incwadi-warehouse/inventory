import request from './index'

export const list = function () {
  return request().get('/api/inventory/')
}

export const show = function (id) {
  return request().get('/api/inventory/' + id)
}

export const create = function () {
  return request().post('/api/inventory/new')
}

export const edit = function (id, data) {
  return request().put('/api/inventory/' + id, data)
}

export const remove = function (id) {
  return request().delete('/api/inventory/' + id)
}
