<template>
  <article>
    <b-list v-for="condition in conditions" :key="condition.id">
      <template #title>
        <condition-title :condition="condition" />
      </template>

      <template #options>
        <b-dropdown-item>
          <template #icon>
            <b-icon type="bin" no-hover />
          </template>
          <b-button type="text" class="dropdown_btn" @click="remove(condition)">
            {{ $t('remove') }}
          </b-button>
        </b-dropdown-item>
      </template>
    </b-list>
  </article>
</template>

<script>
import ConditionTitle from './Title'

export default {
  name: 'condition-list',
  components: {
    ConditionTitle
  },
  computed: {
    conditions: function() {
      return this.$store.state.condition.conditions
    }
  },
  methods: {
    remove: function(condition) {
      this.$store.dispatch('condition/remove', condition)
    }
  },
  created: function() {
    this.$store.dispatch('condition/list')
  }
}
</script>
