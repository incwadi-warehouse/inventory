<template>
  <section>
    <search/>
    <section class="section section_default alignRight noprint">
      <button class="btn btn_secondary" @click="toggleFilter">{{ $t('filter') }}</button>
      <button class="btn btn_secondary" @click="toggleShowCreate">{{ $t('create') }}</button>
    </section>
    <transition name="fade">
      <filters/>
    </transition>
    <spinner/>
    <transition name="fade">
      <create class="noprint" v-if="showCreate"/>
    </transition>
    <list/>
  </section>
</template>

<script>
import Search from '../components/book/Search'
import Filters from '../components/book/Filters'
import List from '../components/book/List'
import Spinner from '../components/Spinner'
import Create from '../components/book/Create'

export default {
  name: 'index-view',
  components: {
    Search,
    Filters,
    List,
    Spinner,
    Create
  },
  computed: {
    showCreate: function () {
      return this.$store.state.showCreate
    }
  },
  methods: {
    toggleFilter: function () {
      this.$store.dispatch('toggleFilters')
    },
    toggleShowCreate: function () {
      this.$store.dispatch('toggleShowCreate')
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
