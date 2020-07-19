<template>
  <b-container size="s">
    <h1>{{ $t('login') }}</h1>
    <b-form @submit.prevent="login">
      <b-form-group>
        <b-form-item>
          <b-form-label for="username">{{ $t('username') }}</b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input
            type="text"
            id="username"
            :placeholder="$t('username')"
            v-model="username"
            autofocus
          />
        </b-form-item>
      </b-form-group>
      <b-form-group>
        <b-form-item>
          <b-form-label for="password">{{ $t('password') }}</b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input
            type="password"
            id="password"
            :placeholder="$t('password')"
            v-model="password"
          />
        </b-form-item>
      </b-form-group>
      <b-form-group buttons>
        <b-form-item>
          <b-button design="primary_wide" v-if="!isLoggingIn">
            {{ $t('login') }}
          </b-button>
          <b-button design="outline_wide" v-if="isLoggingIn">
            <b-spinner size="s" style="margin: auto;" />
          </b-button>
        </b-form-item>
      </b-form-group>
    </b-form>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'login',
  computed: {
    ...mapState('user', ['isLoggingIn']),
    username: {
      get: function () {
        return this.$store.state.user.username
      },
      set: function (username) {
        this.$store.commit('user/username', username)
      },
    },
    password: {
      get: function () {
        return this.$store.state.user.password
      },
      set: function (password) {
        this.$store.commit('user/password', password)
      },
    },
  },
  methods: {
    ...mapActions('user', ['login']),
  },
  mounted: function () {
    document.getElementById('username').focus()
  },
}
</script>
