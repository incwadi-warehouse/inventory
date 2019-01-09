<template>
  <detail :id="id"/>
</template>

<script>
import Detail from '../components/Detail'

export default {
  name: 'detail-view',
  props: ['id'],
  components: {
    Detail
  }
}
</script>
