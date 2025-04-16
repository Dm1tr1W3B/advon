<template>
  <div class="notification">
    <div v-for="error in message" :key="error.id">
        {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    message: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss">
  .notification {
    color: #FF0303;
  }
</style>