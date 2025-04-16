<template>
  <div class="my-page l-wrap">
    <MyPageDashboard />
  </div>
</template>

<script>
import MyPageDashboard from '@/components/sections/dashboard-sections/MyPageDashboard.vue';

export default {
  middleware: 'auth',
  name: 'Dashboard',
  components: {
    MyPageDashboard,
  },
}
</script>

<style lang="scss" scoped>
  .my-page {

  }
</style>