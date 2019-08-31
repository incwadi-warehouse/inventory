<template>
  <section class="notifications" v-if="notifications">
    <aside
      :class="notification.class"
      v-for="notification in notifications"
      :key="notification.id"
    >
      <p class="notification_entry">
        {{ $t(notification.msg) }}
        <button
          class="btn btn_text"
          v-if="notification.undo"
          @click="undo(notification)"
        >
          {{ $t('undo') }}
        </button>
      </p>
    </aside>
  </section>
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
