<template>
  <section>
    <section class="section section_fixed">
      <aside class="notice notice_red" v-if="hasUpdateError">
        <p class="notice_entry" v-if="!isDuplicate">
        {{ $t('book_not_valid') }}
        </p>
        <p class="notice_entry" v-if="isDuplicate">
          {{ $t('book_not_valid_duplicate') }}
        </p>
      </aside>
    </section>

    <section class="section section_fixed" v-if="isLoading">
      <div class="spinner spinner-l"></div>
    </section>

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
            <select id="genre" class="form_input" required v-model="genre">
              <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                {{genre.name}}
              </option>
            </select>
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
            <input type="text" id="firstname" class="form_input" maxlength="255" v-model="firstname">
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="surname" class="form_label">
              {{ $t('surname') }}
            </label>
          </div>
          <div class="form_item">
            <input type="text" id="surname" class="form_input" maxlength="255" required v-model="surname">
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="year_of_publication" class="form_label">
              {{ $t('release_year') }}
            </label>
          </div>
          <div class="form_item">
            <input type="number" id="year_of_publication" class="form_input" min="1000" max="9999" required v-model="releaseYear">
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
            <input type="text" id="price" class="form_input" pattern="^\d+(\.|,)\d{2}$" required v-model="price">
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <input type="checkbox" id="sold" v-model="sold">
            <label for="sold" class="form_label">
              {{ $t('sold') }}
            </label>
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <input type="checkbox" id="removed" v-model="removed">
            <label for="removed" class="form_label">
              {{ $t('removed') }}
            </label>
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
            <label for="lendTo" class="form_label">
              {{ $t('lend_to') }}
            </label>
          </div>
          <div class="form_item">
            <select id="lendTo" class="form_input" v-model="lendTo" @change="setLendTo">
              <option value=""></option>
              <option v-for="customer in customers" :key="customer.id" :value="customer.id">{{ customer.name }}</option>
            </select>
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="lendOn" class="form_label">
              {{ $t('lend_on') }}
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
export default {
  name: 'edit',
  props: ['id'],
  data () {
    return {
      title: '',
      firstname: '',
      surname: '',
      price: '2.50',
      currency: process.env.CURRENCY,
      sold: 0,
      removed: 0,
      releaseYear: null,
      type: null,
      premium: null,
      added: null,
      lendTo: null,
      lendOn: null,
      genre: null
    }
  },
  computed: {
    steps: function () {
      return process.env.STEPS
    },
    isLoading: function () {
      return this.$store.state.books.isLoading
    },
    customers: function () {
      return this.$store.state.customer.customers
    },
    genres: function () {
      return this.$store.state.genres.genres
    },
    hasUpdateError: function () {
      return this.$store.state.books.hasUpdateError
    },
    isDuplicate: function () {
      return this.$store.state.books.isDuplicate
    },
    book: function () {
      return this.$store.state.books.book
    }
  },
  methods: {
    update: function () {
      this.$store.dispatch('books/update', {
        id: this.id,
        params: {
          genre: this.genre,
          title: this.title,
          author: this.surname + ',' + this.firstname,
          price: this.price,
          sold: this.sold,
          removed: this.removed,
          releaseYear: this.releaseYear,
          type: this.type,
          premium: this.premium,
          added: new Date(this.added).getTime() / 1000,
          lendTo: this.lendTo,
          lendOn: this.lendOn === '' ? null : new Date(this.lendOn).getTime() / 1000
        }
      })
    },
    setLendTo: function () {
      if (this.lendTo === null) {
        this.lendOn = null
      } else {
        let lendOn = new Date()
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
    },
    sell: function (book) {
      this.$store.dispatch('books/sell', book.id)
      this.$store.dispatch('books/book', this.id)
    }
  },
  mounted: function () {
    this.$store.dispatch('books/book', this.id)
    this.$store.dispatch('customer/customers')
    this.$store.dispatch('genres/genres')
  },
  watch: {
    '$store.state.books.book': function () {
      if (!this.$store.state.books.book) return

      this.title = this.$store.state.books.book.title
      this.firstname = this.$store.state.books.book.author.firstname
      this.surname = this.$store.state.books.book.author.surname
      this.price = this.$store.state.books.book.price
      this.sold = this.$store.state.books.book.sold
      this.removed = this.$store.state.books.book.removed
      this.releaseYear = this.$store.state.books.book.releaseYear
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
      if (this.$store.state.books.book.lendOn !== null) {
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
      } else {
        this.lendOn = null
      }
      this.genre = this.$store.state.books.book.genre.id
    }
  }
}
</script>
