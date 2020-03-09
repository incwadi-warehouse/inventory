<template>
  <div class="card_text" @dblclick="toggleEditGenre()" v-if="!editGenre">
    {{ genre.name }}
  </div>
  <div class="card_text" v-else>
    <form class="form form_inline" @submit.prevent="update()">
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
            v-focus
            v-model="name"
          />
        </div>
      </div>
    </form>
  </div>
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

<style>
.form_inline {
  margin: 0;
}
</style>
