<template>
  <section>
    <section class="container container_m">
      <router-link :to="{ name: 'index' }">
        {{ $t('back_to_search') }}
      </router-link>
    </section>
    <section class="container container_m">
      <h1>{{ $t('add_book') }}</h1>
    </section>
    <create />
  </section>
</template>

<script>
import Create from '../components/book/Create'

export default {
  name: 'create-view',
  components: {
    Create
  }
}
</script>
