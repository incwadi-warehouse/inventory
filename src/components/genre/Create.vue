<template>
  <b-container size="m">
    <h2>{{ $t('new') }}</h2>
    <b-form @submit.prevent="create">
      <div class="form_group">
        <div class="form_item">
          <label for="name" class="form_label">{{ $t('name') }}</label>
        </div>
        <div class="form_item">
          <input type="text" id="name" class="form_input" v-model="name" />
        </div>
      </div>
      <div class="form_group">
        <div class="form_item" style="float: right;">
          <b-button
            design="outline"
            @click.prevent="create"
            v-if="!isProcessing"
          >
            {{ $t('create') }}
          </b-button>
          <b-button design="outline" v-if="isProcessing">
            <b-spinner size="s" />
          </b-button>
        </div>
      </div>
    </b-form>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'create-genre',
  computed: {
    name: {
      get: function() {
        return this.$store.state.genre.name
      },
      set: function(name) {
        this.$store.commit('genre/name', name)
      }
    },
    ...mapState('genre', ['isProcessing'])
  },
  methods: {
    ...mapActions('genre', ['create'])
  }
}
</script>
