<template>
  <div class="offcanvas">
    <div :class="{offcanvas_overlay: true, isActive: showOffCanvas}" @click="closeOffCanvas"></div>
    <div :class="{offcanvas_container: true, isActive: showOffCanvas}" v-if="isAuthenticated">
      <div class="offcanvas_header">
        <button class="btn btn_text" @click="closeOffCanvas">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50" class="icon">
          <path
            d="M44.987 9.643l-15.35 15.349 15.35 15.35-4.685 4.684-15.349-15.35-15.35 15.35-4.629-4.63 15.35-15.349-15.35-15.35L9.66 5.014l15.35 15.35 15.348-15.35z" />
        </svg>
        </button>
      </div>
      <ul class="offcanvas_nav">
        <li class="offcanvas_item">
          <router-link :to="{ name: 'index' }" class="offcanvas_link">
            {{ $t('search') }}
          </router-link>
        </li>
        <li class="offcanvas_item">
          <router-link :to="{ name: 'create-book' }" class="offcanvas_link">
            {{ $t('catalog') }}
          </router-link>
        </li>
        <li class="offcanvas_item">
          <router-link :to="{ name: 'genre' }" class="offcanvas_link">
            {{ $t('genres') }}
          </router-link>
        </li>
        <li class="offcanvas_item">
          <router-link :to="{ name: 'customer' }" class="offcanvas_link">
            {{ $t('customers') }}
          </router-link>
        </li>
        <li class="offcanvas_item">
          <router-link :to="{ name: 'stats' }" class="offcanvas_link">
            {{ $t('stats') }}
          </router-link>
        </li>
        <li class="offcanvas_item">
          <router-link :to="{ name: 'about' }" class="offcanvas_link">
            {{ $t('about') }}
          </router-link>
        </li>
      </ul>
      <hr>
      <ul class="offcanvas_nav">
        <li class="offcanvas_item">
          <router-link :to="{ name: 'profile' }" class="offcanvas_link">
            {{ $t('profile') }}
          </router-link>
        </li>
        <li class="offcanvas_item">
          <a href="/logout" @click.prevent="logout" class="offcanvas_link">
            {{ $t('logout') }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'navigation',
  computed: {
    ...mapState('user', [
      'isAuthenticated'
    ]),
    ...mapState('navigation', [
      'showOffCanvas'
    ])
  },
  methods: {
    logout: function () {
      this.$store.dispatch('user/logout')
    },
    closeOffCanvas: function () {
      this.$store.commit('navigation/showOffCanvas', false)
    }
  }
}
</script>
