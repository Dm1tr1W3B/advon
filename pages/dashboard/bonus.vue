<template>
  <div class="dashboard-BonusDashboard l-wrap">
    <DashboardNavMenu v-if="$device.isDesktop" />
    <BonusDashboard />
  </div>
</template>

<script>
import DashboardNavMenu from '@/components/sections/DashboardNavMenu.vue';
import BonusDashboard from '@/components/sections/dashboard-sections/BonusDashboard.vue';

export default {
  middleware: 'auth',
  name: 'DashboardBonusDashboard',
  components: {
    DashboardNavMenu,
    BonusDashboard,
  },
}
</script>

<style lang="scss" scoped>
  .dashboard-BonusDashboard {
    min-height: 80vh;
    display: flex;
    /deep/.dashboard-nav-menu__bonus {
      background: #D4E3F6;
    }
  }

  @media (max-width: $break-xlg) {
    .dashboard-BonusDashboard {
      min-height: 70vh;
    }
  }

  @media (max-width: $break-sm) {
    .dashboard-BonusDashboard {
      min-height: 58vh;
    }
  }
</style>
