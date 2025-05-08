<template>
  <div class="create-ad container">
    <DashboardNavMenu v-if="$device.isDesktop" />
    <CreateAdForm />
  </div>
</template>

<script>
import DashboardNavMenu from '@/components/sections/DashboardNavMenu.vue';
import CreateAdForm from '@/components/forms/CreateAdForm.vue';

export default {
  middleware: 'auth',
  name: 'CreateAd',
  components: {
    DashboardNavMenu,
    CreateAdForm,
  },
}
</script>

<style lang="scss" scoped>
  .create-ad {

    display: flex;
  }
</style>
