<template>
  <section class="section section_fixed">
    <form class="form" @submit.prevent="find">
      <div class="form_group">
        <div class="form_item">
          <label for="orderBy" class="form_label">{{ $t('order_by') }}</label>
        </div>
        <div class="form_item">
          <select id="orderBy" class="form_input" v-model="orderBy">
            <option value=""></option>
            <option value="title_asc">{{ $t('title') }} {{ $t('asc') }}</option>
            <option value="title_desc">{{ $t('title') }} {{ $t('desc') }}</option>
            <option value="author_asc">{{ $t('author') }} {{ $t('asc') }}</option>
            <option value="author_desc">{{ $t('author') }} {{ $t('desc') }}</option>
            <option value="genre_asc">{{ $t('genre') }} {{ $t('asc') }}</option>
            <option value="genre_desc">{{ $t('genre') }} {{ $t('desc') }}</option>
            <option value="added_asc">{{ $t('added') }} {{ $t('asc') }}</option>
            <option value="added_desc">{{ $t('added') }} {{ $t('desc') }}</option>
            <option value="price_asc">{{ $t('price') }} {{ $t('asc') }}</option>
            <option value="price_desc">{{ $t('price') }} {{ $t('desc') }}</option>
            <option value="type_asc">{{ $t('type') }} {{ $t('asc') }}</option>
            <option value="type_desc">{{ $t('type') }} {{ $t('desc') }}</option>
            <option value="yearOfPublication_asc">{{ $t('release_year') }} {{ $t('asc') }}</option>
            <option value="yearOfPublication_desc">{{ $t('release_year') }} {{ $t('desc') }}</option>
          </select>
        </div>
      </div>
      <div class="formGroup">
        <fieldset>
          <div class="form_item">
            <legend>{{ $t('limit') }}</legend>
          </div>
          <div class="form_item">
            <button class="btn btn_link" @click="setLimit(10)">10</button>
            <button class="btn btn_link" @click="setLimit(20)">20</button>
            <button class="btn btn_link" @click="setLimit(50)">50</button>
            <button class="btn btn_link" @click="setLimit(100)">100</button>
          </div>
        </fieldset>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'limit',
  computed: {
    orderBy: {
      get: function () {
        return this.$store.state.filter.sort
      },
      set: function (sort) {
        this.$store.commit('filter/sort', sort)
        this.$store.dispatch('books/search')
      }
    }
  },
  methods: {
    setLimit: function (limit) {
      this.$store.commit('filter/limit', limit)
      this.$store.dispatch('books/search')
    }
  }
}
</script>
