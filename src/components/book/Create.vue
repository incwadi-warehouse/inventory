<template>
  <section class="container container_m">
    <form class="form" @submit.prevent="create">
      <div class="form_group">
        <div class="form_item">
          <label for="genre" class="form_label">
            {{ $t('genre') }}
          </label>
        </div>
        <div class="form_item">
          <select id="genre" class="form_input" required v-model="genreId">
            <option v-for="genre in genres" :key="genre.id" :value="genre.id">
              {{ genre.name }}
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
          <input
            type="text"
            id="title"
            class="form_input"
            maxlength="255"
            required
            v-model="title"
          />
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="authorFirstname" class="form_label">
            {{ $t('firstname') }}
          </label>
        </div>
        <div class="form_item">
          <input
            type="text"
            id="authorFirstname"
            class="form_input"
            maxlength="255"
            v-model="authorFirstname"
          />
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="authorSurname" class="form_label">
            {{ $t('surname') }}
          </label>
        </div>
        <div class="form_item">
          <input
            type="text"
            id="authorSurname"
            class="form_input"
            maxlength="255"
            required
            v-model="authorSurname"
          />
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="author" class="form_label">
            {{ $t('release_year') }}
          </label>
        </div>
        <div class="form_item">
          <input
            type="number"
            id="author"
            class="form_input"
            min="1000"
            max="9999"
            required
            v-model="releaseYear"
          />
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
          <label for="price" class="form_label">
            {{ $t('price') }} ({{ currency }})
          </label>
        </div>
        <div class="form_item">
          <input
            type="text"
            id="price"
            class="form_input"
            pattern="^\d+(\.|,)?\d{0,2}$"
            required
            v-model="price"
          />
        </div>
      </div>
      <div class="form_group">
        <div class="form_item alignRight">
          <button type="submit" class="btn btn_primary">
            {{ $t('add') }}
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'create',
  data() {
    return {
      currency: process.env.CURRENCY
    }
  },
  computed: {
    ...mapState('genre', ['genres']),
    title: {
      get: function() {
        return this.$store.state.book.title
      },
      set: function(title) {
        this.$store.commit('book/title', title)
      }
    },
    authorFirstname: {
      get: function() {
        return this.$store.state.book.authorFirstname
      },
      set: function(authorFirstname) {
        this.$store.commit('book/authorFirstname', authorFirstname)
      }
    },
    authorSurname: {
      get: function() {
        return this.$store.state.book.authorSurname
      },
      set: function(authorSurname) {
        this.$store.commit('book/authorSurname', authorSurname)
      }
    },
    genreId: {
      get: function() {
        return this.$store.state.book.genreId
      },
      set: function(genreId) {
        this.$store.commit('book/genreId', genreId)
      }
    },
    price: {
      get: function() {
        return this.$store.state.book.price
      },
      set: function(price) {
        this.$store.commit('book/price', price)
      }
    },
    releaseYear: {
      get: function() {
        return this.$store.state.book.releaseYear
      },
      set: function(releaseYear) {
        this.$store.commit('book/releaseYear', releaseYear)
      }
    },
    type: {
      get: function() {
        return this.$store.state.book.type
      },
      set: function(type) {
        this.$store.commit('book/type', type)
      }
    }
  },
  methods: {
    ...mapActions('book', ['create'])
  },
  mounted: function() {
    this.$store.dispatch('genre/genres')
  }
}
</script>
