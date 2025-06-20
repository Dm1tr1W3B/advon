<template>
  <div class="dashboard_container">
    <BreadCrumbs lastItemName="Личный кабинет" />
    <div class="create-company container">
      <DashboardNavMenu v-if="$device.isDesktop" />
      <CreateCompany />
    </div>
  </div>
</template>

<script>
import DashboardNavMenu from '@/components/sections/DashboardNavMenu.vue';
import CreateCompany from '@/components/sections/dashboard-sections/CreateCompany.vue';
import BreadCrumbs from "@/components/molecules/BreadCrumbs.vue";

export default {
  name: 'Dashboard',
  components: {
    DashboardNavMenu,
    CreateCompany,
    BreadCrumbs,
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
