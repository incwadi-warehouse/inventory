<template>
  <b-list>
    <template #title>
      <b-form @submit.prevent="create">
        <b-form-group>
          <b-form-item>
            <b-form-label for="condition" class="visuallyHidden">
              {{ $t('new_condition') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="text"
              id="condition"
              :placeholder="$t('enter_condition_and_hit_enter')"
              v-model="condition"
            />
          </b-form-item>
        </b-form-group>
      </b-form>
    </template>
  </b-list>
</template>

<script>
export default {
  name: 'condition-new',
  data() {
    return {
      condition: null,
    }
  },
  methods: {
    create: function () {
      this.$store.dispatch('condition/create', this.condition)
      this.condition = null
    },
  },
}
</script>
