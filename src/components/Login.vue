<template>
  <section class="section section_default">
    <form class="form" @submit.prevent="save">
      <div class="form_group">
        <div class="form_item">
          <label for="user">User</label>
        </div>
        <div class="form_item">
          <input type="text" id="user" class="form_input" placeholder="Username" v-model="user"/>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item">
          <label for="pass">Pass</label>
        </div>
        <div class="form_item">
          <input type="password" id="pass" class="form_input" placeholder="Password" v-model="pass"/>
        </div>
      </div>
      <div class="form_group">
        <div class="form_item alignRight">
          <button class="btn btn_branded" @click.prevent="save">Save</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      user: null,
      pass: null
    }
  },
  methods: {
    save: function () {
      localStorage.setItem('user', this.user)
      localStorage.setItem('pass', this.pass)
      this.$router.push({ name: 'index' })
    }
  },
  mounted: function () {
    this.user = localStorage.getItem('user')
    this.pass = localStorage.getItem('pass')
  }
}
</script>
