<template>
  <div class="filter" v-if="filter && filter !== {}">
    <div class="filter_item">
      <b-form-group>
        <b-form-select v-model="field" @input="handle">
          <option></option>
          <option v-for="el in fields" :key="el" :value="el">
            {{ $t(el) }}
          </option>
        </b-form-select>
      </b-form-group>
    </div>

    <div class="filter_item">
      <b-form-group>
        <b-form-select v-model="operator" @input="handle">
          <option></option>
          <option v-for="el in operators" :key="el" :value="el">
            {{ $t(el) }}
          </option>
        </b-form-select>
      </b-form-group>
    </div>

    <div class="filter_item">
      <b-form-group>
        <!-- default -->
        <b-form-input v-model="value" v-if="!field" />

        <!-- lendOn -->
        <!-- added -->
        <div v-if="'lendOn' === field || 'added' === field">
          <b-form-input
            type="number"
            v-model="value"
            :placeholder="$t('months')"
          />
          <p>
            {{ value | format }}
          </p>
        </div>

        <!-- releaseYear -->
        <b-form-input
          type="number"
          v-model="value"
          v-if="'releaseYear' === field"
        />

        <!-- genre -->
        <div v-if="'genre' === field" class="list">
          <div v-for="genre in $store.state.genre.genres" :key="genre.id">
            <input
              type="checkbox"
              :id="'genre-' + genre.id"
              :value="genre.id"
              v-model="value"
            />
            <b-form-label :for="'genre-' + genre.id">
              {{ genre.name }}
            </b-form-label>
          </div>
        </div>

        <!-- branches -->
        <div v-if="'branches' === field" class="list">
          <div v-for="branch in $store.state.branch.branches" :key="branch.id">
            <input
              type="checkbox"
              :id="'branch-' + branch.id"
              :value="branch.id"
              v-model="value"
            />
            <b-form-label :for="'branch-' + branch.id">
              {{ branch.name }}
            </b-form-label>
          </div>
        </div>

        <!-- sold -->
        <!-- removed -->
        <b-form-select
          v-if="'sold' === field || 'removed' === field"
          v-model="value"
        >
          <option value="1">{{ $t('yes') }}</option>
          <option value="0">{{ $t('no') }}</option>
        </b-form-select>

        <!-- type -->
        <b-form-select v-if="'type' === field" v-model="value">
          <option value="paperback">{{ $t('paperback') }}</option>
          <option value="hardcover">{{ $t('hardcover') }}</option>
        </b-form-select>
      </b-form-group>
    </div>

    <div class="filter_item">
      <b-button type="button" design="text" @click.prevent="$emit('remove')">
        <b-icon type="bin" :size="20" />
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'filter-item-search',
  props: {
    filter: Object,
  },
  data() {
    return {
      fields: [
        'genre',
        'lendOn',
        'branches',
        'releaseYear',
        'sold',
        'removed',
        'type',
        'added',
      ],
      operators: ['eq', 'gte', 'gt', 'lte', 'lt', 'in'],
      field: this.filter ? this.filter.field : null,
      operator: this.filter ? this.filter.operator : null,
      value: this.filter ? this.filter.value : null,
    }
  },
  methods: {
    filters() {
      return {
        field: this.field,
        operator: this.operator,
        value: this.value || null,
      }
    },
    setOperators() {
      if ('genre' === this.field || 'branches' === this.field) {
        this.operators = ['in']
      }
      if (
        'lendOn' === this.field ||
        'releaseYear' === this.field ||
        'added' === this.field
      ) {
        this.operators = ['eq', 'gte', 'gt', 'lte', 'lt']
      }
    },
    setDefaultValue() {
      if ('genre' === this.field || 'branches' === this.field) {
        if (null === this.value) {
          this.value = []
        }
      }
      if ('releaseYear' === this.field) {
        this.value = '2020'
      }
    },
    handle() {
      this.$emit('input', {
        field: this.field,
        operator: this.operator || 'eq',
        value: this.value || null,
      })
    },
  },
  filters: {
    format(value) {
      let date = new Date()
      date.setMonth(date.getMonth() - value)

      return date.toLocaleString()
    },
  },
  watch: {
    field() {
      this.setOperators()
      this.setDefaultValue()
      this.handle()
    },
    value() {
      this.handle()
    },
  },
  created() {
    this.$store.dispatch('genre/genres')
    this.$store.dispatch('branch/branches')
  },
  mounted() {
    this.setOperators()
    this.setDefaultValue()
  },
}
</script>

<style scoped>
.filter {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 40px;
}
.filter_item {
  flex-grow: 1;
  box-sizing: border-box;
  width: 100%;
  justify-items: center;
}
.filter_item:nth-child(2) {
  margin: 10px 0;
}
.list {
  height: 100px;
  overflow: auto;
}
.list::-webkit-scrollbar-track-piece {
  border: 1px solid var(--color-neutral-02);
  border-radius: 5px;
}

@media all and (min-width: 600px) {
  .filter {
    flex-wrap: nowrap;
    margin-bottom: 20px;
  }
  .filter_item:nth-child(1) {
    width: 30%;
  }
  .filter_item:nth-child(2) {
    width: 20%;
    margin: 0 10px;
  }
  .filter_item:nth-child(3) {
    width: 50%;
  }
  .filter_item:nth-child(4) {
    width: 40px;
    padding: 0 10px;
  }
}
</style>
