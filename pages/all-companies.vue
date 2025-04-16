<template>
  <div class="all-companies">
    <AllCompaniesList />
  </div>
</template>

<script>
import AllCompaniesList from '@/components/sections/user-sections/AllCompaniesList.vue'

export default {
  name: 'AllCompanies',
  components: {
    AllCompaniesList
  },
};
</script>

<style lang="scss" scoped>
.footer {

}
</style>
