<template>
  <section class="section section_default">
    <h1>Add Book</h1>
    <form class="form">
      <div class="form_group">
        <div class="form_item">
          <label for="genre" class="form_label">
            Genre
          </label>
        </div>
        <div class="form_item">
          <genres-select/>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="title" class="form_label">
            Title
          </label>
        </div>
        <div class="form_item">
          <input type="text" id="title" class="form_input" v-model="title">
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="author" class="form_label">
            Author
          </label>
        </div>
        <div class="form_item">
          <input type="text" id="author" class="form_input" v-model="author">
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="price" class="form_label">
            Price in {{currency}}
          </label>
        </div>
        <div class="form_item">
          <input type="number" id="price" class="form_input" step="0.5" v-model="price">
        </div>
      </div>
      <div class="form_group">
        <div class="form_item alignRight">
          <button class="btn btn_secondary" @click.prevent="cancel">Cancel</button>
          <button class="btn btn_branded" @click.prevent="add">Add</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import GenresSelect from './GenresSelect'

export default {
  name: 'create',
  components: {
    GenresSelect
  },
  data () {
    return {
      title: '',
      author: '',
      price: '2.50',
      currency: window.config.currency
    }
  },
  methods: {
    add: function () {
      this.$store.dispatch('create', {
        genre: this.genre,
        title: this.title,
        author: this.author,
        price: this.price,
        currency: this.currency,
        stocked: 1
      })
      this.$router.push({ name: 'index' })
    },
    cancel: function () {
      this.$router.push({ name: 'index' })
    }
  },
  watch: {
    price: function (price) {
      this.price = Number.parseFloat(price).toFixed(2)
    }
  }
}
</script>
