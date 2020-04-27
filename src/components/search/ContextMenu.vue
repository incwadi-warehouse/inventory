<template>
  <b-dropdown>
    <template #selector>
      <b-icon-more />
    </template>
    <b-dropdown-item>
      <router-link :to="{ name: 'edit', params: { id: book.id } }">
        {{ $t('edit') }}
      </router-link>
    </b-dropdown-item>
    <b-dropdown-item v-if="!book.sold">
      <b-button type="text" class="dropdown_btn" @click="sell(book)">
        {{ $t('sell') }}
      </b-button>
    </b-dropdown-item>
    <b-dropdown-item v-if="!book.removed">
      <b-button type="text" class="dropdown_btn" @click="remove(book)">
        {{ $t('remove') }}
      </b-button>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'contextMenu',
  props: {
    book: Object
  },
  methods: {
    ...mapActions('book', ['sell', 'remove'])
  }
}
</script>
