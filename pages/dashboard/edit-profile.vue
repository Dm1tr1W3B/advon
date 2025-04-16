<template>
  <div class="dashboard-edit-profile l-wrap">
    <DashboardNavMenu v-if="$device.isDesktop" />
    <EditProfile />
  </div>
</template>

<script>
import DashboardNavMenu from '@/components/sections/DashboardNavMenu.vue';
import EditProfile from '@/components/sections/dashboard-sections/EditProfile.vue';

export default {
  middleware: 'auth',
  name: 'Dashboard',
  components: {
    DashboardNavMenu,
    EditProfile,
  },
}
</script>

<style lang="scss" scoped>
  .dashboard-edit-profile {

    display: flex;
    /deep/.dashboard-nav-menu__profile {
      background: #D4E3F6;
    }
  }
</style>
