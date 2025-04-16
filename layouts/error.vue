<template>
  <div class="page-not-found">
    <div v-if="error.statusCode === 404" class="page-not-found__container">
      <PageNotFound />
      <div class="page-not-found__back">
        Перейти на
        <NuxtLink to="/">Главную</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import PageNotFound from "@/assets/images/404.svg?inline";
export default {
  props: ["error"],
  layout: "default", // you can set a custom layout for the error page
  components: {
    PageNotFound,
  },
};
</script>

<style lang="scss" scoped>
.page-not-found {
  min-height: 80vh;
  display: flex;
  justify-content: center;

  &__container {
    position: relative;
  }

  &__back {
    position: relative;
    bottom: 140px;
    left: 250px;
    color: $mainThirdColor;
    font-size: $g-font-second-size;

    a {
      color: $mainColor;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>