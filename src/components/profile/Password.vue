<template>
  <section class="container container_m">
    <form class="form" @submit.prevent="save">
      <div class="form_group">
        <div class="form_item">
          <label for="password" class="form_label">{{ $t('password') }}</label>
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
      <div class="form_group">
        <div class="form_item">
          <button class="btn btn_primary floatRight" v-if="!isChangingPassword">
            {{ $t('save') }}
          </button>
          <button class="btn btn_outline floatRight" v-if="isChangingPassword">
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
  name: 'password',
  computed: {
    ...mapState('user', ['isChangingPassword']),
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
