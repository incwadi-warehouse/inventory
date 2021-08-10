import { edit, show as showAction } from './../api/reservation'
import { ref, onMounted, computed } from '@vue/composition-api'

export default function useReservationUpdate(reservation) {
  let reservationDate = ref(null)
  let reservationTime = ref(null)
  let notes = ref(reservation.notes)
  let books = computed(() => {
    let _books = []
    reservation.books.forEach((element) => {
      _books.push(element.id)
    })

    return _books.join(',')
  })

  const collection = () => {
    if (null === reservationDate.value || null === reservationTime.value) {
      return null
    }
    let date = new Date(reservationDate.value + ' ' + reservationTime.value)
    return date.getTime() / 1000
  }

  const update = () => {
    edit(reservation.id, {
      notes: notes.value,
      collection: collection(),
      books: books.value,
    })
  }

  const show = (id) => {
    showAction(id)
  }

  onMounted(() => {
    let date = new Date(reservation.collection * 1000)
    let month = date.getMonth()
    month++
    if (month <= 9) {
      month = '0' + month
    }
    let day = date.getDate()
    if (day <= 9) {
      day = '0' + day
    }

    reservationDate.value = date.getFullYear() + '-' + month + '-' + day
    let hours = date.getHours()
    if (hours <= 9) {
      hours = '0' + hours
    }
    reservationTime.value = hours + ':' + date.getMinutes()
  })

  return {
    reservationDate,
    reservationTime,
    notes,
    books,
    show,
    update,
  }
}
