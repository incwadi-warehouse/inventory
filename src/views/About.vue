<template>
  <article>
    <b-container size="m">
      <h1>incwadi</h1>
    </b-container>
    <about />
  </article>
</template>

<script>
import About from '../components/about/About'

export default {
  name: 'about-view',
  components: {
    About,
  },
}
</script>
