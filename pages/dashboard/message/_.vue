<template>
  <div class="message-page l-wrap">
    <DashboardNavMenu v-if="$device.isDesktop" />
    <Message />
  </div>
</template>

<script>
import DashboardNavMenu from '@/components/sections/DashboardNavMenu.vue';
import Message from '@/components/sections/dashboard-sections/Message.vue'

export default {
  name: 'MessagePage',
  data() {
    return {
    }
  },
  components: {
    DashboardNavMenu,
    Message,
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .message-page {
    min-height: 80vh;
    display: flex;
  }

  @media (max-width: $break-xlg) {
    .message-page {
      min-height: 70vw;
    }
  }

  @media (max-width: $break-sm) {
    .message-page {
      min-height: 58vw;
    }
  }
</style>
