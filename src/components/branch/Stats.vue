<template>
  <article>
    <div class="barchart">
      <div
        class="barchart_item"
        :style="{
          width: calcWidth(stats.available) + '%',
          background: 'var(--color-primary-10)',
        }"
        v-tooltip="
          stats.available + ' ' + $tc('available_books', stats.available)
        "
      />
      <div
        class="barchart_item"
        :style="{
          width: calcWidth(stats.reserved) + '%',
          background: 'var(--color-accent-yellow-10)',
        }"
        v-tooltip="stats.reserved + ' ' + $tc('reserved_books', stats.reserved)"
      />
      <div
        class="barchart_item"
        :style="{
          width: calcWidth(stats.sold) + '%',
          background: 'var(--color-accent-green-10)',
        }"
        v-tooltip="stats.sold + ' ' + $tc('sold_books', stats.sold)"
      />
      <div
        class="barchart_item"
        :style="{
          width: calcWidth(stats.removed) + '%',
          background: 'var(--color-accent-red-10)',
        }"
        v-tooltip="stats.removed + ' ' + $tc('removed_books', stats.removed)"
      />
    </div>

    <ul class="barchart_legend">
      <li class="barchart_legend_item">
        <b>{{ stats.available }}</b>
        {{ $tc('available_books', stats.available) }}
      </li>
      <li class="barchart_legend_item">
        <b>{{ stats.reserved }}</b> {{ $tc('reserved_books', stats.reserved) }}
      </li>
      <li class="barchart_legend_item">
        <b>{{ stats.sold }}</b> {{ $tc('sold_books', stats.sold) }}
      </li>
      <li class="barchart_legend_item">
        <b>{{ stats.removed }}</b> {{ $tc('removed_books', stats.removed) }}
      </li>
      <li class="barchart_legend_item" :style="{ float: 'right' }">
        <b>{{ stats.all }}</b> {{ $tc('all_books', stats.all) }}
      </li>
    </ul>
  </article>
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
  methods: {
    calcWidth(value) {
      return (value / this.stats.all) * 100
    },
  },
}
</script>

<style scoped>
.barchart {
  width: 100%;
  height: 15px;
}
.barchart_item {
  float: left;
  height: 15px;
}
.barchart_legend {
  list-style: none;
  padding: 0;
}
.barchart_legend_item {
  float: left;
  margin-right: 20px;
}
.barchart_legend_item:last-of-type {
  margin-right: 0;
  margin-left: 20px;
}
</style>
