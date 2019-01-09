<template>
  <section>
    <search/>
    <section class="section section_default alignRight" v-if="searchTerm">
      <router-link :to="{name: 'create'}">Neuer Eintrag</router-link>
    </section>
    <list/>
  </section>
</template>

<script>
import Search from '../components/Search'
import List from '../components/List'

export default {
  name: 'index-view',
  components: {
    Search,
    List
  },
  computed: {
    searchTerm: function () {
      return this.$store.state.searchTerm
    }
  }
}
</script>
