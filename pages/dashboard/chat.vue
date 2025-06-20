<template>
  <div class="dashboard_container">
    <BreadCrumbs lastItemName="Личный кабинет" />
    <div class="chat container">
      <DashboardNavMenu v-if="$device.isDesktop"/>
      <ChatDashboard />
    </div>
  </div>
</template>

<script>
import DashboardNavMenu from "@/components/sections/DashboardNavMenu.vue";
import ChatDashboard from "@/components/sections/dashboard-sections/ChatDashboard.vue";
import BreadCrumbs from "@/components/molecules/BreadCrumbs.vue";

export default {
  middleware: "auth",
  name: "DashboardBonusDashboard",
  components: {
    DashboardNavMenu,
    ChatDashboard,
    BreadCrumbs,
  },
};
</script>

<style lang="scss" scoped>
.chat {
  min-height: 80vh;
  display: flex;

  /deep/.dashboard-nav-menu__chat {
    background: #d4e3f6;
  }
}

@media (max-width: $break-xlg) {
  .chat {
    min-height: 70vh;
  }
}

@media (max-width: $break-sm) {
  .chat {
    min-height: 58vh;
  }
}
</style>
