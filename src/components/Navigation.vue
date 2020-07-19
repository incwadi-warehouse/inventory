<template>
  <b-off-canvas
    :active="showOffCanvas"
    @close-menu="toggleOffCanvas(false)"
    @open-menu="toggleOffCanvas(true)"
  >
    <div v-if="isAuthenticated">
      <ul class="offcanvas_nav">
        <li class="offcanvas_item">
          <router-link :to="{ name: 'index' }" class="offcanvas_link">
            {{ $t('search') }}
          </router-link>
        </li>
        <li class="offcanvas_item">
          <router-link :to="{ name: 'genre' }" class="offcanvas_link">
            {{ $t('genres') }}
          </router-link>
        </li>
        <li class="offcanvas_item">
          <router-link :to="{ name: 'staff' }" class="offcanvas_link">
            {{ $t('staff_members') }}
          </router-link>
        </li>
        <li class="offcanvas_item">
          <router-link :to="{ name: 'stats' }" class="offcanvas_link">
            {{ $t('stats') }}
          </router-link>
        </li>
        <li class="offcanvas_item">
          <router-link :to="{ name: 'branch' }" class="offcanvas_link">
            {{ $t('branch') }}
          </router-link>
        </li>
      </ul>

      <b-divider />

      <ul class="offcanvas_nav">
        <li class="offcanvas_item">
          <router-link :to="{ name: 'about' }" class="offcanvas_link">
            {{ $t('about') }}
          </router-link>
        </li>
      </ul>

      <b-divider />

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
  </b-off-canvas>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'navigation',
  computed: {
    ...mapState('user', ['isAuthenticated']),
    ...mapState('app', ['showOffCanvas']),
  },
  methods: {
    ...mapMutations('app', {
      toggleOffCanvas: 'showOffCanvas',
    }),
    ...mapActions('user', ['logout']),
  },
}
</script>
