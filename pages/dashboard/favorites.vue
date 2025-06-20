<template>
  <div class="dashboard_container">
    <BreadCrumbs lastItemName="Личный кабинет" />
    <div class="dashboard-favorites container">
      <DashboardNavMenu v-if="$device.isDesktop" />
      <Favorites />
    </div>
  </div>
</template>

<script>
import DashboardNavMenu from '@/components/sections/DashboardNavMenu.vue';
import Favorites from '@/components/sections/dashboard-sections/Favorites.vue';
import BreadCrumbs from "@/components/molecules/BreadCrumbs.vue";

export default {
  middleware: 'auth',
  name: 'DashboardFavorites',
  components: {
    DashboardNavMenu,
    Favorites,
    BreadCrumbs,
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
