<template>
  <section>
    <search/>
    <filters/>
    <spinner/>
    <list/>
  </section>
</template>

<script>
import Search from '../components/Search'
import Filters from '../components/Filters'
import List from '../components/List'
import Spinner from '../components/Spinner'

export default {
  name: 'index-view',
  components: {
    Search,
    Filters,
    List,
    Spinner
  }
}
</script>
