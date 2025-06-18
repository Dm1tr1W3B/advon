<template>
  <div class="legal-information-page container">
    <BreadCrumbs lastItemName="Юридическая справка" />
    <div class="legal-information-page__title">Юридическая справка</div>
    <div class="legal_description">Для вашего удобства мы подготовили вам юридический конспект, из которого вы можете понять, как стоит действовать при размещении рекламы в России. Здесь представлены выдержки из ФЗ № 38 от 13.03.2006 с комментариями нашего юриста. А также вы можете скачать примеры договоров.</div>
    <div class="faq-page__container">
      <div class="right_part">
        <CollapseItem v-for="item in dataLegal" :key="item.title" :title="item.title" :body="item.body" />
      </div>
      <div class="left_part">
        <LegalImage v-if="$device.isDesktop" />
        <LegalImageMobile v-if="$device.isMobile" />
      </div>
    </div>

    <NuxtLink class="legal-information-page__link" to="/terms-of-use">Условия пользования</NuxtLink>
  </div>
</template>

<script>
import Search from "@/components/molecules/Search.vue";
import CollapseItem from "@/components/molecules/CollapseItem.vue";
import LegalImage from "@/assets/images/Legal.svg?inline";
import LegalImageMobile from "@/assets/images/Legal_mobile.svg?inline";
import BreadCrumbs from "@/components/molecules/BreadCrumbs.vue";

export default {
  name: "LegalInformationPage",
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
        {
          title:
            "3Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostruLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru"
        },
        {
          title:
            "4Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostruLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru"
        },
      ],
    };
  },
  components: {
    Search,
    CollapseItem,
    LegalImage,
    LegalImageMobile,
    BreadCrumbs
  },
};
</script>

<style lang="scss">
.legal-information-page {
  margin: 0 auto;
  min-height: 74vh;

  &__title {
    font-size: $g-second-title-size;
    padding: 15px 0 25px;
  }

  &__link {
    display: block;
    color: $mainColor;
    padding: 25px 0 100px;
  }
}

@media (max-width: $break-xlg) {
  .legal-information-page {
    padding: 0 5px;
    &__title {
      padding-top: 20px;
    }

    &__link {
      padding: 25px 0 48px;
    }
  }
}

@media (max-width: $break-sm) {
  .legal-information-page {
    padding: 0;
    &__title {
      padding: 15px 7px 20px;
    }
    &__link {
      padding: 25px 0 36px;
      text-align: center;
      font-size: 18px;
    }
  }
}
</style>
