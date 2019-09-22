<template>
  <section>
    <section class="container container_m noprint" v-if="counter">
      <p class="noprint">
        {{ $t('results') }}: {{ books.length }}/{{ counter }}
      </p>
    </section>

    <section class="container container_m" v-if="counter">
      <div class="table_wrapper">
        <table class="table">
          <thead>
            <tr>
              <th class="isSortable" @click="filter('title')">
                {{ $t('title') }} <indicator column="title" />
              </th>
              <th class="isSortable" @click="filter('author')">
                {{ $t('author') }} <indicator column="author" />
              </th>
              <th class="isSortable" @click="filter('genre')">
                {{ $t('genre') }} <indicator column="genre" />
              </th>
              <th
                class="isSortable"
                @click="filter('added')"
                v-if="sold == false && removed == false"
              >
                {{ $t('added') }} <indicator column="added" />
              </th>
              <th
                class="isSortable"
                @click="filter('sold')"
                v-if="sold == true"
              >
                {{ $t('sold') }} <indicator column="sold" />
              </th>
              <th
                class="isSortable"
                @click="filter('removed')"
                v-if="removed == true"
              >
                {{ $t('removed') }} <indicator column="removed" />
              </th>
              <th class="isSortable" @click="filter('type')">
                {{ $t('type') }} <indicator column="type" />
              </th>
              <th class="alignRight isSortable" @click="filter('price')">
                {{ currency }} <indicator column="price" />
              </th>
              <th
                class="alignRight isSortable"
                :title="$t('release_year')"
                @click="filter('releaseYear')"
              >
                {{ $t('year') }} <indicator column="releaseYear" />
              </th>
              <th class="noprint"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book.id">
              <td>
                {{ book.title }}
              </td>
              <td v-if="book.author">
                {{ author(book.author) }}
              </td>
              <td v-else></td>
              <td>
                {{ book.genre.name }}
              </td>
              <td v-if="sold == false && removed == false">
                {{ formatDate(book.added) }}
              </td>
              <td v-if="sold == true">
                {{ formatDate(book.sold) }}
              </td>
              <td v-if="removed == true">
                {{ formatDate(book.removed) }}
              </td>
              <td>
                {{ $t(book.type) }}
              </td>
              <td class="alignRight">
                {{ formatPrice(book.price) }}
              </td>
              <td class="alignRight">
                {{ book.releaseYear }}
              </td>
              <td class="noprint">
                <context-menu :book="book" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="container container_m" v-if="showLoadMore">
      <div class="alignCenter noprint">
        <button class="btn btn_outline btn_outline_wide" @click="reload">
          {{ $t('load_more') }}
        </button>
      </div>
    </section>
  </section>
</template>

<script>
import Indicator from './orderByIndicator'
import ContextMenu from './ContextMenu'
import { mapState } from 'vuex'

export default {
  name: 'list',
  components: {
    Indicator,
    ContextMenu
  },
  data() {
    return {
      currency: process.env.CURRENCY
    }
  },
  computed: {
    ...mapState('search', ['books', 'counter']),
    ...mapState('filter', ['sold', 'removed']),
    showLoadMore: function() {
      return this.books.length < this.counter
    }
  },
  methods: {
    formatDate: function(timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString()
    },
    formatPrice: function(price) {
      return Number.parseFloat(price).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    },
    reload: function() {
      this.$store.dispatch('search/search', true)
    },
    filter: function(type) {
      const ordering = this.$store.state.filter.orderBy

      if (ordering === type + '_desc') {
        this.$store.commit('filter/orderBy', 'asc')
      }
      if (ordering === type + '_asc') {
        this.$store.commit('filter/orderBy', type + '_desc')
      }
      if (ordering !== type + '_asc' && ordering !== type + '_desc') {
        this.$store.commit('filter/orderBy', type + '_asc')
      }
      this.$store.dispatch('search/search')
    },
    author: function(author) {
      if (author.firstname === '') {
        return author.surname
      }
      return author.surname + ', ' + author.firstname
    }
  }
}
</script>

<style>
.isSortable {
  cursor: pointer;
}

@media print {
  .header,
  .search,
  .noprint {
    display: none;
  }
  .table {
    font-size: 0.7em;
  }
}
</style>
