<template>
  <div class="history l-wrap">
    <DashboardNavMenu v-if="$device.isDesktop" />
    <HistorySection />
  </div>
</template>

<script>
import DashboardNavMenu from '@/components/sections/DashboardNavMenu.vue';
import HistorySection from '@/components/sections/dashboard-sections/HistorySection.vue';

export default {
  name: 'Dashboard',
  components: {
    DashboardNavMenu,
    HistorySection,
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
