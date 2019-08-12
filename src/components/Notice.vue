<template>
  <section class="notifications" v-if="notices">
    <aside class="notification notification_success" v-for="notice in notices" :key="notice.id">
      <p class="notification_entry">
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

<style>
.notifications {
  max-width: 500px;
}
.notification {
  background: var(--color-background);
}
@media all and (min-width: 500px) {
  .notifications {
    margin-left: -250px;
  }
}
</style>
