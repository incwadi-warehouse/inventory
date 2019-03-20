<template>
  <section class="section section_fixed" v-if="isLoading">
    <div class="spinner spinner-l"></div>
  </section>
</template>

<script>
export default {
  name: 'spinner',
  computed: {
    isLoading: function () {
      return this.$store.state.isLoading
    }
  }
}
</script>
