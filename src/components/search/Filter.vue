<template>
  <b-modal @close="$emit('close', $event)">
    <b-container size="l">
      <b-notification type="warning">
        {{ $t('deprecated') }}
      </b-notification>
    </b-container>

    <b-container size="l">
      <b-form @submit.prevent="find">
        <b-form-group buttons>
          <b-form-item>
            <b-button type="button" design="text" @click="reset">
              {{ $t('reset') }}
            </b-button>
            <b-button design="primary" @click="find">
              {{ $t('apply') }}
            </b-button>
          </b-form-item>
        </b-form-group>

        <b-divider />

        <b-form-group>
          <b-form-item>
            <b-form-label for="term">{{ $t('term') }}</b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input id="term" v-model="term" />
          </b-form-item>
        </b-form-group>

        <filter-item
          v-for="el in Object.keys(this.$store.state.search.elements).length"
          :key="el"
          :filter="elements[el]"
          @input="(event) => handle(event, el)"
          @remove="remove(el)"
        />
        <b-button design="outline_wide" type="button" @click="add">
          {{ $t('add_field') }}
        </b-button>

        <b-form-group style="margin-top: 20px">
          <b-form-item>
            <b-form-label for="orderBy_field">
              {{ $t('orderBy_field') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-select id="orderBy_field" v-model="orderBy_field">
              <option v-for="field in fields" :value="field" :key="field">
                {{ $t(field) }}
              </option>
            </b-form-select>
          </b-form-item>
        </b-form-group>

        <b-form-group>
          <b-form-item>
            <b-form-label for="orderBy_direction">
              {{ $t('orderBy_direction') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-fieldset id="orderBy_direction">
              <input
                type="radio"
                name="direction"
                value="ASC"
                id="orderBy_direction_asc"
                v-model="orderBy_direction"
              />
              <b-form-label for="orderBy_direction_asc">
                {{ $t('asc') }}
              </b-form-label>
              <input
                type="radio"
                name="direction"
                value="DESC"
                id="orderBy_direction_desc"
                v-model="orderBy_direction"
              />
              <b-form-label for="orderBy_direction_desc">
                {{ $t('desc') }}
              </b-form-label>
            </b-form-fieldset>
          </b-form-item>
        </b-form-group>

        <b-form-group>
          <b-form-item>
            <b-form-label for="limit">{{ $t('limit') }}</b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input type="number" id="limit" v-model="limit" />
          </b-form-item>
        </b-form-group>
      </b-form>
    </b-container>

    <b-container size="l">
      <h2>{{ $t('saved_searches') }}</h2>
      <p>{{ $t('savedsearches_desc') }}</p>
      <b-notification type="warning">
        {{ $t('deprecated') }}
      </b-notification>

      <saved-search-create />
      <saved-search-list @find="find" />
    </b-container>
  </b-modal>
</template>

<script>
import FilterItem from './FilterItem'
import SavedSearchList from './../savedsearch/List'
import SavedSearchCreate from './../savedsearch/Create'

export default {
  name: 'filter-search',
  components: {
    FilterItem,
    SavedSearchList,
    SavedSearchCreate,
  },
  data() {
    return {
      fields: [
        'title',
        'author',
        'genre',
        'added',
        'price',
        'type',
        'releaseYear',
      ],
    }
  },
  computed: {
    term: {
      get() {
        return this.$store.state.search.term
      },
      set(term) {
        this.$store.commit('search/term', term)
      },
    },
    limit: {
      get() {
        return this.$store.state.search.limit
      },
      set(limit) {
        this.$store.commit('search/limit', limit)
      },
    },
    orderBy_field: {
      get() {
        return this.$store.state.search.orderByField
      },
      set(orderBy_field) {
        this.$store.commit('search/orderByField', orderBy_field)
      },
    },
    orderBy_direction: {
      get() {
        return this.$store.state.search.orderByDirection.toUpperCase()
      },
      set(orderBy_direction) {
        this.$store.commit('search/orderByDirection', orderBy_direction)
      },
    },
    elements() {
      return this.$store.state.search.elements
    },
  },
  methods: {
    add() {
      this.$store.dispatch('search/addElement')
    },
    handle(val, id) {
      this.$store.dispatch('search/handleElement', { val, id })
    },
    remove(id) {
      this.$store.dispatch('search/removeElement', id)
    },
    find() {
      this.$store.dispatch('book/find')
      this.$emit('close', this.$event)
    },
    reset() {
      this.$store.dispatch('search/reset')
    },
  },
}
</script>
