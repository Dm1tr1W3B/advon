<template>
  <div class="dashboard-favorites l-wrap">
    <DashboardNavMenu v-if="$device.isDesktop" />
    <Favorites />
  </div>
</template>

<script>
import DashboardNavMenu from '@/components/sections/DashboardNavMenu.vue';
import Favorites from '@/components/sections/dashboard-sections/Favorites.vue';

export default {
  middleware: 'auth',
  name: 'DashboardFavorites',
  components: {
    DashboardNavMenu,
    Favorites,
  },
}
</script>

<style lang="scss" scoped>
  .dashboard-favorites {
    min-height: 80vh;

    display: flex;
    /deep/.dashboard-nav-menu__favorites {
      background: #D4E3F6;
    }
  }

  @media (max-width: $break-xlg) {
    .dashboard-favorites {
      min-height: 70vh;
    }
  }

  @media (max-width: $break-sm) {
    .dashboard-favorites {
      min-height: 58vh;
    }
  }
</style>
