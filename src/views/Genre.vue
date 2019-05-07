<template>
  <section>
    <list/>
    <edit/>
  </section>
</template>

<script>
import List from '../components/genre/Genre'
import Edit from '../components/genre/EditGenre'

export default {
  name: 'genre-view',
  components: {
    List,
    Edit
  }
}
</script>
