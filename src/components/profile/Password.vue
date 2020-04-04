<template>
  <b-container size="m">
    <details>
      <summary>{{ $t('change_password') }}</summary>
      <b-form @submit.prevent="save">
        <div class="form_group">
          <div class="form_item">
            <label for="password" class="form_label">
              {{ $t('password') }}
            </label>
          </div>
          <div class="form_item">
            <input
              type="password"
              id="password"
              class="form_input"
              v-model="password"
            />
          </div>
        </div>
        <div class="form_group form_buttons">
          <div class="form_item">
            <b-button type="primary">
              {{ $t('save') }}
            </b-button>
          </div>
        </div>
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
