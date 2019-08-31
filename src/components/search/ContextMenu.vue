<template>
  <span>
    <button class="btn btn_text" @click="toggleContextMenu">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25.000001 25.000001"
        class="icon"
      >
        <path d="M10 2h5v5h-5zm0 16h5v5h-5zm0-8h5v5h-5z" />
      </svg>
    </button>
    <ul
      class="contextMenu"
      :style="style"
      v-if="showContextMenu"
      @mouseleave="closeContextMenu"
    >
      <li class="contextMenu_item">
        <router-link :to="{ name: 'edit', params: { id: book.id } }">
          {{ $t('edit') }}
        </router-link>
      </li>
      <li class="contextMenu_item">
        <button class="contextMenu_btn" @click="sell(book)" v-if="!book.sold">
          {{ $t('sell') }}
        </button>
      </li>
      <li class="contextMenu_item">
        <button
          class="contextMenu_btn"
          @click="remove(book)"
          v-if="!book.removed"
        >
          {{ $t('remove') }}
        </button>
      </li>
      <li class="contextMenu_item">
        <button class="contextMenu_btn" @click="closeContextMenu">
          {{ $t('close') }}
        </button>
      </li>
    </ul>
  </span>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'contextMenu',
  props: ['book'],
  data() {
    return {
      showContextMenu: false,
      style: {}
    }
  },
  methods: {
    toggleContextMenu: function(event) {
      this.showContextMenu = !this.showContextMenu
      this.style = {
        display: 'block',
        top: event.clientY + 'px',
        left: event.clientX - 200 + 'px'
      }
    },
    closeContextMenu: function() {
      this.showContextMenu = false
    },
    ...mapActions('book', ['sell', 'remove'])
  }
}
</script>
