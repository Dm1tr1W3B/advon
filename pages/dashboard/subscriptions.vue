<template>
  <div class="dashboard_container">
    <BreadCrumbs lastItemName="Личный кабинет" />
    <div class="dashboard-my-company l-wrap">
      <DashboardNavMenu v-if="$device.isDesktop" />
      <SubscriptionsDashboard />
    </div>
  </div>
</template>

<script>
import DashboardNavMenu from '@/components/sections/DashboardNavMenu.vue';
import SubscriptionsDashboard from '@/components/sections/dashboard-sections/SubscriptionsDashboard.vue';
import BreadCrumbs from "@/components/molecules/BreadCrumbs.vue";

export default {
  middleware: 'auth',
  name: 'Subscriptions',
  components: {
    DashboardNavMenu,
    SubscriptionsDashboard,
    BreadCrumbs,
  },
}
</script>

<style lang="scss" scoped>
  .dashboard-my-company {
    min-height: 80vh;
    display: flex;
    /deep/.dashboard-nav-menu__subscriptions {
      background: #D4E3F6;
    }
  }

  @media (max-width: $break-xlg) {
    .dashboard-my-company {
      min-height: 70vh;
    }
  }

  @media (max-width: $break-sm) {
    .dashboard-my-company {
      min-height: 58vh;
    }
  }
</style>
