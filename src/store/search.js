const flex = {
  1: { field: 'sold', operator: 'eq', value: '0' },
  2: { field: 'removed', operator: 'eq', value: '0' },
  3: { field: null, operator: null, value: null },
}
const classic = {
  1: { field: 'genre', operator: 'in', value: [] },
  2: {
    field: 'branch',
    operator: 'in',
    value: [],
  },
  6: { field: 'sold', operator: 'eq', value: false },
  7: { field: 'removed', operator: 'eq', value: false },
}

export default {
  namespaced: true,
  state: {
    elements: window.localStorage.getItem('classicFilters') ? classic : flex,
    term: null,
    orderByField: '',
    orderByDirection: '',
    limit: 50,
    isLoading: false,
    sold: false,
    removed: false,
  },
  mutations: {
    elements(state, elements) {
      state.elements = elements
    },
    addElement(state, data) {
      state.elements[data.id] = data.element
    },
    term(state, term) {
      state.term = term
    },
    orderByField(state, field) {
      state.orderByField = field
    },
    orderByDirection(state, direction) {
      state.orderByDirection = direction
    },
    limit(state, limit) {
      state.limit = limit
    },
    isLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    sold(state, sold) {
      state.sold = sold
    },
    removed(state, removed) {
      state.removed = removed
    },
  },
  actions: {
    addElement(context) {
      let elements = {}
      elements[Object.keys(context.state.elements).length + 1] = {
        field: null,
        operator: null,
        value: null,
      }

      context.commit(
        'elements',
        Object.assign({}, context.state.elements, elements)
      )
    },
    handleElement(context, data) {
      if (data.val.field === 'sold' && data.val.value) {
        context.commit('sold', true)
        context.commit('removed', false)
      }
      if (data.val.field === 'sold' && !data.val.value) {
        context.commit('sold', false)
      }
      if (data.val.field === 'removed' && data.val.value) {
        context.commit('removed', true)
        context.commit('sold', false)
      }
      if (data.val.field === 'removed' && !data.val.value) {
        context.commit('removed', false)
      }
      let element = {}
      element[data.id] = {
        field: data.val.field,
        operator: data.val.operator,
        value: data.val.value,
      }
      context.commit(
        'elements',
        Object.assign({}, context.state.elements, element)
      )
    },
    removeElement(context, id) {
      let element = {}
      element[id] = null
      context.commit(
        'elements',
        Object.assign({}, context.state.elements, element)
      )
    },
    orderByDirection(context, type) {
      if (
        context.state.orderByField === '' ||
        context.state.orderByField !== type ||
        context.state.orderByDirection === ''
      ) {
        return context.commit('orderByDirection', 'asc')
      }
      if (context.state.orderByDirection === 'asc') {
        return context.commit('orderByDirection', 'desc')
      }
      if (context.state.orderByDirection === 'desc') {
        return context.commit('orderByDirection', '')
      }
    },
    setOrderBy(context, type) {
      context.dispatch('orderByDirection', type)
      context.commit('orderByField', type)
      context.dispatch('book/find', null, { root: true })
    },
    reset(context) {
      if (context.state.elements === {}) return
      context.commit(
        'elements',
        Object.assign(
          {},
          window.localStorage.getItem('classicFilters') ? classic : flex
        )
      )
      if (!window.localStorage.getItem('classicFilters')) {
        context.dispatch('addElement')
      }
      context.commit('orderByField', '')
      context.commit('orderByDirection', '')
      context.commit('limit', 50)
      context.dispatch('genre/genres', null, { root: true })
    },
  },
}
