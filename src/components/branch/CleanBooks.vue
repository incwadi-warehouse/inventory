<template>
  <span v-if="me">
    <b-button design="outline_danger" @click="clean" v-if="me.isAdmin">
      {{ $t('clean_books') }}
    </b-button>
    <p v-else>{{ $t('admins_only') }}</p>
  </span>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'clean-books',
  computed: {
    ...mapState('user', ['me']),
  },
  methods: {
    ...mapActions('book', ['clean']),
  },
  created: function () {
    if (!this.$store.state.user.me) this.$store.dispatch('user/me')
  },
}
</script>
