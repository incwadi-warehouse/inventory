<template>
  <b-form @submit.prevent="create">
    <b-form-group>
      <b-form-item>
        <b-form-label for="name">{{ $t('name') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input type="text" id="name" v-model="name" />
      </b-form-item>
    </b-form-group>

    <b-form-group buttons>
      <b-form-item>
        <b-button design="outline" v-if="!isProcessing">
          {{ $t('create') }}
        </b-button>
        <b-button design="outline" v-if="isProcessing">
          <b-spinner size="s" />
        </b-button>
      </b-form-item>
    </b-form-group>
  </b-form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'create-genre',
  data() {
    return {
      name: null,
    }
  },
  computed: {
    ...mapState('genre', ['isProcessing']),
  },
  methods: {
    create: function () {
      this.$store.dispatch('genre/create', this.name)
      this.name = null
    },
  },
}
</script>
