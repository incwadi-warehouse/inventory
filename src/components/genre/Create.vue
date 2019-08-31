<template>
  <section class="container container_m">
    <h2>{{ $t('new') }}</h2>
    <form class="form" @submit.prevent="create">
      <div class="form_group">
        <div class="form_item">
          <label for="name" class="form_label">{{ $t('name') }}</label>
        </div>
        <div class="form_item">
          <input type="text" id="name" class="form_input" v-model="name" />
        </div>
      </div>
      <div class="form_group">
        <div class="form_item alignRight">
          <button
            class="btn btn_outline"
            @click.prevent="create"
            v-if="!isProcessing"
          >
            {{ $t('create') }}
          </button>
          <button class="btn btn_outline" v-if="isProcessing">
            <div class="spinner spinner-s"></div>
          </button>
        </div>
      </div>
    </form>
  </section>
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
