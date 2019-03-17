<template>
  <section class="section section_fixed">
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
          <input type="number" id="price" class="form_input" :step="steps" v-model="price">
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
      currency: process.env.CURRENCY,
      yearOfPublication: 2019,
      type: 'paperback',
      premium: false
    }
  },
  computed: {
    steps: function () {
      return process.env.STEPS
    }
  },
  methods: {
    add: function () {
      this.$store.dispatch('create', {
        title: this.title,
        author: this.author,
        genre: this.$store.state.genre,
        price: this.price,
        stocked: true,
        yearOfPublication: this.yearOfPublication,
        type: this.type,
        premium: this.premium,
        added: Math.round(new Date().getTime() / 1000)
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
