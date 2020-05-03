<template>
  <b-list>
    <template #title>
      <b-form @submit.prevent="create">
        <div class="form_group">
          <div class="form_item">
            <label for="condition" class="form_label visuallyHidden">
              {{ $t('new_condition') }}
            </label>
          </div>
          <div class="form_item">
            <input
              type="text"
              class="form_input"
              id="condition"
              :placeholder="$t('enter_condition_and_hit_enter')"
              v-model="condition"
            />
          </div>
        </div>
      </b-form>
    </template>
  </b-list>
</template>

<script>
export default {
  name: 'condition-new',
  data() {
    return {
      condition: null
    }
  },
  methods: {
    create: function() {
      this.$store.dispatch('condition/create', this.condition)
      this.condition = null
    }
  }
}
</script>
