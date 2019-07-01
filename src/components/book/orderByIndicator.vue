<template>
  <span v-if="sort === orderBy + '_asc' || sort === orderBy + '_desc'" v-html="icon"/>
</template>

<script>
export default {
  name: 'order-by-indicator',
  props: ['orderBy'],
  computed: {
    sort: function () {
      return this.$store.state.filter.sort
    },
    icon: function () {
      if (this.sort === this.orderBy + '_asc') {
        return '&#9650;'
      }
      if (this.sort === this.orderBy + '_desc') {
        return '&#9660;'
      }

      return undefined
    }
  }
}
</script>
