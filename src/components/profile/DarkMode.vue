<template>
  <section class="container container_m">
      <button class="btn btn_outline" @click="toggleDarkMode">{{ $t('dark_mode') }}</button>
    </section>
</template>

<script>
export default {
  name: 'dark-mode',
  methods: {
    toggleDarkMode: function () {
      if (document.documentElement.hasAttribute('dark')) {
        document.documentElement.removeAttribute('dark')
      } else {
        document.documentElement.setAttribute('dark', true)
      }
    }
  }
}
</script>
