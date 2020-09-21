<template>
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
          v-focus
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
          <b-spinner size="s" style="margin: auto" />
        </b-button>
      </b-form-item>
    </b-form-group>
  </b-form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'login-profile',
  data() {
    return {
      username: null,
      password: null,
    }
  },
  computed: {
    ...mapState('user', ['isLoggingIn']),
  },
  methods: {
    login: function () {
      this.$store.dispatch('user/login', {
        username: this.username,
        password: this.password,
      })
      this.username = null
      this.password = null
    },
  },
}
</script>
