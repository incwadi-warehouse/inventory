<template>
  <b-form @submit.prevent="find">
    <b-modal @close="$emit('close', $event)">
      <template #title>
        {{ $t('filters') }}
      </template>
      <template #footer>
        <b-form-group buttons>
          <b-form-item>
            <b-button type="button" design="text" ripple @click="reset">
              {{ $t('reset') }}
            </b-button>
            <b-button design="primary" ripple @click="find">
              {{ $t('apply') }}
            </b-button>
          </b-form-item>
        </b-form-group>
      </template>

      <b-container size="l">
        <!-- Genre -->
        <details>
          <summary>{{ $t('genres') }}</summary>
          <b-button design="text" @click="selectAllGenres" type="button">
            {{ $t('all') }}
          </b-button>
          <b-button design="text" @click="selectNoGenres" type="button">
            {{ $t('nothing') }}
          </b-button>
          <b-form-fieldset>
            <b-form-legend class="visuallyHidden">
              {{ $t('genres') }}
            </b-form-legend>
            <div v-for="genre in $store.state.genre.genres" :key="genre.id">
              <input
                type="checkbox"
                :id="'genre-' + genre.id"
                :value="genre.id"
                v-model="genreId"
              />
              <b-form-label :for="'genre-' + genre.id">
                {{ genre.name }}
              </b-form-label>
            </div>
          </b-form-fieldset>
        </details>

        <!-- Branch -->
        <details v-if="$store.state.user.me.isAdmin">
          <summary>{{ $t('branches') }}</summary>
          <b-form-fieldset>
            <b-form-legend class="visuallyHidden">
              {{ $t('branches') }}
            </b-form-legend>
            <b-form-item>
              <div
                v-for="branch in $store.state.branch.branches"
                :key="branch.id"
              >
                <input
                  type="checkbox"
                  :id="'branch-' + branch.id"
                  :value="branch.id"
                  v-model="branches"
                />
                <b-form-label :for="'branch-' + branch.id">
                  {{ branch.name }}
                </b-form-label>
              </div>
            </b-form-item>
          </b-form-fieldset>
        </details>

        <!-- Release Year -->
        <details>
          <summary>{{ $t('releaseYear') }}</summary>
          <div class="split">
            <div class="split_item">
              <b-form-group>
                <b-form-item>
                  <b-form-label for="releaseYearStart">
                    {{ $t('from') }}
                  </b-form-label>
                </b-form-item>
                <b-form-item>
                  <b-form-input
                    type="number"
                    id="releaseYearStart"
                    v-model="releaseYearStart"
                  />
                </b-form-item>
              </b-form-group>
            </div>

            <div class="split_item">
              <b-form-group>
                <b-form-item>
                  <b-form-label for="releaseYearEnd">
                    {{ $t('until') }}
                  </b-form-label>
                </b-form-item>
                <b-form-item>
                  <b-form-input
                    type="number"
                    id="releaseYearEnd"
                    v-model="releaseYearEnd"
                  />
                </b-form-item>
              </b-form-group>
            </div>
          </div>
        </details>

        <!-- Availability -->
        <details>
          <summary>{{ $t('availability') }}</summary>
          <!-- Lend -->
          <b-form-group>
            <b-form-item>
              <input type="checkbox" id="lend" v-model="lend" />
              <b-form-label for="lend">{{ $t('lend') }}</b-form-label>
            </b-form-item>

            <!-- Sold -->
            <b-form-item>
              <input type="checkbox" id="sold" v-model="sold" />
              <b-form-label for="sold">{{ $t('sold') }}</b-form-label>
            </b-form-item>

            <!-- Removed -->
            <b-form-item>
              <input type="checkbox" id="removed" v-model="removed" />
              <b-form-label for="removed">{{ $t('removed') }}</b-form-label>
            </b-form-item>

            <!-- Reserved -->
            <b-form-item>
              <input type="checkbox" id="reserved" v-model="reserved" />
              <b-form-label for="reserved">{{ $t('reserved') }}</b-form-label>
            </b-form-item>
          </b-form-group>
        </details>

        <!-- Type -->
        <details>
          <summary>{{ $t('type') }}</summary>
          <b-form-group>
            <b-form-item>
              <b-form-label for="type" hidden>{{ $t('type') }}</b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-select id="type" v-model="type">
                <option value="">{{ $t('all') }}</option>
                <option value="paperback">{{ $t('paperback') }}</option>
                <option value="hardcover">{{ $t('hardcover') }}</option>
              </b-form-select>
            </b-form-item>
          </b-form-group>
        </details>

        <!-- Added -->
        <details>
          <summary>{{ $t('added') }}</summary>
          <div class="split">
            <div class="split_item">
              <b-form-group>
                <b-form-item>
                  <b-form-label for="addedStart">
                    {{ $t('from') }}
                  </b-form-label>
                </b-form-item>
                <b-form-item>
                  <b-form-input
                    type="date"
                    id="addedStart"
                    v-model="addedStart"
                  />
                </b-form-item>
              </b-form-group>
            </div>

            <div class="split_item">
              <b-form-group>
                <b-form-item>
                  <b-form-label for="addedEnd">{{ $t('until') }}</b-form-label>
                </b-form-item>
                <b-form-item>
                  <b-form-input type="date" id="addedEnd" v-model="addedEnd" />
                </b-form-item>
              </b-form-group>
            </div>
          </div>
        </details>

        <details>
          <summary>{{ $t('sorting') }}</summary>
          <!-- Order By -->
          <b-form-group>
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

          <!-- Order By Direction -->
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
        </details>

        <!-- Limit -->
        <details>
          <summary>{{ $t('limit') }}</summary>
          <b-form-group>
            <b-form-item>
              <b-form-label for="limit">{{ $t('limit') }}</b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-input type="number" id="limit" v-model="limit" />
            </b-form-item>
          </b-form-group>
        </details>
      </b-container>
    </b-modal>
  </b-form>
