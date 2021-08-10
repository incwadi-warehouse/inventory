import { computed, onMounted, reactive } from '@vue/composition-api'
import { list, create, edit } from '@/api/inventory'

export default function useInventory() {
  const state = reactive({
    inventories: [],
    hasActiveInventory: computed(() => {
      let active = false
      state.inventories.forEach((element) => {
        if (null === element.endedAt) {
          active = true
        }
      })
      return active
    }),
  })

  const listInventories = () => {
    list().then((response) => {
      state.inventories = response.data
    })
  }

  onMounted(listInventories)

  const createInventory = () => {
    create().then(() => {
      listInventories()
    })
  }

  const endInventory = (id) => {
    const endedAt = Date.now() / 1000
    edit(id, { endedAt }).then(() => {
      listInventories()
    })
  }

  return { state, createInventory, endInventory }
}
