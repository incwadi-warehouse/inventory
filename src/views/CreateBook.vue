<template>
  <article>
    <b-container size="m">
      <router-link :to="{ name: 'index' }">
        {{ $t('back_to_search') }}
      </router-link>
    </b-container>
    <b-container size="m">
      <h1>{{ $t('add_book') }}</h1>
    </b-container>
    <create />
  </article>
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
