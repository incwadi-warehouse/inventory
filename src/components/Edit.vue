<template>
  <section>
    <spinner/>

    <section class="section section_fixed" v-if="!isLoading">
      <h1>Edit Book</h1>
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
            <label for="author" class="form_label">
              Year of publication
            </label>
          </div>
          <div class="form_item">
            <input type="number" id="author" class="form_input" v-model="yearOfPublication">
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="author" class="form_label">
              Type
            </label>
          </div>
          <div class="form_item">
            <select id="type" class="form_input" v-model="type">
              <option value="paperback">Paperback</option>
              <option value="hardcover">Hardcover</option>
            </select>
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <input type="checkbox" id="premium" v-model="premium">
            <label for="premium" class="form_label">
              Premium
            </label>
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="price" class="form_label">
              Price in {{currency}}
            </label>
          </div>
          <div class="form_item">
            <input type="number" id="price" class="form_input" :step="steps" @change="formatPrice" v-model="price">
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="added" class="form_label">
              Added
            </label>
          </div>
          <div class="form_item">
            <input type="date" id="added" class="form_input" v-model="added">
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
  </section>
</template>

<script>
import GenresSelect from './GenresSelect'
import Spinner from './Spinner'

export default {
  name: 'edit',
  props: ['id'],
  components: {
    GenresSelect,
    Spinner
  },
  data () {
    return {
      title: '',
      author: '',
      price: '2.50',
      currency: process.env.CURRENCY,
      stocked: 0,
      yearOfPublication: null,
      type: null,
      premium: null,
      added: null
    }
  },
  computed: {
    steps: function () {
      return process.env.STEPS
    },
    isLoading: function () {
      return this.$store.state.isLoading
    }
  },
  methods: {
    update: function () {
      this.$store.dispatch('books/update', {
        id: this.id,
        params: {
          genre: this.$store.state.genres.genre,
          title: this.title,
          author: this.author,
          price: this.price,
          stocked: this.stocked,
          yearOfPublication: this.yearOfPublication,
          type: this.type,
          premium: this.premium,
          added: new Date(this.added).getTime() / 1000
        }
      })
      this.$router.push({ name: 'index' })
    },
    cancel: function () {
      this.$router.push({ name: 'index' })
    },
    formatPrice: function () {
      this.price = Number.parseFloat(this.price).toFixed(2)
    }
  },
  mounted: function () {
    this.$store.dispatch('books/book', this.id)
  },
  watch: {
    '$store.state.books.book': function () {
      if (!this.$store.state.books.book) return

      this.title = this.$store.state.books.book.title
      this.author = this.$store.state.books.book.author
      this.price = this.$store.state.books.book.price
      this.stocked = this.$store.state.books.book.stocked
      this.yearOfPublication = this.$store.state.books.book.yearOfPublication
      this.type = this.$store.state.books.book.type
      this.premium = this.$store.state.books.book.premium
      let added = new Date(this.$store.state.books.book.added * 1000)
      let month = added.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let day = added.getDate()
      if (day < 10) {
        day = '0' + day
      }
      this.added = added.getFullYear() + '-' + month + '-' + day
    }
  }
}
</script>
