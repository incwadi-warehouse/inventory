<template>
  <b-modal @close="close">
    <b-container size="l">
      <b-form @submit.prevent="find">
        <b-form-group buttons>
          <b-form-item>
            <b-button design="outline" @click="resetFilters">
              {{ $t('reset') }}
            </b-button>
            <b-button design="primary">{{ $t('apply') }}</b-button>
          </b-form-item>
        </b-form-group>

        <b-divider />

        <details>
          <summary>{{ $t('genres') }}</summary>
          <b-form-group>
            <b-form-item v-for="item in genres" :key="item.id">
              <b-form-input
                type="checkbox"
                :value="item.id"
                no-styling
                :id="'genre-' + item.id"
                v-model="genre"
              />
              <b-form-label :for="'genre-' + item.id">
                {{ item.name }}
              </b-form-label>
            </b-form-item>
          </b-form-group>
        </details>

        <details>
          <summary>{{ $t('added') }}</summary>
          <b-form-group>
            <b-form-item>
              <b-form-label for="added">
                {{ $t('older_then_x_months') }}
              </b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-input
                type="number"
                id="added"
                min="0"
                max="120"
                v-model="added"
              />
            </b-form-item>
          </b-form-group>
        </details>

        <details>
          <summary>{{ $t('lend') }}</summary>
          <b-form-group>
            <b-form-item>
              <b-form-label for="lending">
                {{ $t('lend_more_then_x_months') }}
              </b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-input
                type="number"
                id="lending"
                min="0"
                max="120"
                v-model="lending"
              />
            </b-form-item>
          </b-form-group>
        </details>

        <details>
          <summary>{{ $t('branches') }}</summary>
          <b-form-group v-show="showBranches">
            <b-form-item v-for="item in branches" :key="item.id">
              <b-form-input
                type="checkbox"
                no-styling
                :id="'branch-' + item.id"
                :value="item.id"
                v-model="branch"
              />
              <b-form-label :for="'branch-' + item.id">
                {{ item.name }}
              </b-form-label>
            </b-form-item>
          </b-form-group>
        </details>

        <details>
          <summary>{{ $t('availability') }}</summary>
          <b-form-group>
            <b-form-item>
              <b-form-input
                type="checkbox"
                id="sold"
                no-styling
                v-model="sold"
              />
              <b-form-label for="sold">{{ $t('sold') }}</b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-input
                type="checkbox"
                id="removed"
                no-styling
                v-model="removed"
              />
              <b-form-label for="removed">{{ $t('removed') }}</b-form-label>
            </b-form-item>
          </b-form-group>
        </details>

        <details>
          <summary>{{ $t('release_year') }}</summary>
          <b-form-group>
            <b-form-item>
              <b-form-label for="releaseYear" class="visuallyHidden">
                {{ $t('release_year') }}
              </b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-input
                type="number"
                id="releaseYear"
                v-model="releaseYear"
              />
            </b-form-item>
          </b-form-group>
        </details>

        <details>
          <summary>{{ $t('type') }}</summary>
          <b-form-group>
            <b-form-item>
              <b-form-label for="orderBy" class="visuallyHidden">
                {{ $t('type') }}
              </b-form-label>
            </b-form-item>
            <b-form-item>
              <input type="radio" value="all" id="all" v-model="type" />
              <b-form-label for="all">{{ $t('all') }}</b-form-label>
              <b-form-input
                type="radio"
                value="paperback"
                id="paperback"
                no-styling
                v-model="type"
              />
              <b-form-label for="paperback">
                {{ $t('paperback') }}
              </b-form-label>
              <b-form-input
                type="radio"
                value="hardcover"
                id="hardcover"
                no-styling
                v-model="type"
              />
              <b-form-label for="hardcover">
                {{ $t('hardcover') }}
              </b-form-label>
            </b-form-item>
          </b-form-group>
        </details>

        <details>
          <summary>{{ $t('ordering') }}</summary>
          <b-form-group>
            <b-form-item>
              <b-form-label for="orderBy">
                {{ $t('order_by') }}
              </b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-select id="orderBy" v-model="orderBy">
                <option value=""></option>
                <option value="title_asc"
                  >{{ $t('title') }} {{ $t('asc') }}</option
                >
                <option value="title_desc">
                  {{ $t('title') }} {{ $t('desc') }}
                </option>
                <option value="author_asc">
                  {{ $t('author') }} {{ $t('asc') }}
                </option>
                <option value="author_desc">
                  {{ $t('author') }} {{ $t('desc') }}
                </option>
                <option value="genre_asc"
                  >{{ $t('genre') }} {{ $t('asc') }}</option
                >
                <option value="genre_desc">
                  {{ $t('genre') }} {{ $t('desc') }}
                </option>
                <option value="added_asc"
                  >{{ $t('added') }} {{ $t('asc') }}</option
                >
                <option value="added_desc">
                  {{ $t('added') }} {{ $t('desc') }}
                </option>
                <option value="price_asc"
                  >{{ $t('price') }} {{ $t('asc') }}</option
                >
                <option value="price_desc">
                  {{ $t('price') }} {{ $t('desc') }}
                </option>
                <option value="type_asc"
                  >{{ $t('type') }} {{ $t('asc') }}</option
                >
                <option value="type_desc"
                  >{{ $t('type') }} {{ $t('desc') }}</option
                >
                <option value="releaseYear_asc">
                  {{ $t('release_year') }} {{ $t('asc') }}
                </option>
                <option value="releaseYear_desc">
                  {{ $t('release_year') }} {{ $t('desc') }}
                </option>
              </b-form-select>
            </b-form-item>
          </b-form-group>
        </details>

        <details>
          <summary>{{ $t('limit') }}</summary>
          <b-form-group>
            <b-form-item>
              <b-form-label for="limit">{{ $t('limit_to') }}</b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-input type="number" id="limit" v-model="limit" />
            </b-form-item>
          </b-form-group>
        </details>
      </b-form>
    </b-container>

    <b-divider />

    <b-container size="m">
      <report-create />
      <report-list />
    </b-container>
  </b-modal>
