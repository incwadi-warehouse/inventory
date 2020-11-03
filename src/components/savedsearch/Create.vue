<template>
  <b-form>
    <b-form-group>
      <b-form-item>
        <b-form-label for="name" hidden>
          {{ $t('name_of_saved_search') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input
          type="text"
          id="name"
          :placeholder="$t('name_of_saved_search')"
          v-model="name"
        />
      </b-form-item>
    </b-form-group>
    <b-form-group buttons>
      <b-form-item>
        <b-button design="outline" @click.prevent="create">
          {{ $t('save_search') }}
        </b-button>
      </b-form-item>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  name: 'create-savedsearch',
  data() {
    return {
      name: null,
    }
  },
  methods: {
    create: function () {
      this.$store.dispatch('savedsearch/create', {
        name: this.name,
      })
      this.name = null
    },
  },
}
</script>