</template>

<script>
export default {
  name: 'filters-search',
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
      genreId: this.$store.state.search.elements[1].value,
      branches:
        this.$store.state.search.elements[2].value.length === 0
          ? [this.$store.state.user.me.branch.id]
          : this.$store.state.search.elements[2].value,
      releaseYearStart: this.$store.state.search.elements[3]
        ? this.$store.state.search.elements[3].value
        : null,
      releaseYearEnd: this.$store.state.search.elements[4]
        ? this.$store.state.search.elements[4].value
        : null,
      lend: this.$store.state.search.elements[5]
        ? this.$store.state.search.elements[5].value
        : false,
      sold: this.$store.state.search.elements[6].value,
      removed: this.$store.state.search.elements[7].value,
      reserved: this.$store.state.search.elements[11].value,
      type: this.$store.state.search.elements[8]
        ? this.$store.state.search.elements[8].value
        : null,
      addedStart: this.$store.state.search.elements[8]
        ? this.$store.state.search.elements[9].value
        : null,
      addedEnd: this.$store.state.search.elements[10]
        ? this.$store.state.search.elements[10].value
        : null,
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
      this.$store.commit('search/elements', {
        1: { field: 'genre', operator: 'in', value: this.genreId },
        2: { field: 'branch', operator: 'in', value: this.branches },
        3: this.releaseYearStart
          ? {
              field: 'releaseYear',
              operator: 'gte',
              value: this.releaseYearStart,
            }
          : {},
        4: this.releaseYearEnd
          ? {
              field: 'releaseYear',
              operator: 'lte',
              value: this.releaseYearEnd,
            }
          : {},
        5: this.lend
          ? {
              field: 'lendOn',
              operator: 'gte',
              value: 1 * 1000,
            }
          : {},
        6: { field: 'sold', operator: 'eq', value: this.sold },
        7: { field: 'removed', operator: 'eq', value: this.removed },
        11: { field: 'reserved', operator: 'eq', value: this.reserved },
        8: {
          field: 'type',
          operator: 'eq',
          value: this.type !== '' ? this.type : null,
        },
        9: this.addedStart
          ? { field: 'added', operator: 'gte', value: this.addedStart }
          : {},
        10: this.addedEnd
          ? { field: 'added', operator: 'lte', value: this.addedEnd }
          : {},
      })
      this.$store.dispatch('book/find')
      this.$emit('close', this.$event)
    },
    reset() {
      this.$store.dispatch('search/reset')
    },
    selectAllGenres() {
      document.querySelectorAll("input[id^='genre-']").forEach((element) => {
        element.checked = true
      })
    },
    selectNoGenres() {
      document.querySelectorAll("input[id^='genre-']").forEach((element) => {
        element.checked = false
      })
    },
  },
  watch: {
    '$store.state.genre.genres'() {
      if (this.$store.state.search.elements[1].value.length >= 1) return
      let genres = []
      this.$store.state.genre.genres.forEach((genre) => {
        genres.push(genre.id)
      })

      this.genreId = genres
    },
    '$store.state.search.elements'() {
      this.genreId = this.$store.state.search.elements[1].value
      this.branches =
        this.$store.state.search.elements[2].value.length === 0
          ? [this.$store.state.user.me.branch.id]
          : this.$store.state.search.elements[2].value
      this.releaseYearStart = this.$store.state.search.elements[3]
        ? this.$store.state.search.elements[3].value
        : null
      this.releaseYearEnd = this.$store.state.search.elements[4]
        ? this.$store.state.search.elements[4].value
        : null
      this.lend = this.$store.state.search.elements[5]
        ? this.$store.state.search.elements[5].value
        : false
      this.sold = this.$store.state.search.elements[6].value
      this.removed = this.$store.state.search.elements[7].value
      this.reserved = this.$store.state.search.elements[11].value
      this.type = this.$store.state.search.elements[8]
        ? this.$store.state.search.elements[8].value
        : null
      this.addedStart = this.$store.state.search.elements[9]
        ? this.$store.state.search.elements[9].value
        : null
      this.addedEnd = this.$store.state.search.elements[10]
        ? this.$store.state.search.elements[10].value
        : null
    },
  },
  created() {
    this.$store.dispatch('genre/genres')
    this.$store.dispatch('branch/branches')
  },
}
</script>

<style scoped>
.split {
  display: flex;
}
.split_item {
  width: 50%;
}
.split_item:nth-child(1) {
  margin-right: 10px;
}
.split_item:nth-child(2) {
  margin-left: 10px;
}
</style>
