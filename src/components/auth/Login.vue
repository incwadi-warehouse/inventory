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
          v-model="state.username"
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
          v-model="state.password"
        />
      </b-form-item>
    </b-form-group>

    <b-form-group buttons>
      <b-form-item>
        <b-button design="primary_wide" v-if="!state.isLoggingIn">
          {{ $t('login') }}
        </b-button>
        <b-button design="outline_wide" v-if="state.isLoggingIn">
          <b-spinner size="s" style="margin: auto" />
        </b-button>
      </b-form-item>
    </b-form-group>
  </b-form>
</template>

<script>
import useAuth from '@/composables/useAuth'

export default {
  name: 'login-auth',
  setup(props, { emit }) {
    const { state, login } = useAuth(emit)

    return { state, login }
  },
}
</script>
