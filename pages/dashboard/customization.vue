<template>
  <div class="dashboard_container">
    <BreadCrumbs lastItemName="Личный кабинет" />
    <div class="customization l-wrap">
      <DashboardNavMenu v-if="$device.isDesktop" />
      <CustomizationDashboard />
    </div>
  </div>
</template>

<script>
import DashboardNavMenu from '@/components/sections/DashboardNavMenu.vue';
import CustomizationDashboard from '@/components/sections/dashboard-sections/CustomizationDashboard.vue';
import BreadCrumbs from "@/components/molecules/BreadCrumbs.vue";

export default {
  middleware: 'auth',
  name: 'Customization',
  components: {
    DashboardNavMenu,
    CustomizationDashboard,
    BreadCrumbs,
  },
}
</script>

<style lang="scss" scoped>
  .customization {
    min-height: 80vh;
    display: flex;
    /deep/.dashboard-nav-menu__customization {
      background: #D4E3F6;
    }

  }
</style>
