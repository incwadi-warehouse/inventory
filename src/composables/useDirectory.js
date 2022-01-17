import { onMounted, reactive, watch } from '@vue/composition-api'
import api from '@/api/directory'

export default function useDirectory() {
  const state = reactive({
    elements: null,
    dir: './',
    isLoading: false,
  })

  const list = () => {
    state.isLoading = true
    api
      .list({ dir: state.dir })
      .then((response) => {
        state.elements = response.data
      })
      .finally(() => {
        state.isLoading = false
      })
  }

  const useCover = (id, url) => {
    return api.cover(id, url)
  }

  onMounted(list)

  watch(() => state.dir, list)

  return {
    state,
    list,
    useCover,
  }
}
