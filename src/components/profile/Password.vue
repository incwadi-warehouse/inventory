<template>
  <details>
    <summary>{{ $t('change_password') }}</summary>

    <b-form @submit.prevent="update">
      <b-form-group>
        <b-form-item>
          <b-form-label for="password">
            {{ $t('password') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="password" id="password" v-model="password" />
        </b-form-item>
      </b-form-group>

      <b-form-group buttons>
        <b-form-item>
          <b-button design="primary">{{ $t('save') }}</b-button>
        </b-form-item>
      </b-form-group>
    </b-form>
  </details>
</template>

<script>
export default {
  name: 'password-profile',
  data() {
    return {
      password: null,
    }
  },
  methods: {
    update: function () {
      this.$store.dispatch('user/password', this.password)
      this.password = null
    },
  },
}
</script>
