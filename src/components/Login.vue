<template>
  <b-container size="s">
    <h1>{{ $t('login') }}</h1>
    <b-form @submit.prevent="login">
      <div class="form_group">
        <div class="form_item">
          <label for="username">{{ $t('username') }}</label>
        </div>
        <div class="form_item">
          <input
            type="text"
            id="username"
            class="form_input"
            :placeholder="$t('username')"
            autofocus
            v-model="username"
          />
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="password">{{ $t('password') }}</label>
        </div>
        <div class="form_item">
          <input
            type="password"
            id="password"
            class="form_input"
            :placeholder="$t('password')"
            v-model="password"
          />
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <b-button type="primary_wide" v-if="!isLoggingIn">
            {{ $t('login') }}
          </b-button>
          <b-button type="outline_wide" v-if="isLoggingIn">
            <b-spinner size="s" style="margin:auto;" />
          </b-button>
        </div>
      </div>
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
      get: function() {
        return this.$store.state.user.username
      },
      set: function(username) {
        this.$store.commit('user/username', username)
      }
    },
    password: {
      get: function() {
        return this.$store.state.user.password
      },
      set: function(password) {
        this.$store.commit('user/password', password)
      }
    }
  },
  methods: {
    ...mapActions('user', ['login'])
  },
  mounted: function() {
    document.getElementById('username').focus()
  }
}
</script>
