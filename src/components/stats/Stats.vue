<template>
  <ul>
    <li>
      <b>{{ stats.all }}</b> {{ $tc('all_books', stats.all) }}
    </li>
    <li>
      <b>{{ stats.available }}</b> {{ $tc('available_books', stats.available) }}
    </li>
    <li>
      <b>{{ stats.sold }}</b> {{ $tc('sold_books', stats.sold) }}
    </li>
    <li>
      <b>{{ stats.removed }}</b> {{ $tc('removed_books', stats.removed) }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'stats',
  props: {
    stats: {
      type: Object,
      required: true,
    },
  },
}
</script>
