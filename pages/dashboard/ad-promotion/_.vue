<template>
  <div class="dashboard-ad-promotion l-wrap">
    <DashboardNavMenu v-if="$device.isDesktop" />
    <DashboardAdPromotion />
  </div>
</template>

<script>
import DashboardNavMenu from '@/components/sections/DashboardNavMenu.vue';
import DashboardAdPromotion from '@/components/sections/dashboard-sections/DashboardAdPromotion.vue';

export default {
  middleware: 'auth',
  name: 'adPromotion',
  components: {
    DashboardNavMenu,
    DashboardAdPromotion,
  },
}
</script>

<style lang="scss" scoped>
  .dashboard-ad-promotion {
    min-height: 80vh;
    display: flex;
  }

  @media (max-width: $break-xlg) {
    .dashboard-ad-promotion {
      min-height: 70vh;
    }
  }

  @media (max-width: $break-sm) {
    .dashboard-ad-promotion {
      min-height: 58vh;
    }
  }
</style>
