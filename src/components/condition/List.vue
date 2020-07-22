<template>
  <b-list>
    <template #title>
      <condition-title :condition="condition" />
    </template>

    <template #options>
      <b-dropdown>
        <template #selector>
          <b-icon type="more" />
        </template>
        <b-dropdown-item :title="$t('remove')" icon="bin" @click="remove()" />
      </b-dropdown>
    </template>
  </b-list>
</template>

<script>
import ConditionTitle from './Title'

export default {
  name: 'condition-list',
  components: {
    ConditionTitle,
  },
  props: {
    condition: {
      type: Object,
      required: true,
    },
  },
  methods: {
    remove: function () {
      this.$store.dispatch('condition/remove', this.condition.id)
    },
  },
}
</script>
