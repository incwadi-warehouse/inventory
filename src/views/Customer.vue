<template>
  <section>
    <list/>
    <edit/>
  </section>
</template>

<script>
import List from '../components/Customer'
import Edit from '../components/EditCustomer'

export default {
  name: 'customer-view',
  components: {
    List,
    Edit
  }
}
</script>
