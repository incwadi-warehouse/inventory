<template>
  <b-form @submit.prevent="create">
    <b-form-group>
      <b-form-item>
        <b-form-label for="reservationDate">
          {{ $t('reservationDate') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input
          type="date"
          id="reservationDate"
          v-model="reservationDate"
        />
      </b-form-item>
    </b-form-group>

    <b-form-group>
      <b-form-item>
        <b-form-label for="reservationTime">
          {{ $t('reservationTime') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input
          type="time"
          id="reservationTime"
          v-model="reservationTime"
        />
      </b-form-item>
    </b-form-group>

    <b-form-group>
      <b-form-item>
        <b-form-label for="notes">{{ $t('notes') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-textarea id="notes" v-model="notes" />
      </b-form-item>
    </b-form-group>

    <b-form-group>
      <b-form-item>
        <b-form-label for="books">
          {{ $t('books') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input type="hidden" id="books" v-model="books" />
        <ul>
          <li v-for="book in cart" :key="book.id">
            <router-link :to="{ name: 'book', params: { bookId: book.id } }">
              {{ book.title }}
            </router-link>
          </li>
        </ul>
      </b-form-item>
    </b-form-group>

    <b-form-group buttons>
      <b-form-item>
        <b-button design="primary">{{ $t('save') }}</b-button>
      </b-form-item>
    </b-form-group>
  </b-form>
</template>

<script>
import { onMounted } from '@vue/composition-api'
import useReservationCreate from './../../composables/useReservationCreate'
import useCart from './../../composables/useCart'

export default {
  name: 'create',
  setup(props, { emit }) {
    const {
      create,
      reservationDate,
      reservationTime,
      notes,
      books,
      addBook,
    } = useReservationCreate(emit)
    const { cart, listCart } = useCart()
    listCart()

    onMounted(() => {
      addBook(cart)
    })

    return {
      cart,
      create,
      reservationDate,
      reservationTime,
      notes,
      listCart,
      books,
    }
  },
}
</script>
