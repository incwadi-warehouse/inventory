<template>
  <b-dropdown>
    <template #selector>
      <b-icon type="more" />
    </template>
    <b-dropdown-item :title="$t('edit')" icon="pencil" @click="edit(book.id)" />
    <b-dropdown-item
      :title="$t('sell')"
      icon="minus"
      @click="sell(book)"
      v-if="!book.sold"
    />
    <b-dropdown-item
      :title="$t('remove')"
      icon="bin"
      @click="remove(book)"
      v-if="!book.removed"
    />
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
    ...mapActions('book', ['sell', 'remove']),
    edit: function(id) {
      this.$router.push({ name: 'edit', params: { id: id } })
    }
  }
}
</script>
