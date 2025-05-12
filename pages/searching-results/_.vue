<template>
  <div class="searching-results-section container">
    <SearchingResultsSection />
  </div>
</template>

<script>
import SearchingResultsSection from '@/components/sections/user-sections/SearchingResultsSection.vue'

export default {
  name: "SearchingResults",
  data() {
    return {
    };
  },
  components: {
    SearchingResultsSection,
  },
};
</script>

<style lang="scss" scoped>
.searching-results-section {
}
</style>
