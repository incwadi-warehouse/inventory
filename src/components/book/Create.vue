<template>
  <section>
    <section class="section section_fixed">
      <h1>{{ $t('add_book') }}</h1>
    </section>

    <section class="section section_fixed" v-if="hasCreateError">
      <aside class="notice notice_red">
        <p class="notice_entry" v-if="!isDuplicate">
          {{ $t('book_not_valid') }}
        </p>
        <p class="notice_entry" v-if="isDuplicate">
          {{ $t('book_not_valid_duplicate') }}
        </p>
      </aside>
    </section>

    <section class="section section_fixed">
      <form class="form" @submit.prevent="create">
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
            <label for="author" class="form_label">
              {{ $t('release_year') }}
            </label>
          </div>
          <div class="form_item">
            <input type="number" id="author" class="form_input" min="1000" max="9999" required v-model="releaseYear">
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="author" class="form_label">
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
          <div class="form_item alignRight">
            <button type="submit" class="btn btn_branded">{{ $t('add') }}</button>
          </div>
        </div>
      </form>
    </section>
  </section>
</template>

<script>
export default {
  name: 'create',
  data () {
    return {
      currency: process.env.CURRENCY
    }
  },
  computed: {
    genres: function () {
      return this.$store.state.genres.genres
    },
    hasCreateError: function () {
      return this.$store.state.books.hasCreateError
    },
    isDuplicate: function () {
      return this.$store.state.books.isDuplicate
    },
    title: {
      get: function () {
        return this.$store.state.books.title
      },
      set: function (title) {
        this.$store.commit('books/title', title)
      }
    },
    firstname: {
      get: function () {
        return this.$store.state.books.firstname
      },
      set: function (firstname) {
        this.$store.commit('books/firstname', firstname)
      }
    },
    surname: {
      get: function () {
        return this.$store.state.books.surname
      },
      set: function (surname) {
        this.$store.commit('books/surname', surname)
      }
    },
    price: {
      get: function () {
        return this.$store.state.books.price
      },
      set: function (price) {
        this.$store.commit('books/price', price)
      }
    },
    releaseYear: {
      get: function () {
        return this.$store.state.books.releaseYear
      },
      set: function (releaseYear) {
        this.$store.commit('books/releaseYear', releaseYear)
      }
    },
    type: {
      get: function () {
        return this.$store.state.books.type
      },
      set: function (type) {
        this.$store.commit('books/type', type)
      }
    },
    premium: {
      get: function () {
        return this.$store.state.books.premium
      },
      set: function (premium) {
        this.$store.commit('books/premium', premium)
      }
    },
    genre: {
      get: function () {
        return this.$store.state.books.genre
      },
      set: function (genre) {
        this.$store.commit('books/genre', genre)
      }
    }
  },
  methods: {
    create: function () {
      this.$store.dispatch('books/create')
    }
  },
  mounted: function () {
    this.$store.dispatch('genres/genres')
  }
}
</script>
