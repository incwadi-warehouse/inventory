<template>
  <b-modal>
    <b-container size="l">
      <b-form @submit.prevent="find">
        <div class="form_group form_buttons">
          <div class="form_item">
            <b-button type="outline" @click="resetFilters">
              {{ $t('reset') }}
            </b-button>
            <b-button type="primary">{{ $t('apply') }}</b-button>
          </div>
        </div>

        <b-divider />

        <details>
          <summary>{{ $t('genre') }}</summary>
          <div class="form_group">
            <div class="form_item">
              <label for="genre" class="form_label">{{ $t('genre') }}</label>
            </div>
            <div class="form_item">
              <div v-for="item in genres" :key="item.id">
                <input
                  type="checkbox"
                  :value="item.id"
                  :id="'genre-' + item.id"
                  v-model="genre"
                />
                <label :for="'genre-' + item.id" class="form_label">
                  {{ item.name }}
                </label>
              </div>
            </div>
          </div>
        </details>

        <details>
          <summary>{{ $t('older_then_x_months') }}</summary>
          <div class="form_group">
            <div class="form_item">
              <label for="added" class="form_label">
                {{ $t('older_then_x_months') }}
              </label>
            </div>
            <div class="form_item">
              <input
                type="number"
                id="added"
                class="form_input"
                min="0"
                max="120"
                v-model="added"
              />
            </div>
          </div>
        </details>

        <details>
          <summary>{{ $t('lend_more_then_x_months') }}</summary>
          <div class="form_group">
            <div class="form_item">
              <label for="lending" class="form_label">
                {{ $t('lend_more_then_x_months') }}
              </label>
            </div>
            <div class="form_item">
              <input
                type="number"
                id="lending"
                class="form_input"
                min="0"
                max="120"
                v-model="lending"
              />
            </div>
          </div>
        </details>

        <details>
          <summary>{{ $t('branches') }}</summary>
          <div class="form_group" v-show="showBranches">
            <div class="form_item">
              <label for="branches" class="form_label">{{
                $t('branches')
              }}</label>
            </div>
            <div class="form_item">
              <span v-for="item in branches" :key="item.id">
                <input
                  type="checkbox"
                  :id="'branch-' + item.id"
                  :value="item.id"
                  v-model="branch"
                />
                <label :for="'branch-' + item.id" class="form_label">
                  {{ item.name }}
                </label>
              </span>
            </div>
          </div>
        </details>

        <details>
          <summary>{{ $t('sold') }}/ {{ $t('removed') }}</summary>
          <div class="form_group">
            <div class="form_item">
              <input type="checkbox" id="sold" v-model="sold" />
              <label for="sold">{{ $t('sold') }}</label>
            </div>
          </div>
          <div class="form_group">
            <div class="form_item">
              <input type="checkbox" id="removed" v-model="removed" />
              <label for="removed">{{ $t('removed') }}</label>
            </div>
          </div>
        </details>

        <details>
          <summary>{{ $t('release_year') }}</summary>
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
                v-model="releaseYear"
              />
            </div>
          </div>
        </details>

        <details>
          <summary>{{ $t('type') }}</summary>
          <div class="form_group">
            <div class="form_item">
              <label for="orderBy" class="form_label">{{ $t('type') }}</label>
            </div>
            <div class="form_item">
              <select id="orderBy" class="form_input" v-model="type">
                <option value=""></option>
                <option value="paperback">{{ $t('paperback') }}</option>
                <option value="hardcover">{{ $t('hardcover') }}</option>
              </select>
            </div>
          </div>
        </details>

        <details>
          <summary>{{ $t('limit') }}</summary>
          <limit />
        </details>
      </b-form>
    </b-container>
  </b-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Limit from './Limit'

export default {
  name: 'filters',
  components: {
    Limit
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
      },
      set: function(type) {
        this.$store.commit('search/type', type)
      }
    },
    showBranches: function() {
      if (!this.$store.state.branch.branches) return false
      if (this.$store.state.branch.branches.length > 1) {
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
    }
  },
  created: function() {
    this.$store.dispatch('branch/branches')
    this.$store.dispatch('genre/genres')
  }
}
</script>
