<template>
  <div class="dashboard_container">
    <BreadCrumbs lastItemName="Личный кабинет" />
    <div class="my-page l-wrap">
      <MyPageDashboard />
    </div>
  </div>
</template>

<script>
import MyPageDashboard from '@/components/sections/dashboard-sections/MyPageDashboard.vue';
import BreadCrumbs from "@/components/molecules/BreadCrumbs.vue";

export default {
  middleware: 'auth',
  name: 'Dashboard',
  components: {
    MyPageDashboard,
    BreadCrumbs,
  },
}
</script>

<style lang="scss" scoped>
  .my-page {

  }
</style>