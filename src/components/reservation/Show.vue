<template>
  <div class="reservation_item">
    <p>
      ID: {{ reservation.id }} - {{ $t('createdAt') }}:
      {{ localeDateString(reservation.createdAt) }}
    </p>

    <ul>
      <li v-for="book in reservation.books" :key="book.id">
        <router-link :to="{ name: 'book', params: { bookId: book.id } }"
          >{{ book.title }} - {{ book.genre.name }} - {{ book.author.surname }},
          {{ book.author.firstname }}
          <span v-if="book.sold"> - {{ $t('sold') }}</span
          ><span v-if="book.removed"> - {{ $t('removed') }}</span></router-link
        >
      </li>
    </ul>

    <b-form-input type="hidden" id="books" v-model="books" />

    <b-form @submit.prevent="submit">
      <div class="date">
        <div class="date_item">
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
        </div>

        <div class="date_item">
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
        </div>
      </div>

      <b-form-group>
        <b-form-item>
          <b-form-label for="notes">{{ $t('notes') }}</b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-textarea id="notes" v-model="notes" />
        </b-form-item>
      </b-form-group>

      <b-form-group buttons>
        <b-form-item>
          <b-button
            type="button"
            design="outline_danger"
            v-if="me.isAdmin"
            @click="remove(reservation.id)"
          >
            {{ $t('delete') }}
          </b-button>
          <b-button design="primary">{{ $t('save') }}</b-button>
        </b-form-item>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import useReservationShow from './../../composables/useReservationShow'
import useReservationUpdate from './../../composables/useReservationUpdate'
import useReservationRemove from './../../composables/useReservationRemove'

export default {
  name: 'show',
  props: {
    reservation: Object,
    me: Object,
  },
  setup(props, { emit }) {
    const { localeDateString } = useReservationShow()
    const {
      reservationDate,
      reservationTime,
      notes,
      books,
      update,
    } = useReservationUpdate(props.reservation)
    const { remove } = useReservationRemove(emit)

    return {
      reservationDate,
      reservationTime,
      notes,
      books,
      update,
      remove,
      localeDateString,
    }
  },
  computed: {},
  methods: {
    submit() {
      this.update()
    },
  },
}
</script>

<style scoped>
.date {
  display: flex;
}
.date_item {
  width: 50%;
  margin-bottom: 20px;
}
.date_item:first-of-type {
  margin-right: 10px;
}
.date_item:last-of-type {
  margin-left: 10px;
}
</style>
