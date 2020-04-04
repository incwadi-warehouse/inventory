<template>
  <span>
    <b-button type="outline_danger" @click="clean" v-if="isAdmin">
      {{ $t('clean_books') }}
    </b-button>
    <p v-else>{{ $t('admins_only') }}</p>
  </span>
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
  }
}
</script>
