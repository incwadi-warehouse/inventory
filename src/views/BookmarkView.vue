<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('bookmarks') }}</h1>
      <p>{{ $t('bookmarksDesc') }}</p>
    </b-container>

    <b-container size="m">
      <bookmark-list
        :bookmarks="bookmark.state.bookmarks"
        @remove-bookmark="bookmark.remove"
        @update-bookmark="bookmark.update"
      />
    </b-container>

    <b-container size="m">
      <bookmark-create @create-bookmark="bookmark.create" />
    </b-container>
  </article>
</template>

<script>
import BookmarkList from '@/components/bookmark/List'
import BookmarkCreate from '@/components/bookmark/Create'
import useBookmark from '@/composables/useBookmark'

export default {
  name: 'bookmark-view',
  head: {
    title: 'Bookmark Manager',
  },
  components: {
    BookmarkList,
    BookmarkCreate,
  },
  setup() {
    const bookmark = useBookmark()

    return { bookmark }
  },
}
</script>
