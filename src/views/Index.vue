<template>
  <section>
    <search/>
    <filters/>
    <list/>
  </section>
</template>

<script>
import Search from '../components/Search'
import Filters from '../components/Filters'
import List from '../components/List'

export default {
  name: 'index-view',
  components: {
    Search,
    Filters,
    List
  }
}
</script>
