<template>
  <article>
    <b-list
      v-for="savedsearch in $store.state.savedsearch.savedsearches"
      :key="savedsearch.id"
      @click-title.prevent="showSavedSearch(savedsearch)"
    >
      <template #title>
        {{ savedsearch.name }}
      </template>
      <template #options>
        <b-dropdown>
          <template #selector>
            <b-icon type="more" />
          </template>
          <b-dropdown-item
            icon="bin"
            @click.prevent="deleteSavedSearch(savedsearch.id)"
          >
            {{ $t('delete') }}
          </b-dropdown-item>
        </b-dropdown>
      </template>
    </b-list>
  </article>
</template>

<script>
export default {
  name: 'list-savedsearch',
  methods: {
    showSavedSearch: function (savedsearch) {
      this.$store.commit('search/elements', {})

      // Filter
      if (savedsearch.query.filter) {
        for (var filter in savedsearch.query.filter) {
          this.$store.dispatch('search/handleElement', {
            id: parseInt(filter) + 1,
            val: savedsearch.query.filter[filter],
          })
        }
      }

      // Term
      if (savedsearch.query.term) {
        this.$store.commit('search/term', savedsearch.query.term)
      }

      // OrderBy
      if (savedsearch.query.orderBy) {
        this.$store.commit(
          'search/orderByField',
          savedsearch.query.orderBy[0].field
        )
        this.$store.commit(
          'search/orderByDirection',
          savedsearch.query.orderBy[0].direction
        )
      }

      // Limit
      if (savedsearch.query.limit) {
        this.$store.commit('search/limit', savedsearch.query.limit)
      }

      this.$emit('find')
    },
    deleteSavedSearch: function (id) {
      this.$store.dispatch('savedsearch/remove', id)
    },
  },
  created: function () {
    this.$store.dispatch('savedsearch/savedsearches')
  },
}
</script>
