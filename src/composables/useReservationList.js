import { ref, onMounted } from '@vue/composition-api'
import { list } from './../api/reservation'

export default function useReservationList() {
  let reservations = ref([])
  let isLoading = ref(true)

  const getList = () => {
    list()
      .then((response) => {
        reservations.value = response.data
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  onMounted(getList)

  return { reservations, isLoading, getList }
}
