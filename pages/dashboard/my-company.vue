<template>
  <div class="dashboard_container">
    <BreadCrumbs lastItemName="Личный кабинет" />
    <div class="dashboard-my-company container">
      <DashboardNavMenu v-if="$device.isDesktop" />
      <MyCompany />
    </div>
  </div>
</template>

<script>
import DashboardNavMenu from '@/components/sections/DashboardNavMenu.vue';
import MyCompany from '@/components/sections/dashboard-sections/MyCompany.vue';
import BreadCrumbs from "@/components/molecules/BreadCrumbs.vue";

export default {
  middleware: 'auth',
  name: 'Dashboard',
  components: {
    DashboardNavMenu,
    MyCompany,
    BreadCrumbs
  },
}
</script>

<style lang="scss" scoped>
  .dashboard-my-company {

    display: flex;
    /deep/.dashboard-nav-menu__my-company {
      background: #D4E3F6;
    }
  }
</style>
