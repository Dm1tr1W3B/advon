<template>
  <div class="dashboard_container">
    <BreadCrumbs lastItemName="Личный кабинет" />
    <div class="history container">
      <DashboardNavMenu v-if="$device.isDesktop" />
      <HistorySection />
    </div>
  </div>
</template>

<script>
import DashboardNavMenu from '@/components/sections/DashboardNavMenu.vue';
import HistorySection from '@/components/sections/dashboard-sections/HistorySection.vue';
import BreadCrumbs from "@/components/molecules/BreadCrumbs.vue";

export default {
  name: 'Dashboard',
  components: {
    DashboardNavMenu,
    HistorySection,
    BreadCrumbs,
  },
}
</script>

<style lang="scss" scoped>
  .history {

    display: flex;
    /deep/.dashboard-nav-menu__my-company {
      background: #D4E3F6;
    }
  }
</style>
