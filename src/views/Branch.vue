<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('branch') }}</h1>
    </b-container>
    <b-container size="m">
      <h2>{{ $t('clean_up') }}</h2>
      <p>{{ $t('clean_up_desc') }}</p>
      <clean-books />
    </b-container>
  </article>
</template>

<script>
import CleanBooks from '../components/branch/CleanBooks'

export default {
  name: 'branch-view',
  components: {
    CleanBooks
  }
}
</script>
