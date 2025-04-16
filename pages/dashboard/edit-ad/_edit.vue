<template>
  <div class="edit-ad l-wrap">
    <DashboardNavMenu v-if="$device.isDesktop"/>
    <EditAdForm />
  </div>
</template>

<script>
import DashboardNavMenu from '@/components/sections/DashboardNavMenu.vue';
import EditAdForm from '@/components/forms/EditAdForm.vue';

export default {
  middleware: 'auth',
  name: 'EditAd',
  components: {
    DashboardNavMenu,
    EditAdForm,
  },
}
</script>

<style lang="scss" scoped>
  .edit-ad {

    display: flex;
  }
</style>
