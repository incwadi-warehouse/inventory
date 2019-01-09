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
          <select id="genre" class="form_input" v-model="genre">
            <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{genre.name}}</option>
          </select>
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
            Price in EUR
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
            Sold
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
export default {
  name: 'edit',
  props: ['id'],
  data () {
    return {
      genre: '',
      title: '',
      author: '',
      price: '2.50',
      stocked: 0
    }
  },
  computed: {
    genres: function () {
      return this.$store.state.genres
    }
  },
  methods: {
    update: function () {
      this.$store.dispatch('update', {
        id: this.id,
        title: this.title,
        author: this.author,
        price: this.price,
        genre: this.genre,
        stocked: this.stocked
      })
      this.$router.push({ name: 'index' })
    },
    cancel: function () {
      this.$router.push({ name: 'index' })
    }
  },
  mounted: function () {
    this.$store.dispatch('book', this.id)
    this.$store.dispatch('genres')
  },
  watch: {
    '$store.state.book': function () {
      if (!this.$store.state.book) return

      this.title = this.$store.state.book.title
      this.author = this.$store.state.book.author
      this.price = this.$store.state.book.price
      this.genre = this.$store.state.book.genre
      this.stocked = this.$store.state.book.stocked
    },
    price: function (price) {
      this.price = Number.parseFloat(price).toFixed(2)
    }
  }
}
</script>
