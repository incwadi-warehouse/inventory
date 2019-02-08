<template>
  <section>
    <search/>
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
  }
}
</script>
