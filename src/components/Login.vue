<template>
  <section class="section section_fixed">
    <h1>{{ $t('login') }}</h1>

    <aside class="notice notice_red" v-if="hasLoginError">
      <p class="notice_entry">{{ $t('wrong_credentials') }}</p>
    </aside>

    <form class="form" @submit.prevent="save">
      <div class="form_group">
        <div class="form_item">
          <label for="user">{{ $t('user') }}</label>
        </div>
        <div class="form_item">
          <input type="text" id="user" class="form_input" :placeholder="$t('user')" autofocus v-model="user"/>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="pass">{{ $t('password') }}</label>
        </div>
        <div class="form_item">
          <input type="password" id="pass" class="form_input" :placeholder="$t('password')" v-model="pass"/>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item alignRight">
          <button class="btn btn_branded" @click.prevent="login" v-if="!isLoggingIn">{{ $t('login') }}</button>
          <button class="btn btn_secondary" v-if="isLoggingIn">
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
  data () {
    return {
      user: null,
      pass: null
    }
  },
  computed: {
    hasLoginError: function () {
      return this.$store.state.user.hasLoginError
    },
    isLoggingIn: function () {
      return this.$store.state.user.isLoggingIn
    }
  },
  methods: {
    login: function () {
      this.$store.dispatch('user/login', {
        user: this.user,
        password: this.pass
      })
    }
  },
  mounted: function () {
    document.getElementById('user').focus()
  }
}
</script>
