<template>
  <article class="noprint">
    <b-container size="l">
      <div class="actionbar">
        <div class="actionbar_input">
          <b-search
            :placeholder="$t('search_in_title_author_tags')"
            :button="$t('search')"
            icon
            filter
            @input="search"
            @submit.prevent="search"
            @filter="showFilter = !showFilter"
            v-model="term"
            :style="{ fontSize: '1.2em' }"
          />
        </div>

        <div class="actionbar_action">
          <b-button design="outline" ripple @click="showCreate = true">
            {{ $t('catalog') }}
          </b-button>
        </div>
      </div>
    </b-container>

    <search-filter @close="showFilter = false" v-if="showFilter" />
    <book-create @close="showCreate = false" v-if="showCreate" />
  </article>
</template>

<script>
import SearchFilter from './Filter'
import BookCreate from './../book/Create'

export default {
  name: 'search-search',
  components: {
    SearchFilter,
    BookCreate,
  },
  data() {
    return {
      showFilter: false,
      showCreate: false,
    }
  },
  computed: {
    term: {
      get: function () {
        return this.$store.state.search.term
      },
      set: function (term) {
        this.$store.commit('search/term', term)
      },
    },
  },
  methods: {
    search() {
      this.$store.dispatch('book/find')
    },
  },
}
</script>

<style scoped>
.actionbar {
  display: flex;
  align-items: center;
}
.actionbar_input {
  flex-grow: 1;
}
.actionbar_action {
  margin-left: 10px;
  text-align: right;
}
</style>
