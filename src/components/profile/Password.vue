<template>
  <b-container size="m">
    <details>
      <summary>{{ $t('change_password') }}</summary>
      <b-form @submit.prevent="save">
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
            <b-button design="primary">
              {{ $t('save') }}
            </b-button>
          </b-form-item>
        </b-form-group>
      </b-form>
    </details>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'password',
  computed: {
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
    ...mapActions('user', {
      save: 'password'
    })
  }
}
</script>
