<template>
  <span
    v-if="orderByDirection === 'asc' || orderByDirection === 'desc'"
    v-html="icon"
  />
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'order-by-indicator-search',
  props: {
    column: String,
  },
  computed: {
    ...mapState('search', ['orderByDirection', 'orderByField']),
    icon() {
      if (this.column !== this.orderByField) return

      if (this.orderByDirection === 'asc') {
        return '&#9650;'
      }
      if (this.orderByDirection === 'desc') {
        return '&#9660;'
      }

      return undefined
    },
  },
}
</script>
