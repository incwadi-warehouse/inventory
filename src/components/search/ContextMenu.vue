<template>
  <b-dropdown>
    <template #selector>
      <span v-tooltip.left="$t('options')">
        <b-icon type="more" />
      </span>
    </template>
    <b-dropdown-item icon="pencil" @click="edit(book.id)">
      {{ $t('edit') }}
    </b-dropdown-item>
    <b-dropdown-item icon="sell" @click="sell(book)" v-if="!book.sold">
      {{ $t('sell') }}
    </b-dropdown-item>
    <b-dropdown-item icon="bin" @click="remove(book)" v-if="!book.removed">
      {{ $t('remove') }}
    </b-dropdown-item>
    <b-dropdown-item
      icon="bookmark"
      @click="reserve(book)"
      v-if="!book.reserved"
    >
      {{ $t('reserve') }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'context-menu-search',
  props: {
    book: Object,
  },
  methods: {
    ...mapActions('book', ['sell', 'remove', 'reserve']),
    edit(id) {
      this.$router.push({ name: 'book', params: { bookId: id } })
    },
  },
}
</script>
