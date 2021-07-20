<template>
  <b-modal>
    <b-container size="m">
      <slot />
    </b-container>

    <template #footer>
      <b-form-group buttons>
        <b-button
          design="outline"
          :style="{ marginRight: '10px' }"
          @click="$emit('confirm-no')"
        >
          {{ $t('no') }}
        </b-button>
        <b-button design="primary" @click="$emit('confirm-yes')">
          {{ $t('yes') }}
        </b-button>
      </b-form-group>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'confirm',
}
</script>
