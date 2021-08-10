import { ref, computed } from '@vue/composition-api'
import { create as createAction } from './../api/reservation'

export default function useReservationCreate(emit) {
  let reservationDate = ref(null)
  let reservationTime = ref(null)
  let notes = ref(null)
  let books = ref(null)

  const collection = computed(() => {
    let date = new Date(
      reservationDate.value + ' ' + reservationTime.value + 'Z'
    )
    return date.getTime() / 1000
  })

  const addBook = (book) => {
    if (null === book) return
    let ids = []
    book.forEach((element) => {
      return ids.push(element.id)
    })
    books.value = ids.join()
  }

  const create = () => {
    createAction({
      collection: collection.value,
      notes: notes.value,
      books: books.value !== null ? books.value : undefined,
    }).then(() => {
      emit('created')
      reservationDate.value = null
      reservationTime.value = null
      notes.value = null
      books.value = null
    })
  }

  return {
    reservationDate,
    reservationTime,
    notes,
    books,
    create,
    addBook,
  }
}
