<template>
  <span @dblclick="toggleEditGenre" v-if="!editGenre">
    {{ genre.name }}
  </span>
  <b-form @submit.prevent="update" v-else>
    <b-form-group>
      <b-form-item>
        <b-form-label for="genre" class="visuallyHidden">
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
  props: ['genre'],
  data() {
    return {
      name: this.genre.name,
      editGenre: false
    }
  },
  methods: {
    update: function() {
      this.toggleEditGenre()
      this.$store.dispatch('genre/edit', {
        id: this.genre.id,
        name: this.name
      })
    },
    toggleEditGenre: function() {
      this.editGenre = !this.editGenre
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    }
  }
}
</script>
