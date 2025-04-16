<template>
  <div class="increase-limit l-wrap">
    <DashboardNavMenu v-if="$device.isDesktop" />
    <Limit />
  </div>
</template>

<script>
import DashboardNavMenu from '@/components/sections/DashboardNavMenu.vue';
import Limit from '@/components/sections/dashboard-sections/Limit.vue';

export default {
  name: 'IncreaseLimit',
  components: {
    DashboardNavMenu,
    Limit,
  },
}
</script>

<style lang="scss" scoped>
  .increase-limit {

    display: flex;
  }
</style>
