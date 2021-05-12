<template>
  <details>
    <summary>{{ $t('changePassword') }}</summary>

    <b-form @submit.prevent="changePassword">
      <b-form-group>
        <b-form-item>
          <b-form-label for="password">
            {{ $t('password') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input
            type="password"
            id="password"
            v-model="state.password"
          />
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
import useAuth from '@/composables/useAuth'

export default {
  name: 'password-auth',
  setup() {
    const { state, changePassword } = useAuth()

    return {
      state,
      changePassword,
    }
  },
}
</script>
