<template>
  <b-form @submit.prevent="update" v-if="branch">
    <!-- branch -->
    <b-form-group>
      <b-form-item>
        <b-form-label for="name">{{ $t('name_of_branch') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input type="text" id="name" v-model="name" />
      </b-form-item>
    </b-form-group>
    <!-- /branch -->

    <!-- steps -->
    <b-form-group>
      <b-form-item>
        <b-form-label for="steps">{{ $t('price_steps') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input
          type="number"
          id="steps"
          min="0.00"
          max="100.00"
          step="0.01"
          pattern="^\d+(\.|,)?\d{0,2}$"
          v-model="steps"
        />
      </b-form-item>
    </b-form-group>
    <!-- /steps -->

    <!-- currency -->
    <b-form-group>
      <b-form-item>
        <b-form-label for="currency">{{ $t('currency') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-select id="currency" v-model="currency">
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
        </b-form-select>
      </b-form-item>
    </b-form-group>
    <!-- /currency -->

    <b-form-group buttons v-if="me && me.isAdmin">
      <b-form-group>
        <b-form-item>
          <b-button design="outline">{{ $t('save') }}</b-button>
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
      steps: this.branch.steps,
      currency: this.branch.currency,
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
        steps: this.steps,
        currency: this.currency,
      })
    },
  },
  created: function () {
    if (!this.$store.state.user.me) this.$store.dispatch('user/me')
  },
}
</script>
