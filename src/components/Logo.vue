<template>
  <img :src="logo" alt="incwadi" v-if="logo" />
</template>

<script>
export default {
  name: 'logo',
  data() {
    return {
      logo: null,
    }
  },
  created: function () {
    return process.env.LOGO !== 'false'
      ? import('../../' + process.env.LOGO).then(
          (logo) => (this.logo = logo.default)
        )
      : null
  },
}
</script>
