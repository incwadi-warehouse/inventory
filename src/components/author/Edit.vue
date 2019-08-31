<template>
  <section class="container container_m">
    <form class="form" @submit.prevent="edit(id)">
      <div class="form_group">
        <div class="form_item">
          <label for="firstname" class="form_label">{{
            $t('firstname')
          }}</label>
        </div>
        <div class="form_item">
          <input
            type="text"
            id="firstname"
            class="form_input"
            v-model="firstname"
          />
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="surname" class="form_label">{{ $t('surname') }}</label>
        </div>
        <div class="form_item">
          <input
            type="text"
            id="surname"
            class="form_input"
            v-model="surname"
          />
        </div>
      </div>
      <div class="form_group">
        <div class="form_item alignRight">
          <button class="btn btn_primary" @click.prevent="edit(id)">
            {{ $t('save') }}
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'edit-author',
  props: ['id'],
  computed: {
    firstname: {
      get: function() {
        return this.$store.state.author.firstname
      },
      set: function(firstname) {
        this.$store.commit('author/firstname', firstname)
      }
    },
    surname: {
      get: function() {
        return this.$store.state.author.surname
      },
      set: function(surname) {
        this.$store.commit('author/surname', surname)
      }
    }
  },
  methods: {
    ...mapActions('author', ['edit'])
  },
  created: function() {
    this.$store.dispatch('author/show', this.id)
  }
}
</script>
