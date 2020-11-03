<template>
  <button class="scroll-to-top" @click.prevent="scrollToTop">
    {{ $t('scroll_to_top') }}
  </button>
</template>

<script>
export default {
  name: 'scroll-to-top-search',
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    },
  },
}
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 0;
  right: 0;
  border-radius: 25px;
  border: 0 hidden;
  background: var(--color-neutral-06);
  padding: 10px;
  margin: 20px;
  color: var(--color-neutral-00);
  font-size: 1.2rem;
}
</style>
