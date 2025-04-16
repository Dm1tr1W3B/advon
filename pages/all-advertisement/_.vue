<template>
  <div class="all-advertisement l-wrap">
    <div>
      <AllAdvertisementAuthor />
    </div>
  </div>
</template>

<script>
import AllAdvertisementAuthor from '@/components/sections/user-sections/AllAdvertisementAuthor.vue'

export default {
  name: "AllAdvertisement",
  data() {
    return {
    };
  },
  components: {
    AllAdvertisementAuthor,
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.all-advertisement {
}
</style>
