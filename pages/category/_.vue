<template>
  <div class="category-section container">
    <CategorySection />
  </div>
</template>

<script>
import CategorySection from '@/components/sections/user-sections/СategorySection.vue'

export default {
  name: "CompanyDetail",
  data() {
    return {
      categoryData: {},
    };
  },
  created() {
    //   this.getCompanyForGuest()
    // this.getItems ()
  },
  components: {
    CategorySection,
  },
  // async asyncData({ params, $http }) {
  //   const categoryData = await $http.$get(
  //     `https://api.advon.test.ut.in.ua/api/v1/getAdvertisementsByCategory/${params.pathMatch}`
  //   );
  //   return { categoryData }
  // },
  // async fetch() {
  //   this.categoryData = await this.$http
  //     .$get(
  //       "https://api.advon.test.ut.in.ua/api/v1/getAdvertisementsByCategory",
  //       {
  //         params: {
  //           category_key: 'this.$route.params.pathMatch',
  //         },
  //       }
  //     )
  // },
  //   methods: {
  //     async getItems () {
  //        let { data } = await this.$axios.get('https://api.advon.test.ut.in.ua/api/v1/getAdvertisementsByCategory',{
  //            params: {
  //                category_key: this.$route.params.pathMatch,
  //            }
  //        })
  //        this.categoryData = data
  //     }
  // //     async getCompanyForGuest() {
  //       try {
  //         await this.$axios
  //           .get("/getAdvertisementsByCategory", {
  //             params: {
  //               category_key: this.$route.params.pathMatch,
  //             },
  //           })
  //           .then((res) => {
  //             this.categoryData = res.data.data;
  //           });
  //       } catch (e) {
  //         this.error = e.response.data;
  //       }
  //     },
  //   },
};
</script>

<style lang="scss" scoped>
.category-section {
}
</style>
