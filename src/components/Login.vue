<template>
  <section class="section section_fixed">
    <form class="form" @submit.prevent="save">
      <div class="form_group">
        <div class="form_item">
          <label for="user">{{ $t('user') }}</label>
        </div>
        <div class="form_item">
          <input type="text" id="user" class="form_input" :placeholder="$t('user')" v-model="user"/>
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
          <button class="btn btn_branded" @click.prevent="login">{{ $t('login') }}</button>
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
  methods: {
    login: function () {
      this.$store.dispatch('login', {
        user: this.user,
        password: this.pass
      })
    }
  }
}
</script>
