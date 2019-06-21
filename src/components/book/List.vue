<template>
  <section class="section section_fixed" v-if="counter">
    <p class="noprint" v-if="counter">{{ $t('results') }}: {{ counter }}</p>

    <div class="table_wrapper">
      <table class="table">
        <thead>
          <tr>
            <th class="isSortable" @click="filter('title')">{{ $t('title') }} <span v-if="sort === 'title_asc'">&#9650;</span><span v-if="sort === 'title_desc'">&#9660;</span></th>
            <th class="isSortable" @click="filter('author')">{{ $t('author') }} <span v-if="sort === 'author_asc'">&#9650;</span><span v-if="sort === 'author_desc'">&#9660;</span></th>
            <th class="isSortable" @click="filter('genre')">{{ $t('genre') }} <span v-if="sort === 'genre_asc'">&#9650;</span><span v-if="sort === 'genre_desc'">&#9660;</span></th>
            <th class="isSortable" @click="filter('added')">{{ $t('added') }} <span v-if="sort === 'added_asc'">&#9650;</span><span v-if="sort === 'added_desc'">&#9660;</span></th>
            <th class="isSortable" @click="filter('type')">{{$t('type') }} <span v-if="sort === 'type_asc'">&#9650;</span><span v-if="sort === 'type_desc'">&#9660;</span></th>
            <th class="alignRight isSortable" @click="filter('price')">{{currency}} <span v-if="sort === 'price_asc'">&#9650;</span><span v-if="sort === 'price_desc'">&#9660;</span></th>
            <th class="alignRight isSortable" @click="filter('yearOfPublication')">{{ $t('release_year') }} <span v-if="sort === 'yearOfPublication_asc'">&#9650;</span><span v-if="sort === 'yearOfPublication_desc'">&#9660;</span></th>
            <th class="noprint"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>{{book.title}}</td>
            <td v-if="book.author">{{book.author.lastname}}, {{book.author.firstname}}</td>
            <td v-else></td>
            <td>{{book.genre.name}}</td>
            <td>{{formatDate(book.added)}}</td>
            <td>{{book.type}}</td>
            <td class="alignRight">{{formatPrice(book.price)}}</td>
            <td class="alignRight">{{book.yearOfPublication}}</td>
            <td class="alignRight noprint"><router-link :to="{ name: 'edit', params: { id: book.id } }">{{ $t('edit') }}</router-link></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="alignCenter noprint">
      <button class="btn btn_secondary" @click="reload" v-if="counter > 10">
        {{ $t('load_more') }}
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'list',
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
    sort: function () {
      return this.$store.state.filter.sort
    }
  },
  methods: {
    formatDate: function (timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString()
    },
    formatPrice: function (price) {
      if (!Number.parseFloat) {
        return window.parseFloat(price).toLocaleString(
          undefined,
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }
        )
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
