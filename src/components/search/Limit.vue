<template>
  <article>
    <b-button type="text" style="float: right;" @click="reset">
      {{ $t('reset') }}
    </b-button>
    <b-form @submit.prevent>
      <div class="form_group">
        <div class="form_item">
          <label for="orderBy" class="form_label">{{ $t('order_by') }}</label>
        </div>
        <div class="form_item">
          <select id="orderBy" class="form_input" v-model="orderBy">
            <option value=""></option>
            <option value="title_asc">{{ $t('title') }} {{ $t('asc') }}</option>
            <option value="title_desc">
              {{ $t('title') }} {{ $t('desc') }}
            </option>
            <option value="author_asc">
              {{ $t('author') }} {{ $t('asc') }}
            </option>
            <option value="author_desc">
              {{ $t('author') }} {{ $t('desc') }}
            </option>
            <option value="genre_asc">{{ $t('genre') }} {{ $t('asc') }}</option>
            <option value="genre_desc">
              {{ $t('genre') }} {{ $t('desc') }}
            </option>
            <option value="added_asc">{{ $t('added') }} {{ $t('asc') }}</option>
            <option value="added_desc">
              {{ $t('added') }} {{ $t('desc') }}
            </option>
            <option value="price_asc">{{ $t('price') }} {{ $t('asc') }}</option>
            <option value="price_desc">
              {{ $t('price') }} {{ $t('desc') }}
            </option>
            <option value="type_asc">{{ $t('type') }} {{ $t('asc') }}</option>
            <option value="type_desc">{{ $t('type') }} {{ $t('desc') }}</option>
            <option value="releaseYear_asc">
              {{ $t('release_year') }} {{ $t('asc') }}
            </option>
            <option value="releaseYear_desc">
              {{ $t('release_year') }} {{ $t('desc') }}
            </option>
          </select>
        </div>
      </div>
      <fieldset class="formGroup">
        <div class="form_item">
          <legend>{{ $t('limit') }}</legend>
        </div>
        <div class="form_item">
          <b-button type="text" @click="setLimit(2)">2</b-button>
          <b-button type="text" @click="setLimit(10)">10</b-button>
          <b-button type="text" @click="setLimit(20)">20</b-button>
          <b-button type="text" @click="setLimit(50)">50</b-button>
          <b-button type="text" @click="setLimit(100)">100</b-button>
          <b-button type="text" @click="setLimit(200)">200</b-button>
          <b-button type="text" @click="setLimit(500)">500</b-button>
          <b-button type="text" @click="setLimit(1000)">1000</b-button>
          <b-button type="text" @click="setLimit(2000)">2000</b-button>
          <b-button type="text" @click="setLimit(5000)">5000</b-button>
        </div>
      </fieldset>
    </b-form>
  </article>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'limit',
  computed: {
    orderBy: {
      get: function() {
        return this.$store.state.search.orderBy
      },
      set: function(orderBy) {
        this.$store.commit('search/orderBy', orderBy)
        this.$store.dispatch('search/search')
      }
    }
  },
  methods: {
    setLimit: function(limit) {
      this.$store.commit('search/limit', limit)
      this.$store.dispatch('search/search')
    },
    ...mapActions('search', ['reset'])
  }
}
</script>
