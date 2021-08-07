<template>
  <thead>
    <tr>
      <th v-if="covers"></th>
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
      <th>{{ $t('format') }}</th>
      <th
        class="isSortable"
        style="text-align: right"
        :title="$t('release_year')"
        @click="filter('releaseYear')"
      >
        {{ $t('year') }} <indicator column="releaseYear" />
      </th>
      <th class="isSortable" style="text-align: right" @click="filter('price')">
        <span v-if="me">{{ me.branch.currency }}</span>
        <span v-else>{{ $t('price') }}</span>
        <indicator column="price" />
      </th>
      <th class="noprint" width="25"></th>
      <th class="noprint" width="90" v-if="inventoryMode"></th>
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
  props: {
    me: Object,
    covers: {
      type: Boolean,
      default: false,
    },
    inventoryMode: Boolean,
  },
  computed: {
    ...mapState('search', ['sold', 'removed']),
  },
  methods: {
    filter(type) {
      this.$store.dispatch('search/setOrderBy', { type, me: this.me })
    },
  },
}
</script>

<style>
.isSortable {
  cursor: pointer;
}
</style>

<style scoped>
thead {
  position: sticky;
  top: var(--masthead-height);
  background: var(--color-neutral-00);
  z-index: 2;
}
th:first-child {
  min-width: 200px;
}
</style>
