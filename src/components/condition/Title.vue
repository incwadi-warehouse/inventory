<template>
  <article>
    <span @dblclick="isEditing = true" v-if="!isEditing">
      {{ condition.name }}
    </span>
    <b-form @submit.prevent="update" v-if="isEditing">
      <b-form-group>
        <b-form-item>
          <b-form-label for="name" hidden>
            {{ $t('name') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="text" id="name" v-focus v-model="name" />
        </b-form-item>
      </b-form-group>
    </b-form>
  </article>
</template>

<script>
export default {
  name: 'condition-title',
  props: {
    condition: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: this.condition.name,
      isEditing: false,
    }
  },
  methods: {
    update: function () {
      this.$store.dispatch('condition/update', {
        id: this.condition.id,
        name: this.name,
      })
      this.isEditing = false
    },
  },
}
</script>
