<template>
  <header class="header">
    <div class="header_left">
      <div class="header_item">
        incwadi
      </div>
    </div>
    <div class="header_right">
      <div class="header_item">
        <navigation/>
      </div>
    </div>
  </header>
</template>

<script>
import Navigation from './Navigation'

export default {
  name: 'heading',
  components: {
    Navigation
  }
}
</script>
