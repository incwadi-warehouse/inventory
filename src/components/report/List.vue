<template>
  <article>
    <b-list
      v-for="report in $store.state.report.reports"
      :key="report.id"
      @click-title.prevent="showReport(report)"
    >
      <template #title>
        {{ report.name }}
      </template>
      <template #options>
        <b-dropdown>
          <template #selector>
            <b-icon type="more" />
          </template>
          <b-dropdown-item
            :title="$t('delete')"
            icon="bin"
            @click.prevent="deleteReport(report.id)"
          />
        </b-dropdown>
      </template>
    </b-list>
  </article>
</template>

<script>
export default {
  name: 'list',
  methods: {
    showReport: function (report) {
      this.$store.commit('search/searchTerm', report.searchTerm)
      this.$store.commit('search/limit', report.limitTo)
      this.$store.commit('search/sold', report.sold ? 1 : 0)
      this.$store.commit('search/removed', report.removed ? 1 : 0)
      this.$store.commit('search/added', report.olderThenXMonths)
      this.$store.commit(
        'search/branch',
        report.branches ? report.branches.split(',') : null
      )
      this.$store.commit(
        'search/genre',
        report.genres ? report.genres.split(',') : null
      )
      this.$store.commit('search/lending', report.lendMoreThenXMonths)
      this.$store.commit('search/orderBy', report.orderBy)
      this.$store.commit('search/releaseYear', report.releaseYear)
      this.$store.commit('search/type', report.type)

      this.$store.dispatch('search/search')
      this.$store.commit('search/tab', false)
    },
    deleteReport: function (id) {
      this.$store.dispatch('report/remove', id)
    },
  },
  created: function () {
    this.$store.dispatch('report/reports')
  },
}
</script>
