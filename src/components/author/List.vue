<template>
  <section class="container container_m">
    <div class="card">
      <div class="card_item" v-for="author in authors" :key="author.id">
        <ul class="card_options" v-if="isAdmin">
          <li class="card_option">
            <button class="card_option_btn" :title="$t('remove')" @click="remove(author.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 50" class="icon">
                <path d="M11.2 2v8H2v6h46v-6h-7.36V2zm3.68 4h22.08v4H14.88zM7.52 18v30h34.96V18z"/>
              </svg>
            </button>
          </li>
        </ul>
        <div class="card_text">
          <router-link :to="{ name: 'edit-author', params: { id: author.id } }">
            {{author.surname}}, {{ author.firstname }}
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'author',
  computed: {
    ...mapGetters('user', [
      'isAdmin'
    ]),
    authors: function () {
      return this.$store.state.author.authors
    }
  },
  methods: {
    remove: function (id) {
      this.$store.dispatch('author/remove', id)
    }
  },
  created: function () {
    this.$store.dispatch('user/me')
  }
}
</script>
