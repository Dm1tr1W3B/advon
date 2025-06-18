<template>
  <div class="about container">
    <BreadCrumbs lastItemName="О нас" />
    <AboutUsPage />
  </div>
</template>

<script>
import AboutUsPage from '@/components/sections/pages/AboutUsPage.vue';
import BreadCrumbs from "@/components/molecules/BreadCrumbs.vue";

export default {
  name: 'aboutUs',
  data() {
    return {
    }
  },
  components: {
    AboutUsPage,
    BreadCrumbs,
  },
  methods: {
  }
}
</script>

