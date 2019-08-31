<template>
  <section class="container container_s">
    <h1>{{ $t('login') }}</h1>
    <form class="form" @submit.prevent="login">
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
        <div class="form_item alignRight">
          <button
            class="btn btn_primary"
            @click.prevent="login"
            v-if="!isLoggingIn"
          >
            {{ $t('login') }}
          </button>
          <button class="btn btn_outline" v-if="isLoggingIn">
            <div class="spinner spinner-s"></div>
          </button>
        </div>
      </div>
    </form>
  </section>
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
