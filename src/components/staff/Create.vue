<template>
  <b-container size="m">
    <h2>{{ $t('new') }}</h2>
    <b-form @submit.prevent="create">
      <div class="form_group">
        <div class="form_item">
          <label for="name" class="form_label">{{ $t('name') }}</label>
        </div>
        <div class="form_item">
          <input type="text" id="name" class="form_input" v-model="name" />
        </div>
      </div>
      <div class="form_group form_buttons">
        <div class="form_item">
          <b-button type="outline" @click.prevent="create" v-if="!isProcessing">
            {{ $t('create') }}
          </b-button>
          <b-button type="outline" v-if="isProcessing">
            <b-spinner size="s" />
          </b-button>
        </div>
      </div>
    </b-form>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'create-staff',
  computed: {
    name: {
      get: function() {
        return this.$store.state.staff.name
      },
      set: function(name) {
        this.$store.commit('staff/name', name)
      }
    },
    ...mapState('staff', ['isProcessing'])
  },
  methods: {
    ...mapActions('staff', ['create'])
  }
}
</script>
