<template>
  <b-masthead>
    <b-masthead-item v-if="isAuthenticated">
      <span @click="showOffCanvas(true)">
        <b-icon type="menu" />
      </span>
    </b-masthead-item>

    <b-masthead-item grow center>
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
            d="M 0 0 L 0 200 L 50 170 L 100 140 L 150 170 L 200 200 L 200 0 L 0 0 z "
          />
          />
        </svg>
      </router-link>
    </b-masthead-item>

    <b-masthead-item v-if="isAuthenticated">
      <b-dropdown position="bottom">
        <template #selector>
          <span @click.prevent>
            <b-icon type="profile" />
          </span>
        </template>
        <b-dropdown-title v-if="me"
          >{{ $t('hello') }}, {{ me.username }}!</b-dropdown-title
        >
        <b-dropdown-divider />
        <b-dropdown-item :title="$t('settings')" @click.prevent="profile" />
        <b-dropdown-item :title="$t('logout')" @click.prevent="logout" />
      </b-dropdown>
    </b-masthead-item>
  </b-masthead>
</template>

<script>
import Logo from './Logo'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'heading',
  components: {
    Logo,
  },
  computed: {
    ...mapState('user', ['me', 'isAuthenticated']),
    hasLogo: function () {
      return process.env.LOGO === 'false' ? false : true
    },
  },
  methods: {
    ...mapMutations('app', ['showOffCanvas']),
    ...mapActions('user', ['logout']),
    profile: function () {
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
