<template>
  <div class="create-company container">
    <DashboardNavMenu v-if="$device.isDesktop" />
    <CreateCompany />
  </div>
</template>

<script>
import DashboardNavMenu from '@/components/sections/DashboardNavMenu.vue';
import CreateCompany from '@/components/sections/dashboard-sections/CreateCompany.vue';

export default {
  name: 'Dashboard',
  components: {
    DashboardNavMenu,
    CreateCompany,
  },
}
</script>

<style lang="scss" scoped>
  .create-company {
      display: flex;
  }
  .create-company {
    width: 100%;
  }
</style>
