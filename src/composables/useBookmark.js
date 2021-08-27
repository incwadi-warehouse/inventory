import { onBeforeUnmount, onMounted, reactive } from '@vue/composition-api'
import api from '@/api/bookmark'

export default function useBookmark() {
  const state = reactive({
    bookmarks: [],
  })

  const list = () => {
    api.list().then((response) => {
      state.bookmarks = response.data
    })
  }

  onMounted(list)

  const refresh = () => {
    state.refresh = setInterval(list, 5000)
  }

  onMounted(refresh)
  onBeforeUnmount(() => {
    clearInterval(state.refresh)
  })

  const create = (data) => {
    api.create(data).then(() => {
      list()
    })
  }

  const createFromPage = () => {
    api.create({ url: window.location.href }).then(() => {
      list()
    })
  }

  const open = (url) => {
    window.location.href = url
  }

  const remove = (id) => {
    api.remove(id).then(() => {
      list()
    })
  }

  const update = (data) => {
    api.update(data.id, data.bookmark).then(() => {
      list()
    })
  }

  return {
    state,
    create,
    createFromPage,
    open,
    remove,
    update,
  }
}
