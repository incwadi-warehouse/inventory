<template>
  <section>
    <section class="section section_fixed" v-if="hasUpdateError">
      <aside class="notice notice_red">
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
            <select id="genre" class="form_input" required v-model="genre_id">
              <option v-for="genre in genres" :key="genre.id" :value="genre ? genre.id : null">
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
            <input type="text" id="price" class="form_input" pattern="^\d+(\.|,)?\d{0,2}$" required v-model="price">
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
            <button class="btn btn_primary">{{ $t('update') }}</button>
          </div>
        </div>
      </form>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'edit',
  props: ['id'],
  data () {
    return {
      currency: process.env.CURRENCY
    }
  },
  computed: {
    genres: function () {
      return this.$store.state.genre.genres
    },
    customers: function () {
      return this.$store.state.customer.customers
    },
    ...mapState('book', [
      'isLoading',
      'hasUpdateError',
      'isDuplicate'
    ]),

    title: {
      get: function () {
        return this.$store.state.book.book.title
      },
      set: function (title) {
        this.$store.commit('book/title', title)
      }
    },
    firstname: {
      get: function () {
        return this.$store.state.book.book.firstname
      },
      set: function (firstname) {
        this.$store.commit('book/firstname', firstname)
      }
    },
    surname: {
      get: function () {
        return this.$store.state.book.book.surname
      },
      set: function (surname) {
        this.$store.commit('book/surname', surname)
      }
    },
    price: {
      get: function () {
        return this.$store.state.book.book.price
      },
      set: function (price) {
        this.$store.commit('book/price', price)
      }
    },
    sold: {
      get: function () {
        return this.$store.state.book.book.sold
      },
      set: function (sold) {
        this.$store.commit('book/sold', sold)
      }
    },
    removed: {
      get: function () {
        return this.$store.state.book.book.removed
      },
      set: function (removed) {
        this.$store.commit('book/removed', removed)
      }
    },
    releaseYear: {
      get: function () {
        return this.$store.state.book.book.releaseYear
      },
      set: function (releaseYear) {
        this.$store.commit('book/releaseYear', releaseYear)
      }
    },
    type: {
      get: function () {
        return this.$store.state.book.book.type
      },
      set: function (type) {
        this.$store.commit('book/type', type)
      }
    },
    premium: {
      get: function () {
        return this.$store.state.book.book.premium
      },
      set: function (premium) {
        this.$store.commit('book/premium', premium)
      }
    },
    added: {
      get: function () {
        return this.$store.state.book.book.added
      },
      set: function (added) {
        this.$store.commit('book/added', added)
      }
    },
    lendTo: {
      get: function () {
        return this.$store.state.book.book.lendTo
      },
      set: function (lendTo) {
        this.$store.commit('book/lendTo', lendTo)
      }
    },
    lendOn: {
      get: function () {
        return this.$store.state.book.book.lendOn
      },
      set: function (lendOn) {
        this.$store.commit('book/lendOn', lendOn)
      }
    },
    genre_id: {
      get: function () {
        return this.$store.state.book.book.genre_id
      },
      set: function (genreId) {
        this.$store.commit('book/genre_id', genreId)
      }
    }
  },
  methods: {
    update: function () {
      this.$store.dispatch('book/update', this.id)
    },
    setLendTo: function () {
      if (this.lendTo === '') {
        this.lendOn = null
      } else {
        const lendOn = new Date()
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
  },
  mounted: function () {
    this.$store.dispatch('book/book', this.id)
    this.$store.dispatch('customer/customers')
    this.$store.dispatch('genre/genres')
  },
  watch: {
    '$store.state.book.book': function () {
      if (!this.$store.state.book.book) return

      const added = new Date(this.$store.state.book.book.added * 1000)
      let addedMonth = added.getMonth() + 1
      if (addedMonth < 10) {
        addedMonth = '0' + addedMonth
      }
      let addedDay = added.getDate()
      if (addedDay < 10) {
        addedDay = '0' + addedDay
      }
      this.added = added.getFullYear() + '-' + addedMonth + '-' + addedDay

      if (this.$store.state.book.book.lendOn !== null) {
        const lendOn = new Date(this.$store.state.book.book.lendOn * 1000)
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
    }
  }
}
</script>
