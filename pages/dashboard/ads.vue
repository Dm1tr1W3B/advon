<template>
  <div class="dashboard-AdsDashboard l-wrap">
    <DashboardNavMenu v-if="$device.isDesktop" />
    <AdsDashboard />
  </div>
</template>

<script>
import DashboardNavMenu from '@/components/sections/DashboardNavMenu.vue';
import AdsDashboard from '@/components/sections/dashboard-sections/AdsDashboard.vue';

export default {
  middleware: 'auth',
  name: 'DashboardAdsDashboard',
  components: {
    DashboardNavMenu,
    AdsDashboard,
  },
}
</script>

<style lang="scss" scoped>
  .dashboard-AdsDashboard {
    min-height: 80vh;
    display: flex;
    /deep/.dashboard-nav-menu__ads {
      background: #D4E3F6;
    }
  }

  @media (max-width: $break-xlg) {
    .dashboard-AdsDashboard {
      min-height: 70vh;
    }
  }

  @media (max-width: $break-sm) {
    .dashboard-AdsDashboard {
      min-height: 70vh;
    }
  }
</style>
