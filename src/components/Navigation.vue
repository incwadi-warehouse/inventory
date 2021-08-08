<template>
  <b-off-canvas
    :active="showOffCanvas"
    @close-menu="toggleOffCanvas(false)"
    @open-menu="toggleOffCanvas(true)"
  >
    <div v-if="isAuthenticated">
      <ul class="offcanvas_nav">
        <li class="offcanvas_item">
          <router-link :to="{ name: 'search' }" class="offcanvas_link">
            {{ $t('search') }}
          </router-link>
        </li>
        <li class="offcanvas_item">
          <router-link :to="{ name: 'reservation' }" class="offcanvas_link">
            {{ $t('reservation') }}
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
          <router-link :to="{ name: 'genre' }" class="offcanvas_link">
            {{ $t('genres') }}
          </router-link>
        </li>
        <li class="offcanvas_item">
          <router-link :to="{ name: 'staff' }" class="offcanvas_link">
            {{ $t('staff_members') }}
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
        <li class="offcanvas_item" v-if="state.me">
          <router-link :to="{ name: 'profile' }" class="offcanvas_link">
            {{ state.me.username }}
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
import { mapState, mapMutations } from 'vuex'
import useAuth from '@/composables/useAuth'
import { toRefs, watch } from '@vue/composition-api'

export default {
  name: 'navigation',
  props: {
    isAuthenticated: Boolean,
  },
  setup(props, { emit }) {
    const { state, getUser, logout } = useAuth(emit)
    const { isAuthenticated } = toRefs(props)

    if (props.isAuthenticated) {
      getUser()
    }

    watch(isAuthenticated, () => {
      getUser()
    })

    return { state, logout }
  },
  computed: {
    ...mapState(['showOffCanvas']),
  },
  methods: {
    ...mapMutations({
      toggleOffCanvas: 'showOffCanvas',
    }),
  },
}
</script>
