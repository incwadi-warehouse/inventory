<template>
  <ul class="list">
    <li>
      <b>{{ stats.all }}</b> {{ $t('all_books') }}
    </li>
    <li>
      <b>{{ stats.available }}</b> {{ $t('available_books') }}
    </li>
    <li>
      <b>{{ stats.sold }}</b> {{ $t('sold_books') }}
    </li>
    <li>
      <b>{{ stats.removed }}</b> {{ $t('removed_books') }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'stats',
  props: {
    stats: {
      type: Object,
      required: true
    }
  }
}
</script>
