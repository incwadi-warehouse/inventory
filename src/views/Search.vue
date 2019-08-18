<template>
  <section>
    <search class="noprint"/>

    <section class="container container_m alignRight noprint">
      <button class="btn btn_outline" @click="setTab('filter')">{{ $t('filter') }}</button>
      <button class="btn btn_outline" @click="setTab('limit')">{{ $t('limit') }}</button>
      <button class="btn btn_outline" @click="setTab('create')">{{ $t('catalog') }}</button>
    </section>

    <filters class="noprint" v-if="tab === 'filter'"/>
    <limit class="noprint" v-if="tab === 'limit'"/>
    <create class="noprint" v-if="tab === 'create'"/>

    <section class="container container_m" v-if="isLoading">
      <div class="spinner spinner-l"></div>
    </section>

    <list/>
    <author-list/>
  </section>
</template>

<script>
import Search from '../components/search/Search'
import Filters from '../components/search/Filters'
import List from '../components/search/List'
import AuthorList from '../components/search/AuthorList'
import Create from '../components/book/Create'
import Limit from '../components/search/Limit'

export default {
  name: 'search-view',
  components: {
    Search,
    Filters,
    List,
    AuthorList,
    Create,
    Limit
  },
  computed: {
    showCreate: function () {
      return this.$store.state.showCreate
    },
    isLoading: function () {
      return this.$store.state.search.isLoading
    },
    tab: function () {
      return this.$store.state.search.tab
    }
  },
  methods: {
    setTab: function (tab) {
      if (tab === this.$store.state.search.tab) {
        this.$store.commit('search/tab', null)
        return
      }
      this.$store.commit('search/tab', tab)
    },
    tabsClass: function (active) {
      return {
        tabs_item: true,
        isActive: this.tab === active
      }
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}
.fade-enter,
.fade-leave-to  {
  opacity: 0;
}
</style>
