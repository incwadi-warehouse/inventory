<template>
  <span @dblclick="toggleEdit" v-if="!edit">
    {{ genre.name }}
  </span>
  <b-form @submit.prevent="update" v-else>
    <b-form-group>
      <b-form-item>
        <b-form-label for="genre" hidden>
          {{ $t('genre') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input type="text" id="genre" v-model="name" v-focus />
      </b-form-item>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  name: 'edit-genre',
  props: {
    genre: Object,
  },
  data() {
    return {
      name: this.genre.name,
      edit: false,
    }
  },
  methods: {
    update: function () {
      this.toggleEdit()
      this.$store.dispatch('genre/edit', {
        id: this.genre.id,
        name: this.name,
      })
    },
    toggleEdit: function () {
      this.edit = !this.edit
    },
  },
}
</script>