</template>

<script>
import ReportCreate from '../report/Create'
import ReportList from '../report/List'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'filters',
  components: {
    ReportCreate,
    ReportList
  },
  data() {
    return {
      filter: false
    }
  },
  computed: {
    ...mapState('branch', ['branches']),
    ...mapState('genre', ['genres']),
    sold: {
      get: function() {
        return this.$store.state.search.sold || false
      },
      set: function(sold) {
        this.$store.commit('search/sold', sold ? 1 : 0)
      }
    },
    removed: {
      get: function() {
        return this.$store.state.search.removed || false
      },
      set: function(removed) {
        this.$store.commit('search/removed', removed ? 1 : 0)
      }
    },
    added: {
      get: function() {
        return this.$store.state.search.added || 0
      },
      set: function(added) {
        this.$store.commit('search/added', added)
      }
    },
    branch: {
      get: function() {
        return (
          this.$store.state.search.branch ||
          (this.$store.state.user.me
            ? [this.$store.state.user.me.branch.id]
            : [])
        )
      },
      set: function(branch) {
        this.$store.commit('search/branch', branch)
      }
    },
    genre: {
      get: function() {
        return this.$store.state.search.genre || []
      },
      set: function(genre) {
        this.$store.commit('search/genre', genre)
      }
    },
    lending: {
      get: function() {
        return this.$store.state.search.lending || 0
      },
      set: function(lending) {
        this.$store.commit('search/lending', lending)
      }
    },
    releaseYear: {
      get: function() {
        return this.$store.state.search.releaseYear
      },
      set: function(releaseYear) {
        this.$store.commit('search/releaseYear', releaseYear)
      }
    },
    type: {
      get: function() {
        return this.$store.state.search.type
          ? this.$store.state.search.type
          : 'all'
      },
      set: function(type) {
        this.$store.commit('search/type', type === 'all' ? null : type)
      }
    },
    orderBy: {
      get: function() {
        return this.$store.state.search.orderBy
      },
      set: function(orderBy) {
        this.$store.commit('search/orderBy', orderBy)
      }
    },
    limit: {
      get: function() {
        return this.$store.state.search.limit
      },
      set: function(limit) {
        this.$store.commit('search/limit', limit)
      }
    },
    showBranches: function() {
      if (!this.$store.state.branch.branches) return false
      if (this.$store.state.branch.branches.length >= 1) {
        return true
      }
      return false
    }
  },
  methods: {
    ...mapActions('search', {
      resetFilters: 'reset'
    }),
    find: function() {
      this.$store.dispatch('search/search')
      this.$store.commit('search/tab', false)
    },
    close: function() {
      this.$store.commit('search/tab', null)
    }
  },
  created: function() {
    this.$store.dispatch('branch/branches')
    this.$store.dispatch('genre/genres')
  }
}
</script>
