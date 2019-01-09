<template>
  <edit :id="id"/>
</template>

<script>
import Edit from '../components/Edit'

export default {
  name: 'edit-view',
  props: ['id'],
  components: {
    Edit
  }
}
</script>
