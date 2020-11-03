<template>
  <b-form @submit.prevent="edit()">
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
</template>

<script>
export default {
  name: 'edit-author',
  props: {
    author: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      firstname: this.author.firstname,
      surname: this.author.surname,
    }
  },
  methods: {
    edit: function () {
      this.$store.dispatch('author/edit', {
        id: this.author.id,
        firstname: this.firstname,
        surname: this.surname,
      })
    },
  },
}
</script>
