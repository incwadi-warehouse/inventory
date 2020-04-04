<template>
  <span @dblclick="toggleEditGenre" v-if="!editGenre">
    {{ genre.name }}
  </span>
  <b-form @submit.prevent="update" v-else>
    <div class="form_group">
      <div class="form_item">
        <label for="genre" class="form_label visuallyHidden">
          {{ $t('genre') }}
        </label>
      </div>
      <div class="form_item">
        <input
          type="text"
          id="genre"
          class="form_input"
          v-model="name"
          v-focus
        />
      </div>
    </div>
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
