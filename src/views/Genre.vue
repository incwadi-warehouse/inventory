<template>
  <section>
    <list/>
    <edit/>
  </section>
</template>

<script>
import List from '../components/Genre'
import Edit from '../components/EditGenre'

export default {
  name: 'genre-view',
  components: {
    List,
    Edit
  }
}
</script>
