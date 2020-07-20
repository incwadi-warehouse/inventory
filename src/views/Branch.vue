<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('branch') }}</h1>
    </b-container>

    <b-container size="m">
      <h2>{{ $t('clean_up') }}</h2>
      <p>{{ $t('clean_up_desc') }}</p>
      <branch-clean-books />
    </b-container>

    <b-container size="m">
      <h2>{{ $t('conditions') }}</h2>
      <p>{{ $t('conditions_desc') }}</p>
      <condition-list />
      <condition-new />
    </b-container>

    <b-container size="m" v-if="branch">
      <h2>{{ $t('settings') }}</h2>
      <branch-edit :branch="branch" />
    </b-container>
  </article>
</template>

<script>
import BranchCleanBooks from '../components/branch/CleanBooks'
import ConditionList from '../components/condition/List'
import ConditionNew from '../components/condition/New'
import BranchEdit from '../components/branch/Edit'
import { mapState } from 'vuex'

export default {
  name: 'branch-view',
  components: {
    BranchCleanBooks,
    ConditionList,
    ConditionNew,
    BranchEdit,
  },
  computed: {
    ...mapState('branch', ['branch']),
  },
  created: function () {
    this.$store.dispatch('branch/branch')
  },
}
</script>
