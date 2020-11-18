<template>
  <thead>
    <tr>
      <th class="isSortable" @click="filter('title')">
        {{ $t('title') }} <indicator column="title" />
      </th>
      <th class="isSortable" @click="filter('author')">
        {{ $t('author') }} <indicator column="author" />
      </th>
      <th class="isSortable" @click="filter('genre')">
        {{ $t('genre') }} <indicator column="genre" />
      </th>
      <th
        class="isSortable"
        @click="filter('added')"
        v-if="sold == false && removed == false"
      >
        {{ $t('added') }} <indicator column="added" />
      </th>
      <th class="isSortable" @click="filter('soldOn')" v-if="sold == true">
        {{ $t('sold') }} <indicator column="soldOn" />
      </th>
      <th
        class="isSortable"
        @click="filter('removedOn')"
        v-if="removed == true"
      >
        {{ $t('removed') }} <indicator column="removedOn" />
      </th>
      <th class="isSortable" @click="filter('type')">
        {{ $t('type') }} <indicator column="type" />
      </th>
      <th
        class="isSortable"
        style="text-align: right"
        :title="$t('release_year')"
        @click="filter('releaseYear')"
      >
        {{ $t('year') }} <indicator column="releaseYear" />
      </th>
      <th class="isSortable" style="text-align: right" @click="filter('price')">
        <span v-if="branch">{{ branch.currency }}</span>
        <span v-else>{{ $t('price') }}</span>
        <indicator column="price" />
      </th>
      <th class="noprint"></th>
    </tr>
  </thead>
</template>

<script>
import Indicator from './orderByIndicator'
import { mapState } from 'vuex'

export default {
  name: 'books-head-search',
  components: {
    Indicator,
  },
  computed: {
    ...mapState('search', ['sold', 'removed']),
    ...mapState('branch', ['branch']),
  },
  methods: {
    filter(type) {
      this.$store.dispatch('search/setOrderBy', type)
    },
  },
  created() {
    this.$store.dispatch('branch/branch')
  },
}
</script>

<style>
.isSortable {
  cursor: pointer;
}
</style>
