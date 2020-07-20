<template>
  <b-form @submit.prevent="update" v-if="branch">
    <b-form-group>
      <b-form-item>
        <b-form-label for="name">{{ $t('name_of_branch') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input type="text" id="name" v-model="name" />
      </b-form-item>
    </b-form-group>
    <b-form-group buttons v-if="me && me.isAdmin">
      <b-form-group>
        <b-form-item>
          <b-button>{{ $t('save') }}</b-button>
        </b-form-item>
      </b-form-group>
    </b-form-group>
  </b-form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'edit',
  props: {
    branch: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: this.branch.name,
    }
  },
  computed: {
    ...mapState('user', ['me']),
  },
  methods: {
    update: function () {
      if (!this.me || !this.me.isAdmin) return
      this.$store.dispatch('branch/update', {
        id: this.branch.id,
        name: this.name,
      })
    },
  },
  created: function () {
    if (!this.$store.state.user.me) this.$store.dispatch('user/me')
  },
}
</script>
