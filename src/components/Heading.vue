<template>
  <b-masthead>
    <b-masthead-item type="start" v-if="isAuthenticated">
      <span @click="showOffCanvas(true)">
        <b-icon type="menu" />
      </span>
    </b-masthead-item>

    <b-masthead-item type="center">
      <router-link :to="{ name: 'search' }">
        <logo v-if="hasLogo" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 200 200"
          class="logo"
          v-else
        >
          <path
            d="M 27.435547 9.8710938 C 17.706307 9.8710935 9.8710935 17.706307 9.8710938 27.435547 L 9.8710938 172.56445 C 9.8710935 182.29369 17.706307 190.12891 27.435547 190.12891 L 172.56445 190.12891 C 182.29369 190.12891 190.12891 182.29369 190.12891 172.56445 L 190.12891 27.435547 C 190.12891 17.706307 182.29369 9.8710938 172.56445 9.8710938 L 27.435547 9.8710938 z M 55 40 L 145 40 L 145 160 L 100 124 L 55 160 L 55 40 z "
          />
        </svg>
      </router-link>
    </b-masthead-item>

    <b-masthead-item type="end" v-if="isAuthenticated">
      <b-dropdown position="bottom">
        <template #selector>
          <span @click.prevent>
            <b-icon type="profile" />
          </span>
        </template>
        <b-dropdown-item no-hover v-if="state.me">
          {{ $t('hello') }}, {{ state.me.username }}!
        </b-dropdown-item>
        <b-dropdown-divider />
        <b-dropdown-item @click.prevent="profile">
          {{ $t('settings') }}
        </b-dropdown-item>
        <b-dropdown-item @click.prevent="logout">
          {{ $t('logout') }}
        </b-dropdown-item>
      </b-dropdown>
    </b-masthead-item>
  </b-masthead>
</template>

<script>
import Logo from './Logo'
import useAuth from '@/composables/useAuth'
import { toRefs, watch } from '@vue/composition-api'
import { mapMutations } from 'vuex'

export default {
  name: 'heading',
  components: {
    Logo,
  },
  props: {
    isAuthenticated: Boolean,
  },
  setup(props, { emit }) {
    const { getUser, state, logout } = useAuth(emit)
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
    hasLogo: function () {
      return process.env.VUE_APP_LOGO === 'false' ? false : true
    },
  },
  methods: {
    ...mapMutations(['showOffCanvas']),
    profile() {
      this.$router.push({ name: 'profile' })
    },
  },
}
</script>

<style scoped>
.logo {
  fill: var(--color-primary-10);
}
</style>
