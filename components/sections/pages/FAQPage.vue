<template>
  <div class="faq-page container">
<!--    <Search />-->
    <h1 class="faq-page__title">Ответы на часто задаваемые вопросы</h1>
    <div class="faq-page__container">
      <div class="left_part">
        <FaqImage v-if="$device.isDesktop" />
        <FaqImageMobile v-if="$device.isMobile" />
      </div>
      <div class="right_part">
        <CollapseItem v-for="item in dataLegal" :key="item.title" :title="item.title" :body="item.body" />
      </div>
    </div>
<!--    <ContactForm />-->
  </div>
</template>

<script>
import Search from "@/components/molecules/Search.vue";
import ContactForm from "@/components/forms/ContactForm.vue";
import CollapseItem from "@/components/molecules/CollapseItem.vue"
import FaqImage from "@/assets/images/FAQ.svg?inline";
import FaqImageMobile from "@/assets/images/FAQ_mobile.svg?inline";

export default {
  name: "FAQPage",
  components: {
    Search,
    ContactForm,
    CollapseItem,
    FaqImage,
    FaqImageMobile,
  },
  data() {
    return {
      dataLegal: [
        {
          title:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostruLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru"
        },
        {
          title:
            "1Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostruLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru"
        },
        {
          title:
            "2Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostruLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru"
        },
      ],
    };
  },
}
</script>

<style lang="scss" scoped>
  .faq-page {
    min-height: 76vh;
    padding-bottom: 100px;

    &__title {
      padding: 12px 0 24px;
      font-weight: 400;
    }

    &__container {
      width: 75%;
    }
  }

  @media (max-width: $break-xlg) {
    .faq-page {
      min-height: 67vh;
      padding: 0 5px 40px;

      &__title {
        padding: 20px 0 15px;
      }

      &__container {
        width: 100%;
      }
    }
  }

  @media (max-width: $break-sm) {
    .faq-page {
      min-height: 60vh;
      padding: 15px 0;

      &__title {
        font-size: 18px;
      }
    }
  }
</style>
