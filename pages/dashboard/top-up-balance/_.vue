<template>
  <div class="top-up-balance l-wrap">
    <DashboardNavMenu v-if="$device.isDesktop" />
    <TopUpBalanceSection />
  </div>
</template>

<script>
import TopUpBalanceSection from "@/components/sections/dashboard-sections/TopUpBalanceSection.vue";
import DashboardNavMenu from "@/components/sections/DashboardNavMenu.vue";

export default {
  name: "TopUpBalance",
  data() {
    return {};
  },
  components: {
    TopUpBalanceSection,
    DashboardNavMenu,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.top-up-balance {
  display: flex;
}
</style>
