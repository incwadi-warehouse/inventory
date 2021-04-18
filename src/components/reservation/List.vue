<template>
  <div v-if="reservations">
    <div
      class="reservation"
      v-for="reservation in reservations"
      :key="reservation.id"
    >
      <reservation-show
        :reservation="reservation"
        @removed="$emit('removed')"
      />
    </div>
  </div>
</template>

<script>
import ReservationShow from './Show'

export default {
  name: 'list',
  props: {
    reservations: Array,
  },
  components: {
    ReservationShow,
  },
}
</script>

<style scoped>
.reservation {
  border-bottom: 1px solid var(--color-neutral-02);
}
</style>
