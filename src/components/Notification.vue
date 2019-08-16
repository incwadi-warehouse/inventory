<template>
  <section class="notifications" v-if="notifications">
    <aside :class="getClass(notification)" v-for="notification in notifications" :key="notification.id">
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
  },
  methods: {
    getClass: (notification) => {
      return {
        notification: true,
        notification_neutral: notification.state === 'neutral',
        notification_success: notification.state === 'success',
        notification_caution: notification.state === 'caution',
        notification_error: notification.state === 'error'
      }
    }
  }
}
</script>
