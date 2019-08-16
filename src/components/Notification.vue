<template>
  <section class="notifications" v-if="notifications">
    <aside class="notification notification_success" v-for="notification in notifications" :key="notification.id">
      <p class="notification_entry">
        {{ $t(notification.msg) }}
      </p>
    </aside>
  </section>
</template>

<script>
export default {
  name: 'notification',
  computed: {
    notifications: function () {
      return this.$store.state.notification.notifications
    }
  }
}
</script>
