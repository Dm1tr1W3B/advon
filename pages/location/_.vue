<template>
  <div class="location l-wrap">
    <LocationSection />
  </div>
</template>

<script>
import LocationSection from '@/components/sections/user-sections/LocationSection.vue'

export default {
  name: "Location",
  data() {
    return {
    };
  },
  components: {
    LocationSection,
  },
};
</script>

<style lang="scss" scoped>
.location {
}
</style>
