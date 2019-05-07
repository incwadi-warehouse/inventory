<template>
  <section>
    <list/>
    <edit/>
  </section>
</template>

<script>
import List from '../components/customer/List'
import Edit from '../components/customer/Create'

export default {
  name: 'customer-view',
  components: {
    List,
    Edit
  }
}
</script>
