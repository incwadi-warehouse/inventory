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
      @click="reserveToCart(book)"
      v-if="!book.reserved"
    >
      {{ $t('cart') }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { mapActions } from 'vuex'
import useCart from './../../composables/useCart'

export default {
  name: 'context-menu-search',
  props: {
    book: Object,
  },
  setup(props, { emit }) {
    const { addCart } = useCart()

    const reserveToCart = (book) => {
      addCart(book)
      emit('cart')
    }

    return { reserveToCart }
  },
  methods: {
    ...mapActions('book', ['sell', 'remove']),
    edit(id) {
      this.$router.push({ name: 'book', params: { bookId: id } })
    },
  },
}
</script>
