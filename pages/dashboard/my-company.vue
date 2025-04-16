<template>
  <div class="dashboard-my-company l-wrap">
    <DashboardNavMenu v-if="$device.isDesktop" />
    <MyCompany />
  </div>
</template>

<script>
import DashboardNavMenu from '@/components/sections/DashboardNavMenu.vue';
import MyCompany from '@/components/sections/dashboard-sections/MyCompany.vue';

export default {
  middleware: 'auth',
  name: 'Dashboard',
  components: {
    DashboardNavMenu,
    MyCompany,
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
