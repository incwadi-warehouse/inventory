<template>
  <section>
    <search/>
    <filters/>
    <spinner/>
    <transition name="fade">
      <create class="noprint" v-if="showCreate"/>
    </transition>
    <list/>
  </section>
</template>

<script>
import Search from '../components/Search'
import Filters from '../components/Filters'
import List from '../components/List'
import Spinner from '../components/Spinner'
import Create from '../components/Create'

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
