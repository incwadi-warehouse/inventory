<template>
  <b-notification-bar>
    <b-notification
      :type="notification.state"
      hidable
      v-for="notification in notifications"
      :key="notification.id"
    >
      {{ $t(notification.msg) }}
      <b-button
        type="text"
        v-if="notification.undo"
        @click="undo(notification)"
      >
        {{ $t('undo') }}
      </b-button>
    </b-notification>
  </b-notification-bar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'notification',
  computed: {
    ...mapState('notification', ['notifications'])
  },
  methods: {
    undo: function(notification) {
      notification.undo()
    }
  }
}
</script>
