<template>
  <section class="section section_default">
    <h1>Edit Book</h1>
    <form class="form">
      <div class="form_group">
        <div class="form_item">
          <label for="genre" class="form_label">
            Genre
          </label>
        </div>
        <div class="form_item">
          <genres-select :genre="genre"/>
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
        <div class="form_item">
          <input type="checkbox" id="stocked" v-model="stocked">
          <label for="stocked" class="form_label">
            Stocked
          </label>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item alignRight">
          <button class="btn btn_secondary" @click.prevent="cancel">Cancel</button>
          <button class="btn btn_branded" @click.prevent="update">Update</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import GenresSelect from './GenresSelect'

export default {
  name: 'edit',
  props: ['id'],
  components: {
    GenresSelect
  },
  data () {
    return {
      genre: '',
      title: '',
      author: '',
      price: '2.50',
      currency: null,
      stocked: 0
    }
  },
  methods: {
    update: function () {
      this.$store.dispatch('update', {
        id: this.id,
        params: {
          genre: this.genre,
          title: this.title,
          author: this.author,
          price: this.price,
          stocked: this.stocked
        }
      })
      this.$router.push({ name: 'index' })
    },
    cancel: function () {
      this.$router.push({ name: 'index' })
    }
  },
  mounted: function () {
    this.$store.dispatch('book', this.id)
  },
  watch: {
    '$store.state.book': function () {
      if (!this.$store.state.book) return

      this.title = this.$store.state.book.title
      this.author = this.$store.state.book.author
      this.price = this.$store.state.book.price
      this.currency = this.$store.state.book.currency
      this.genre = this.$store.state.book.genre
      this.stocked = this.$store.state.book.stocked
    },
    price: function (price) {
      this.price = Number.parseFloat(price).toFixed(2)
    }
  }
}
</script>
