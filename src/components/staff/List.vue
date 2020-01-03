<template>
  <section class="container container_m">
    <div class="card">
      <div class="card_item" v-for="member in staff" :key="member.id">
        <ul class="card_options" v-if="isAdmin">
          <li class="card_option">
            <button
              class="card_option_btn"
              :title="$t('remove')"
              @click="remove(member.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 50 50"
                class="icon"
              >
                <path
                  d="M11.2 2v8H2v6h46v-6h-7.36V2zm3.68 4h22.08v4H14.88zM7.52 18v30h34.96V18z"
                />
              </svg>
            </button>
          </li>
        </ul>
        <edit-staff :staff="member" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import EditStaff from './Edit'

export default {
  name: 'list',
  components: {
    EditStaff
  },
  computed: {
    ...mapGetters('user', ['isAdmin']),
    ...mapState('staff', ['staff'])
  },
  methods: {
    ...mapActions('staff', ['remove'])
  },
  created: function() {
    this.$store.dispatch('staff/staff')
  }
}
</script>
