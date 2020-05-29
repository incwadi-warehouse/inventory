<template>
  <b-container size="m">
    <b-form @submit.prevent="edit(id)">
      <b-form-group>
        <b-form-item>
          <b-form-label for="firstname">
            {{ $t('firstname') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="text" id="firstname" v-model="firstname" />
        </b-form-item>
      </b-form-group>
      <b-form-group>
        <b-form-item>
          <b-form-label for="surname">{{ $t('surname') }}</b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="text" id="surname" v-model="surname" />
        </b-form-item>
      </b-form-group>
      <b-form-group>
        <b-form-item style="float: right;">
          <b-button design="primary" @click.prevent="edit(id)">
            {{ $t('save') }}
          </b-button>
        </b-form-item>
      </b-form-group>
    </b-form>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'edit-author',
  props: {
    id: Number
  },
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
