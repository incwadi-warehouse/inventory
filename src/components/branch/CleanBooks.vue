<template>
  <button
    class="btn btn_outline btn_outline_danger"
    @click="clean"
    v-if="isAdmin"
  >
    {{ $t('clean_books') }}
  </button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'clean-books',
  computed: {
    ...mapGetters('user', ['isAdmin'])
  },
  methods: {
    ...mapActions('book', ['clean'])
  },
  created: function() {
    this.$store.dispatch('user/me')
  }
}
</script>
