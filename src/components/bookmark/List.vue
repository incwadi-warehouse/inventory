<template>
  <div v-if="bookmarks">
    <b-list v-for="bookmark in bookmarks" :key="bookmark.id">
      <template #title>
        <bookmark-name
          :bookmark="bookmark"
          @update-bookmark="$emit('update-bookmark', $event)"
        />
      </template>

      <template #options>
        <b-dropdown>
          <template #selector>
            <b-icon type="more" />
          </template>
          <b-dropdown-item
            icon="bin"
            @click="$emit('remove-bookmark', bookmark.id)"
          >
            {{ $t('remove') }}
          </b-dropdown-item>
        </b-dropdown>
      </template>
    </b-list>
  </div>
</template>

<script>
import BookmarkName from '@/components/bookmark/Name'

export default {
  name: 'bookmark-list',
  components: {
    BookmarkName,
  },
  props: {
    bookmarks: Array,
  },
}
</script>
