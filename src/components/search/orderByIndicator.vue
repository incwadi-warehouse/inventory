<template>
  <span v-if="orderBy === column + '_asc' || orderBy === column + '_desc'" v-html="icon"/>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'order-by-indicator',
  props: ['column'],
  computed: {
    ...mapState('filter', [
      'orderBy'
    ]),
    icon: function () {
      if (this.orderBy === this.column + '_asc') {
        return '&#9650;'
      }
      if (this.orderBy === this.column + '_desc') {
        return '&#9660;'
      }

      return undefined
    }
  }
}
</script>
