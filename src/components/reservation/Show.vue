<template>
  <div class="reservation">
    <p>
      {{ $t('createdAt') }}: {{ toLocaleDateString(reservation.createdAt) }}
    </p>

    <ul>
      <li v-for="book in reservation.books" :key="book.id">
        <router-link :to="{ name: 'book', params: { bookId: book.id } }">
          {{ book.title }} - {{ book.genre.name }} - {{ book.author.surname }},
          {{ book.author.firstname }}
          <span v-if="book.sold"> - {{ $t('sold') }}</span>
          <span v-if="book.removed"> - {{ $t('removed') }}</span>
        </router-link>
      </li>
    </ul>
    <b-form-input type="hidden" id="books" v-model="state.books" />

    <b-form @submit.prevent="update">
      <b-form-group>
        <b-form-item>
          <b-form-label for="date">
            {{ $t('date') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="date" id="date" v-model="state.date" />
        </b-form-item>
      </b-form-group>

      <b-form-group>
        <b-form-item>
          <b-form-label for="time">
            {{ $t('time') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="time" id="time" v-model="state.time" />
        </b-form-item>
      </b-form-group>

      <b-form-group>
        <b-form-item>
          <b-form-label for="notes">{{ $t('notes') }}</b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-textarea id="notes" v-model="state.notes" />
        </b-form-item>
      </b-form-group>

      <b-form-group buttons>
        <b-form-item>
          <b-button design="text" type="button" @click="shareByMail"
            >Mail (experiment)</b-button
          >
          <b-button
            type="button"
            design="outline_danger"
            @click="$emit('remove', reservation.id)"
            :style="{ marginRight: '10px' }"
          >
            {{ $t('delete') }}
          </b-button>
          <b-button design="outline">{{ $t('save') }}</b-button>
        </b-form-item>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/composition-api'
import i18n from '@/i18n'

export default {
  name: 'reservation-show',
  props: {
    reservation: Object,
  },
  setup(props, { emit }) {
    const state = reactive({
      date: null,
      time: null,
      notes: props.reservation.notes,
      books: computed(() => {
        let list = []
        props.reservation.books.forEach((element) => {
          list.push(element.id)
        })
        return list.join(',')
      }),
      collection: computed(() => {
        let date = new Date(state.date + ' ' + state.time + 'Z')
        return date.getTime() / 1000
      }),
    })

    const update = () => {
      emit('update', {
        id: props.reservation.id,
        collection: state.collection,
        notes: state.notes,
        books: state.books,
      })
    }

    onMounted(() => {
      setCollection()
    })

    const setCollection = () => {
      if (null === props.reservation.collection) return

      let date = new Date(props.reservation.collection * 1000)

      let month = formatNumber(date.getMonth() + 1)
      let day = formatNumber(date.getDate())
      state.date = date.getFullYear() + '-' + month + '-' + day

      let hours = formatNumber(date.getHours())
      let minutes = formatNumber(date.getMinutes())
      state.time = hours + ':' + minutes
    }

    const formatNumber = (number) => {
      if (number <= 9) {
        return '0' + number
      }
      return number
    }

    const toLocaleDateString = (data) => {
      let date = new Date(data * 1000)
      return date.toLocaleString()
    }

    const shareByMail = () => {
      let content =
        'mailto:' +
        '?subject=' +
        i18n.t('your_reservation') +
        '&body=' +
        state.notes +
        '%0d%0a'

      props.reservation.books.forEach((element) => {
        content +=
          '%0d%0a' +
          element.title +
          ' - ' +
          element.author.surname +
          ', ' +
          element.author.firstname +
          '%0d%0a'
      })

      window.open(content)
    }

    return {
      state,
      update,
      toLocaleDateString,
      shareByMail,
    }
  },
}
</script>

<style scoped>
.reservation {
  border-bottom: 1px solid var(--color-neutral-02);
}
</style>
