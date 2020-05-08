<template>
  <b-modal>
    <b-container size="m">
      <b-form @submit.prevent="create">
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
          <div class="form_item">
            <label for="added" class="form_label">
              {{ $t('added') }}
            </label>
          </div>
          <div class="form_item">
            <input type="date" id="added" class="form_input" v-model="added" />
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="cond" class="form_label">
              {{ $t('condition') }}
            </label>
          </div>
          <div class="form_item">
            <select class="form_input" id="cond" v-model="cond_id">
              <option value=""></option>
              <option
                :value="condition.id"
                v-for="condition in conditions"
                :key="condition.id"
              >
                {{ condition.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="form_group">
          <div class="form_item">
            <label for="cond" class="form_label">
              {{ $t('condition') }}
            </label>
          </div>
          <div class="form_item">
            <select class="form_input" id="cond" v-model="cond_id">
              <option value=""></option>
              <option
                :value="condition.id"
                v-for="condition in conditions"
                :key="condition.id"
              >
                {{ condition.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="form_group form_buttons">
          <div class="form_item">
            <b-button type="outline" @click.prevent="cancel">
              {{ $t('cancel') }}
            </b-button>
            <b-button type="primary">
              {{ $t('add') }}
            </b-button>
          </div>
        </div>
      </b-form>
    </b-container>
  </b-modal>
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
    ...mapState('condition', ['conditions']),
    added: {
      get: function() {
        return this.$store.state.book.added
      },
      set: function(added) {
        this.$store.commit('book/added', added)
      }
    },
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
    },
    cond_id: {
      get: function() {
        return this.$store.state.book.cond_id
      },
      set: function(cond_id) {
        this.$store.commit('book/cond_id', cond_id)
      }
    }
  },
  methods: {
    ...mapActions('book', ['create'])
  },
  mounted: function() {
    this.$store.dispatch('genre/genres')
    this.$store.dispatch('condition/list')
  }
}
</script>
