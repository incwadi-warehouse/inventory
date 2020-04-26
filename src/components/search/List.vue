<template>
  <article>
    <b-container size="m" class="noprint" v-if="counter">
      <p class="noprint">
        {{ $t('results') }}: {{ books.length }}/{{ counter }}
      </p>
    </b-container>

    <b-container size="m" v-if="counter">
      <b-table>
        <table>
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
              <th
                class="isSortable"
                style="text-align: right;"
                @click="filter('price')"
              >
                {{ currency }} <indicator column="price" />
              </th>
              <th
                class="isSortable"
                style="text-align: right;"
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
                <span v-show="book.lendTo">[{{ $t('lend') }}] </span>
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
              <td style="text-align: right;">
                {{ formatPrice(book.price) }}
              </td>
              <td style="text-align: right;">
                {{ book.releaseYear }}
              </td>
              <td class="noprint">
                <context-menu :book="book" />
              </td>
            </tr>
          </tbody>
        </table>
      </b-table>
    </b-container>
  </article>
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
    ...mapState('search', ['books', 'counter', 'sold', 'removed']),
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
      const ordering = this.$store.state.search.orderBy

      if (ordering === type + '_desc') {
        this.$store.commit('search/orderBy', 'asc')
      }
      if (ordering === type + '_asc') {
        this.$store.commit('search/orderBy', type + '_desc')
      }
      if (ordering !== type + '_asc' && ordering !== type + '_desc') {
        this.$store.commit('search/orderBy', type + '_asc')
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
</style>
