<template>
  <div class="product">
      <MainAdv  />
  </div>
</template>

<script>
// import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
// import SmallCard from "@/components/molecules/SmallCard.vue";
import MainAdv from "@/components/sections/user-sections/MainAdv.vue";
// import VueSlickCarousel from "vue-slick-carousel";
// import "vue-slick-carousel/dist/vue-slick-carousel.css";
// import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "Product",
  data() {
    return {
      mainAdvertisement: {},
      advertisementId: {},
    }
  },
  components: {
    MainAdv,
  },
  mounted() {
    this.showAdvertisement();
  },
  methods: {
    async showAdvertisement() {
      try {
        await this.$axios
          .get("/showAdvertisement", {
            params: {
              advertisement_id: this.$route.params.pathMatch,
            },
          })
          .then((res) => {
            this.mainAdvertisement = res.data.data;
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
</style>