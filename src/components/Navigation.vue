<template>
  <ul class="hamburger">
    <li class="hamburger_item">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25.000001 25.000001">
        <path d="M2 2h21v4H2zm0 16h21v4H2zm0-8h21v4H2z" fill="#333"/>
      </svg>
      <div class="hamburger_secondary">
        <ul class="hamburger_box">
          <li class="hamburger_secondary_item">{{ $t('menu') }}</li>
          <li class="hamburger_secondary_item">
            <router-link :to="{ name: 'book' }">
              {{ $t('search') }}
            </router-link>
          </li>
          <li class="hamburger_secondary_item">
            <router-link :to="{ name: 'genre' }">
              {{ $t('genres') }}
            </router-link>
          </li>
          <li class="hamburger_secondary_item"><router-link :to="{ name: 'customer' }">
              {{ $t('customers') }}
            </router-link>
          </li>
          <li class="hamburger_secondary_item"><router-link :to="{ name: 'about' }">
              {{ $t('about') }}
            </router-link>
          </li>
        </ul>
        <ul class="hamburger_box">
          <li class="hamburger_secondary_item">{{ $t('profile') }}</li>
          <li class="hamburger_secondary_item">
            <a href="/logout" @click.prevent="logout">{{ $t('logout') }}</a>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: 'navigation',
  computed: {
    isAuthenticated: function () {
      return this.$store.state.user.isAuthenticated
    }
  },
  methods: {
    logout: function () {
      this.$store.commit('user/isAuthenticated', false)
      Cookies.remove('token')
      this.$router.push({ name: 'book' })
    }
  }
}
</script>
