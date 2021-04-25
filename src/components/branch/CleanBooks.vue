<template>
  <span v-if="me">
    <b-button design="outline_danger" @click="clean" v-if="me.isAdmin">
      {{ $t('clean_books') }}
    </b-button>
    <p v-else>{{ $t('admins_only') }}</p>
  </span>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'clean-books',
  props: {
    me: Object,
  },
  methods: {
    ...mapActions('book', ['clean']),
  },
}
</script>
