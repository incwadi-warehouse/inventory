<template>
  <b-form>
    <b-form-group>
      <b-form-item>
        <b-form-label for="name" class="visuallyHidden">
          {{ $t('name_of_report') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input
          type="text"
          id="name"
          :placeholder="$t('name_of_report')"
          v-model="name"
        />
      </b-form-item>
    </b-form-group>
    <b-form-group buttons>
      <b-form-item>
        <b-button design="outline" @click.prevent="create">
          {{ $t('save_as_report') }}
        </b-button>
      </b-form-item>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  name: 'create',
  data() {
    return {
      name: null,
    }
  },
  methods: {
    create: function () {
      this.$store.dispatch('report/create', {
        name: this.name,
        term: this.$store.state.search.term,
        limitTo: this.$store.state.search.limit,
        sold: this.$store.state.search.sold,
        removed: this.$store.state.search.removed,
        olderThenXMonths: this.$store.state.search.added,
        branches: this.$store.state.search.branch
          ? this.$store.state.search.branch.toString()
          : null,
        genres: this.$store.state.search.genre
          ? this.$store.state.search.genre.toString()
          : null,
        lendMoreThenXMonths: this.$store.state.search.lending,
        orderBy: this.$store.state.search.orderBy,
        releaseYear: this.$store.state.search.releaseYear,
        type: this.$store.state.search.type,
      })
      this.name = null
    },
  },
}
</script>
