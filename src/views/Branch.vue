<template>
  <article>
    <div class="container container_m">
      <h1>{{ $t('branch') }}</h1>
    </div>
    <div class="container container_m">
      <h2>{{ $t('clean_up') }}</h2>
      <p>{{ $t('clean_up_desc') }}</p>
      <clean-books />
    </div>
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
