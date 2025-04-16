<template>
  <div class="company-detail l-wrap">
    <div>
      <CompanyDetailList />
    </div>
  </div>
</template>

<script>
import CompanyDetailList from '@/components/sections/user-sections/CompanyDetailList.vue'

export default {
  name: "CompanyDetail",
  data() {
    return {
    };
  },
  components: {
    CompanyDetailList,
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.company-detail {
}
</style>
