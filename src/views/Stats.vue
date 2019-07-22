<template>
  <section>
    <section class="section section_fixed">
      <h1>{{ $t('stats') }}</h1>
    </section>

    <stats/>
  </section>
</template>

<script>
import Stats from './../components/book/Stats'

export default {
  name: 'stats-view',
  components: {
    Stats
  }
}
</script>
