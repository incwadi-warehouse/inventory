<template>
  <section class="section section_fixed" v-if="notices">
    <aside class="notice notice_green" v-for="notice in notices" :key="notice.id">
      <p class="notice_entry">
        {{ $t(notice.msg) }}
      </p>
    </aside>
  </section>
</template>

<script>
export default {
  name: 'notice',
  computed: {
    notices: function () {
      return this.$store.state.notice.notices
    }
  }
}
</script>
