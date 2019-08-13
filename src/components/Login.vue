<template>
  <section class="container container_m">
    <h1>{{ $t('login') }}</h1>

    <aside class="notice notice_red" v-if="hasLoginError">
      <p class="notice_entry">{{ $t('wrong_credentials') }}</p>
    </aside>

    <form class="form" @submit.prevent="save">
      <div class="form_group">
        <div class="form_item">
          <label for="username">{{ $t('username') }}</label>
        </div>
        <div class="form_item">
          <input type="text" id="username" class="form_input" :placeholder="$t('username')" autofocus v-model="username"/>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="password">{{ $t('password') }}</label>
        </div>
        <div class="form_item">
          <input type="password" id="password" class="form_input" :placeholder="$t('password')" v-model="password"/>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item alignRight">
          <button class="btn btn_primary" @click.prevent="login" v-if="!isLoggingIn">{{ $t('login') }}</button>
          <button class="btn btn_outline" v-if="isLoggingIn">
            <div class="spinner spinner-s"></div>
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'login',
  computed: {
    hasLoginError: function () {
      return this.$store.state.user.hasLoginError
    },
    isLoggingIn: function () {
      return this.$store.state.user.isLoggingIn
    },
    username: {
      get: function () {
        return this.$store.state.user.username
      },
      set: function (username) {
        this.$store.commit('user/username', username)
      }
    },
    password: {
      get: function () {
        return this.$store.state.user.password
      },
      set: function (password) {
        this.$store.commit('user/password', password)
      }
    }
  },
  methods: {
    login: function () {
      this.$store.dispatch('user/login')
    }
  },
  mounted: function () {
    document.getElementById('username').focus()
  }
}
</script>
