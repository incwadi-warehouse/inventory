<template>
  <section>
    <spinner/>

    <section class="section section_fixed" v-if="!isLoading">
      <h1>{{ $t('edit_book') }}</h1>
      <form class="form" @submit.prevent="update">
        <div class="form_group">
          <div class="form_item">
            <label for="genre" class="form_label">
              {{ $t('genre') }}
            </label>
          </div>
          <div class="form_item">
            <genres-select/>
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="title" class="form_label">
              {{ $t('title') }}
            </label>
          </div>
          <div class="form_item">
            <input type="text" id="title" class="form_input" maxlength="255" required v-model="title">
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="firstname" class="form_label">
              {{ $t('firstname') }}
            </label>
          </div>
          <div class="form_item">
            <input type="text" id="firstname" class="form_input" maxlength="255" required v-model="firstname">
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="lastname" class="form_label">
              {{ $t('lastname') }}
            </label>
          </div>
          <div class="form_item">
            <input type="text" id="lastname" class="form_input" maxlength="255" required v-model="lastname">
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="year_of_publication" class="form_label">
              {{ $t('release_year') }}
            </label>
          </div>
          <div class="form_item">
            <input type="number" id="year_of_publication" class="form_input" min="1000" max="9999" required v-model="yearOfPublication">
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="type" class="form_label">
              {{ $t('type') }}
            </label>
          </div>
          <div class="form_item">
            <select id="type" class="form_input" v-model="type">
              <option value="paperback">{{ $t('paperback') }}</option>
              <option value="hardcover">{{ $t('hardcover') }}</option>
            </select>
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <input type="checkbox" id="premium" v-model="premium">
            <label for="premium" class="form_label">
              {{ $t('premium') }}
            </label>
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="price" class="form_label">
              {{ $t('price') }} ({{currency}})
            </label>
          </div>
          <div class="form_item">
            <input type="number" id="price" class="form_input" :step="steps" @change="formatPrice" required v-model="price">
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="added" class="form_label">
              {{ $t('added') }}
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
              {{ $t('stocked')}}
            </label>
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="lendTo" class="form_label">
              {{ $t('lendTo') }}
            </label>
          </div>
          <div class="form_item">
            <select id="lendTo" class="form_input" v-model="lendTo">
              <option value=""></option>
              <option v-for="customer in customers" :key="customer.id" :value="customer.id">{{ customer.name }}</option>
            </select>
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="lendOn" class="form_label">
              {{ $t('lendOn') }}
            </label>
          </div>
          <div class="form_item">
            <input type="date" id="lendOn" class="form_input" v-model="lendOn">
          </div>
        </div>
        <div class="form_group">
          <div class="form_item alignRight">
            <button class="btn btn_branded">{{ $t('update') }}</button>
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
      firstname: '',
      lastname: '',
      price: '2.50',
      currency: process.env.CURRENCY,
      stocked: 0,
      yearOfPublication: null,
      type: null,
      premium: null,
      added: null,
      lendTo: null,
      lendOn: null
    }
  },
  computed: {
    steps: function () {
      return process.env.STEPS
    },
    isLoading: function () {
      return this.$store.state.isLoading
    },
    customers: function () {
      return this.$store.state.customers
    }
  },
  methods: {
    update: function () {
      this.$store.dispatch('books/update', {
        id: this.id,
        params: {
          genre: this.$store.state.genres.genre,
          title: this.title,
          author: this.lastname + ',' + this.firstname,
          price: this.price,
          stocked: this.stocked,
          yearOfPublication: this.yearOfPublication,
          type: this.type,
          premium: this.premium,
          added: new Date(this.added).getTime() / 1000,
          lendTo: this.lending,
          lendOn: this.lendOn
        }
      })
      this.$router.push({ name: 'index' })
    },
    formatPrice: function () {
      this.price = Number.parseFloat(this.price).toFixed(2)
    }
  },
  mounted: function () {
    this.$store.dispatch('books/book', this.id)
    this.$store.dispatch('customers')
  },
  watch: {
    '$store.state.books.book': function () {
      if (!this.$store.state.books.book) return

      this.title = this.$store.state.books.book.title
      this.firstname = this.$store.state.books.book.author.firstname
      this.lastname = this.$store.state.books.book.author.lastname
      this.price = this.$store.state.books.book.price
      this.stocked = this.$store.state.books.book.stocked
      this.yearOfPublication = this.$store.state.books.book.yearOfPublication
      this.type = this.$store.state.books.book.type
      this.premium = this.$store.state.books.book.premium
      let added = new Date(this.$store.state.books.book.added * 1000)
      let addedMonth = added.getMonth() + 1
      if (addedMonth < 10) {
        addedMonth = '0' + addedMonth
      }
      let addedDay = added.getDate()
      if (addedDay < 10) {
        addedDay = '0' + addedDay
      }
      this.added = added.getFullYear() + '-' + addedMonth + '-' + addedDay
      this.lendTo = this.$store.state.books.book.lendTo
      this.premium = this.$store.state.books.book.premium
      let lendOn = new Date(this.$store.state.books.book.lendOn * 1000)
      let lendOnMonth = lendOn.getMonth() + 1
      if (lendOnMonth < 10) {
        lendOnMonth = '0' + lendOnMonth
      }
      let lendOnDay = lendOn.getDate()
      if (lendOnDay < 10) {
        lendOnDay = '0' + lendOnDay
      }
      this.lendOn = lendOn.getFullYear() + '-' + lendOnMonth + '-' + lendOnDay
    }
  }
}
</script>
