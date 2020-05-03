<template>
  <article>
    <span @dblclick="isEditing = true" v-if="!isEditing">
      {{ condition.name }}
    </span>
    <b-form @submit.prevent="update" v-if="isEditing">
      <div class="form_group">
        <div class="form_item">
          <label for="name" class="form_label visuallyHidden">
            {{ $t('name') }}
          </label>
        </div>
        <div class="form_item">
          <input
            type="text"
            class="form_input"
            id="name"
            v-focus
            v-model="name"
          />
        </div>
      </div>
    </b-form>
  </article>
</template>

<script>
export default {
  name: 'condition-title',
  props: {
    condition: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      name: this.condition.name,
      isEditing: false
    }
  },
  methods: {
    update: function() {
      this.$store.dispatch('condition/update', {
        id: this.condition.id,
        name: this.name
      })
      this.isEditing = false
    }
  }
}
</script>
