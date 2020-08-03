export default {
  namespaced: true,
  state: {
    elements: { 1: { field: null, operator: null, value: null } },
    term: null,
    orderByField: '',
    orderByDirection: '',
    limit: 50,
    isLoading: false,
    fluid: false,
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
    fluid(state, fluid) {
      state.fluid = fluid
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
    getDirection(context, type) {
      const search = context.state
      if (
        search.orderByField === '' ||
        search.orderByField !== type ||
        search.orderByDirection === ''
      ) {
        return 'asc'
      }
      if (search.orderByDirection === 'asc') {
        return 'desc'
      }
      if (search.orderByDirection === 'desc') {
        return ''
      }
    },
    setOrderBy(context, type) {
      context.commit('orderByDirection', this.direction(type))
      context.commit('orderByField', type)
      context.dispatch('book/find', null, { root: true })
    },
    reset(context) {
      if (context.state.elements === {}) return
      context.commit('elements', {})
      context.commit('addElement')
    },
    toggleFluid(context) {
      context.commit('fluid', !context.state.fluid)
    },
  },
}
