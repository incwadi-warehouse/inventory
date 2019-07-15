<template>
  <section>
    <section class="section section_fixed" v-if="counter">
      <p class="noprint">{{ $t('results') }}: {{ books.length }}/{{ counter }}</p>
    </section>

    <section class="section section_fixed" v-if="counter">
      <div class="table_wrapper">
        <table class="table">
          <thead>
            <tr>
              <th class="isSortable" @click="filter('title')">
                {{ $t('title') }} <indicator orderBy="title"/>
              </th>
              <th class="isSortable" @click="filter('author')">
                {{ $t('author') }} <indicator orderBy="author"/>
              </th>
              <th class="isSortable" @click="filter('genre')">
                {{ $t('genre') }} <indicator orderBy="genre"/>
              </th>
              <th class="isSortable" @click="filter('added')">
                {{ $t('added') }} <indicator orderBy="added"/>
              </th>
              <th class="isSortable" @click="filter('type')">
                {{$t('type') }} <indicator orderBy="type"/>
              </th>
              <th class="alignRight isSortable" @click="filter('price')">
                {{currency}} <indicator orderBy="price"/>
              </th>
              <th class="alignRight isSortable" :title="$t('release_year')" @click="filter('yearOfPublication')">
                {{ $t('year') }} <indicator orderBy="yearOfPublication"/>
              </th>
              <th class="noprint"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book.id">
              <td>
                {{book.title}}
              </td>
              <td v-if="book.author">
                {{ author(book.author) }}
              </td>
              <td v-else></td>
              <td>
                {{book.genre.name}}
              </td>
              <td>
                {{formatDate(book.added)}}
              </td>
              <td>
                {{ $t(book.type) }}
              </td>
              <td class="alignRight">
                {{formatPrice(book.price)}}
              </td>
              <td class="alignRight">
                {{book.yearOfPublication}}
              </td>
              <td class="noprint">
                <context-menu :book="book"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="section section_fixed" v-if="showLoadMore">
      <div class="alignCenter noprint">
        <button class="btn btn_secondary" style="width: 100%;" @click="reload">
          {{ $t('load_more') }}
        </button>
      </div>
    </section>
  </section>
</template>

<script>
import Indicator from './orderByIndicator'
import ContextMenu from './ContextMenu'

export default {
  name: 'list',
  components: {
    Indicator,
    ContextMenu
  },
  data () {
    return {
      currency: process.env.CURRENCY
    }
  },
  computed: {
    books: function () {
      return this.$store.state.books.books
    },
    counter: function () {
      return this.$store.state.books.counter
    },
    showLoadMore: function () {
      return this.books.length < this.counter
    }
  },
  methods: {
    formatDate: function (timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString()
    },
    formatPrice: function (price) {
      if (!Number.parseFloat) {
        Number.parseFloat = window.parseFLoat()
      }

      return Number.parseFloat(price).toLocaleString(
        undefined,
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }
      )
    },
    reload: function () {
      this.$store.commit(
        'filter/offset',
        this.$store.state.filter.offset + this.$store.state.filter.limit
      )
      this.$store.dispatch('books/search')
    },
    filter: function (type) {
      let ordering = this.$store.state.filter.sort

      if (ordering === type + '_desc') {
        this.$store.commit('filter/sort', 'asc')
      }
      if (ordering === type + '_asc') {
        this.$store.commit('filter/sort', type + '_desc')
      }
      if (ordering !== type + '_asc' && ordering !== type + '_desc') {
        this.$store.commit('filter/sort', type + '_asc')
      }
      this.$store.dispatch('books/search')
    },
    author: function (author) {
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
}
</style>
