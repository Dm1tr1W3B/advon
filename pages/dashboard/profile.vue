<template>
  <div class="dashboard-profile container">
    <DashboardNavMenu v-if="$device.isDesktop" />
    <Profile />
  </div>
</template>

<script>
import DashboardNavMenu from '@/components/sections/DashboardNavMenu.vue';
import Profile from '@/components/sections/dashboard-sections/Profile.vue';

export default {
  middleware: 'auth',
  name: 'Dashboard',
  components: {
    DashboardNavMenu,
    Profile,
  },
}
</script>

<style lang="scss" scoped>
  .dashboard-profile {

    display: flex;
    /deep/.dashboard-nav-menu__profile {
      background: #D4E3F6;
    }
  }
</style>
