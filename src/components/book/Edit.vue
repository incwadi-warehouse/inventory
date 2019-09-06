<template>
  <section class="container container_m">
    <form class="form" @submit.prevent="update(id)">
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
          <label for="releaseYear" class="form_label">
            {{ $t('release_year') }}
          </label>
        </div>
        <div class="form_item">
          <input
            type="number"
            id="releaseYear"
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
          <input type="checkbox" id="sold" v-model="sold" />
          <label for="sold" class="form_label">
            {{ $t('sold') }}
          </label>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <input type="checkbox" id="removed" v-model="removed" />
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
          <input type="date" id="added" class="form_input" v-model="added" />
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="lendTo" class="form_label">
            {{ $t('lend_to') }}
          </label>
        </div>
        <div class="form_item">
          <select
            id="lendTo"
            class="form_input"
            v-model="lendTo"
            @change="lending"
          >
            <option value=""></option>
            <option
              v-for="customer in customers"
              :key="customer.id"
              :value="customer.id"
            >
              {{ customer.name }}
            </option>
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
          <input type="date" id="lendOn" class="form_input" v-model="lendOn" />
        </div>
      </div>
      <div class="form_group">
        <div class="form_item alignRight">
          <button class="btn btn_primary" @click="update(id)">
            {{ $t('update') }}
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'edit',
  props: ['id'],
  data() {
    return {
      currency: process.env.CURRENCY
    }
  },
  computed: {
    ...mapState('genre', ['genres']),
    ...mapState('customer', ['customers']),
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
    sold: {
      get: function() {
        return this.$store.state.book.sold
      },
      set: function(sold) {
        this.$store.commit('book/sold', sold)
      }
    },
    removed: {
      get: function() {
        return this.$store.state.book.removed
      },
      set: function(removed) {
        this.$store.commit('book/removed', removed)
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
    lendTo: {
      get: function() {
        return this.$store.state.book.lendTo
      },
      set: function(lendTo) {
        this.$store.commit('book/lendTo', lendTo)
      }
    },
    lendOn: {
      get: function() {
        return this.$store.state.book.lendOn
      },
      set: function(lendOn) {
        this.$store.commit('book/lendOn', lendOn)
      }
    }
  },
  methods: {
    ...mapActions('book', ['update']),
    lending: function() {
      if (this.$store.state.book.lendTo) {
        this.$store.commit('book/lendOn', this.formatDate())
      } else {
        this.$store.commit('book/lendOn', null)
      }
    },
    formatDate: function() {
      const date = new Date()
      let month = date.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let day = date.getDate()
      if (day < 10) {
        day = '0' + day
      }

      return date.getFullYear() + '-' + month + '-' + day
    }
  },
  mounted: function() {
    this.$store.dispatch('book/show', this.id)
    this.$store.dispatch('customer/customers')
    this.$store.dispatch('genre/genres')
  },
  beforeDestroy: function() {
    this.$store.dispatch('book/reset')
  }
}
</script>
