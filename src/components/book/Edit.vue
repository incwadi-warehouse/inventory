<template>
  <b-container size="m">
    <b-form @submit.prevent="update(id)">
      <b-form-group>
        <b-form-item>
          <b-form-label for="genre">
            {{ $t('genre') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-select id="genre" required v-model="genreId">
            <option v-for="genre in genres" :key="genre.id" :value="genre.id">
              {{ genre.name }}
            </option>
          </b-form-select>
        </b-form-item>
      </b-form-group>
      <b-form-group>
        <b-form-item>
          <b-form-label for="title">
            {{ $t('title') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input
            type="text"
            id="title"
            maxlength="255"
            required
            v-model="title"
          />
        </b-form-item>
      </b-form-group>
      <b-form-group>
        <b-form-item>
          <b-form-label for="authorFirstname">
            {{ $t('firstname') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input
            type="text"
            id="authorFirstname"
            maxlength="255"
            v-model="authorFirstname"
          />
        </b-form-item>
      </b-form-group>
      <b-form-group>
        <b-form-item>
          <b-form-label for="authorSurname">
            {{ $t('surname') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input
            type="text"
            id="authorSurname"
            maxlength="255"
            required
            v-model="authorSurname"
          />
        </b-form-item>
      </b-form-group>
      <b-form-group>
        <b-form-item>
          <b-form-label for="releaseYear">
            {{ $t('release_year') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input
            type="number"
            id="releaseYear"
            min="1000"
            max="9999"
            required
            v-model="releaseYear"
          />
        </b-form-item>
      </b-form-group>
      <b-form-group>
        <b-form-item>
          <b-form-label for="type">
            {{ $t('type') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-select id="type" v-model="type">
            <option value="paperback">{{ $t('paperback') }}</option>
            <option value="hardcover">{{ $t('hardcover') }}</option>
          </b-form-select>
        </b-form-item>
      </b-form-group>
      <b-form-group>
        <b-form-item>
          <b-form-label for="price">
            {{ $t('price') }} ({{ currency }})
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input
            type="number"
            id="price"
            :step="branch.steps"
            pattern="^\d+(\.|,)?\d{0,2}$"
            required
            v-model="price"
            v-if="branch && branch.steps > 0"
          />
          <b-form-input
            type="text"
            id="price"
            pattern="^\d+(\.|,)?\d{0,2}$"
            required
            v-model="price"
            v-else
          />
        </b-form-item>
      </b-form-group>
      <b-form-group>
        <b-form-item>
          <input type="checkbox" name="sold" id="sold" v-model="sold" />
          <b-form-label for="sold">
            {{ $t('sold') }}
          </b-form-label>
        </b-form-item>
      </b-form-group>
      <b-form-group>
        <b-form-item>
          <input
            type="checkbox"
            name="removed"
            id="removed"
            v-model="removed"
          />
          <b-form-label for="removed">
            {{ $t('removed') }}
          </b-form-label>
        </b-form-item>
      </b-form-group>
      <b-form-group>
        <b-form-item>
          <b-form-label for="added">
            {{ $t('added') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="date" id="added" v-model="added" />
        </b-form-item>
      </b-form-group>
      <b-form-group>
        <b-form-item>
          <b-form-label for="lendTo">
            {{ $t('lend_to') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-select id="lendTo" v-model="lendTo" @change="lending">
            <option value=""></option>
            <option v-for="member in staff" :key="member.id" :value="member.id">
              {{ member.name }}
            </option>
          </b-form-select>
        </b-form-item>
      </b-form-group>
      <b-form-group>
        <b-form-item>
          <b-form-label for="lendOn">
            {{ $t('lend_on') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="date" id="lendOn" v-model="lendOn" />
        </b-form-item>
      </b-form-group>
      <b-form-group>
        <b-form-item>
          <b-form-label for="cond">
            {{ $t('condition') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-select id="cond" v-model="cond_id">
            <option value=""></option>
            <option
              :value="condition.id"
              v-for="condition in conditions"
              :key="condition.id"
            >
              {{ condition.name }}
            </option>
          </b-form-select>
        </b-form-item>
      </b-form-group>

      <!-- tags -->
      <b-form @submit.prevent="createTag">
        <b-form-group>
          <span v-for="(tag, index) in tags" :key="tag.id">
            {{ tag.name }}
            <span v-if="index !== tags.length - 1">, </span>
          </span>
        </b-form-group>
        <b-form-group>
          <b-form-item>
            <b-form-label for="tag">{{ $t('add_tag') }}</b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input type="text" id="tag" v-model="tag" />
          </b-form-item>
        </b-form-group>
        <b-form-group buttons>
          <b-button design="outline">{{ $t('add_tag') }}</b-button>
        </b-form-group>
      </b-form>
      <!-- /tags -->

      <b-form-group buttons>
        <b-form-item>
          <b-button design="primary">
            {{ $t('update') }}
          </b-button>
        </b-form-item>
      </b-form-group>
    </b-form>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'edit',
  props: ['id'],
  data() {
    return {
      currency: process.env.CURRENCY,
      tag: null,
    }
  },
  computed: {
    ...mapState('genre', ['genres']),
    ...mapState('staff', ['staff']),
    ...mapState('condition', ['conditions']),
    ...mapState('branch', ['branch']),
    added: {
      get: function () {
        return this.$store.state.book.added
      },
      set: function (added) {
        this.$store.commit('book/added', added)
      },
    },
    title: {
      get: function () {
        return this.$store.state.book.title
      },
      set: function (title) {
        this.$store.commit('book/title', title)
      },
    },
    authorFirstname: {
      get: function () {
        return this.$store.state.book.authorFirstname
      },
      set: function (authorFirstname) {
        this.$store.commit('book/authorFirstname', authorFirstname)
      },
    },
    authorSurname: {
      get: function () {
        return this.$store.state.book.authorSurname
      },
      set: function (authorSurname) {
        this.$store.commit('book/authorSurname', authorSurname)
      },
    },
    genreId: {
      get: function () {
        return this.$store.state.book.genreId
      },
      set: function (genreId) {
        this.$store.commit('book/genreId', genreId)
      },
    },
    price: {
      get: function () {
        return this.$store.state.book.price
      },
      set: function (price) {
        this.$store.commit('book/price', price)
      },
    },
    sold: {
      get: function () {
        return this.$store.state.book.sold
      },
      set: function (sold) {
        this.$store.commit('book/sold', sold)
      },
    },
    removed: {
      get: function () {
        return this.$store.state.book.removed
      },
      set: function (removed) {
        this.$store.commit('book/removed', removed)
      },
    },
    releaseYear: {
      get: function () {
        return this.$store.state.book.releaseYear
      },
      set: function (releaseYear) {
        this.$store.commit('book/releaseYear', releaseYear)
      },
    },
    type: {
      get: function () {
        return this.$store.state.book.type
      },
      set: function (type) {
        this.$store.commit('book/type', type)
      },
    },
    lendTo: {
      get: function () {
        return this.$store.state.book.lendTo
      },
      set: function (lendTo) {
        this.$store.commit('book/lendTo', lendTo)
      },
    },
    lendOn: {
      get: function () {
        return this.$store.state.book.lendOn
      },
      set: function (lendOn) {
        this.$store.commit('book/lendOn', lendOn)
      },
    },
    cond_id: {
      get: function () {
        return this.$store.state.book.cond_id
      },
      set: function (cond_id) {
        this.$store.commit('book/cond_id', cond_id)
      },
    },
    tags: function () {
      return this.$store.state.tag.tags
    },
  },
  methods: {
    ...mapActions('book', ['update']),
    lending: function () {
      if (this.$store.state.book.lendTo) {
        this.$store.commit('book/lendOn', this.formatDate())
      } else {
        this.$store.commit('book/lendOn', null)
      }
    },
    formatDate: function () {
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
    },
    createTag: function () {
      this.$store.dispatch('tag/create', this.tag)
      this.tag = null
    },
  },
  created: function () {
    this.$store.dispatch('book/show', this.id)
    this.$store.dispatch('branch/branch')
  },
  beforeDestroy: function () {
    this.$store.dispatch('book/reset')
  },
  destroyed: function () {
    this.$store.commit('tag/tags', [])
    this.tag = null
  },
}
</script>
