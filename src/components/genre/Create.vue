<template>
  <section class="container container_m">
    <h2>{{ $t('new') }}</h2>

    <form class="form" @submit.prevent="create">
      <div class="form_group">
        <div class="form_item">
          <label for="name" class="form_label">{{ $t('name') }}</label>
        </div>
        <div class="form_item">
          <input type="text" id="name" class="form_input" v-model="name">
        </div>
      </div>
      <div class="form_group">
        <div class="form_item alignRight">
          <button class="btn btn_outline" @click.prevent="create">
            {{ $t('create') }}
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'create-genre',
  computed: {
    name: {
      get: function () {
        return this.$store.state.genre.name
      },
      set: function (name) {
        this.$store.commit('genre/name', name)
      }
    }
  },
  methods: {
    create: function () {
      this.$store.dispatch('genre/createGenre', this.name)
    }
  }
}
</script>
