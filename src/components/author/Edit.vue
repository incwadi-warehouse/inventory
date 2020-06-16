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
      <b-form-group buttons>
        <b-form-item>
          <b-button design="primary">
            {{ $t('save') }}
          </b-button>
        </b-form-item>
      </b-form-group>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: 'edit-author',
  props: {
    id: Number
  },
  data() {
    return {
      firstname: null,
      surname: null
    }
  },
  methods: {
    edit: function() {
      this.$store.dispatch('author/edit', {
        id: this.id,
        firstname: this.firstname,
        surname: this.surname
      })
    }
  },
  created: function() {
    this.$store.dispatch('author/show', this.id)
  },
  watch: {
    '$store.state.author.author': function() {
      this.firstname = this.$store.state.author.author.firstname
      this.surname = this.$store.state.author.author.surname
    }
  }
}
</script>
