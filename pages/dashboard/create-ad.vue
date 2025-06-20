<template>
  <div class="dashboard_container">
    <BreadCrumbs lastItemName="Личный кабинет" />
    <div class="create-ad container">
      <DashboardNavMenu v-if="$device.isDesktop" />
      <CreateAdForm />
    </div>
  </div>
</template>

<script>
import DashboardNavMenu from '@/components/sections/DashboardNavMenu.vue';
import CreateAdForm from '@/components/forms/CreateAdForm.vue';
import BreadCrumbs from "@/components/molecules/BreadCrumbs.vue";

export default {
  middleware: 'auth',
  name: 'CreateAd',
  components: {
    DashboardNavMenu,
    CreateAdForm,
    BreadCrumbs,
  },
}
</script>

<style lang="scss" scoped>
  .create-ad {

    display: flex;
  }
</style>
