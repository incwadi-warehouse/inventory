<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('branch') }}</h1>
    </b-container>

    <b-container size="m" v-show="isLoading">
      <b-spinner size="l" />
    </b-container>

    <b-container size="m" v-if="stats">
      <branch-stats :stats="stats" />
    </b-container>

    <b-divider />

    <b-container size="m" v-if="branch">
      <h2>{{ $t('settings') }}</h2>
      <branch-edit :branch="branch" />
    </b-container>

    <b-divider />

    <b-container size="m">
      <h2>{{ $t('clean_up') }}</h2>
      <p>{{ $t('clean_up_desc') }}</p>
      <branch-clean-books />
    </b-container>

    <b-divider />

    <b-container size="m">
      <h2>{{ $t('conditions') }}</h2>
      <p>{{ $t('conditions_desc') }}</p>
      <condition-list
        v-for="condition in conditions"
        :key="condition.id"
        :condition="condition"
      />
      <condition-new />
    </b-container>
  </article>
</template>

<script>
import BranchCleanBooks from '../components/branch/CleanBooks'
import ConditionList from '../components/condition/List'
import ConditionNew from '../components/condition/New'
import BranchEdit from '../components/branch/Edit'
import BranchStats from '../components/branch/Stats'
import { mapState } from 'vuex'

export default {
  name: 'branch-view',
  head: {
    title: 'Branch',
  },
  components: {
    BranchCleanBooks,
    ConditionList,
    ConditionNew,
    BranchEdit,
    BranchStats,
  },
  computed: {
    ...mapState('branch', ['branch']),
    ...mapState('condition', ['conditions']),
    ...mapState('stats', ['stats', 'isLoading']),
  },
  created: function () {
    this.$store.dispatch('branch/branch')
    this.$store.dispatch('condition/list')
    this.$store.dispatch('stats/stats')
  },
}
</script>
