<template>
  <div :class="['small-card', adsData.is_allocate ? 'allocate' : '', adsData.advertisement_type_key == 'performer' ? ' performer' : 'employee']">
    <div class="small-card__image-conatiner">
      <img
        :src="adsData.image"
        :alt="adsData.image"
        class="small-card__image"
        @click="handleClick(adsData.advertisement_id)"
      />
      <div class="small-card__top" v-if="adsData.is_top_country">Топ</div>
      <div class="small-card__urgent" v-if="adsData.is_urgent">Срочно</div>
      <div class="small-card__add-to-favorites">
        <div
          @click="addAdvertisementFavorite(adsData.advertisement_id)"
          v-if="!adsData.is_favorite"
        >
          <div class="small-card__star-wrap">
            <Star :class="{ isFavorite: adsData.is_favorite }" />
          </div>
        </div>
        <div
          @click="deleteAdvertisementsFavorite(adsData.advertisement_id)"
          v-if="adsData.is_favorite"
        >
          <div class="small-card__star-wrap">
            <Star :class="{ isFavorite: adsData.is_favorite }" />
          </div>
        </div>
      </div>
    </div>
    <TokenNotProvided :error-comment="errorAddtoFavorite" />
    <div
      class="small-card__body-block"
      @click="handleClick(adsData.advertisement_id)"
    >
      <div class="small-card__title">
        {{ adsData.title }}
      </div>
      <div class="small-card__characteristics-container">
<!--        <div-->
<!--          class="small-card__characteristics"-->
<!--          v-if="adsData.ready_for_political_advertising_name"-->
<!--        >-->
<!--          {{ adsData.ready_for_political_advertising_name }}:-->
<!--          <div v-if="adsData.ready_for_political_advertising === true">Да</div>-->
<!--          <div v-if="adsData.ready_for_political_advertising === false">-->
<!--            Нет-->
<!--          </div>-->
<!--        </div>-->
        <div
          class="small-card__characteristics"
          v-if="adsData.reach_audience_name"
        >
          {{ adsData.reach_audience_name }}:
          {{ adsData.reach_audience }}
        </div>
<!--        <div class="small-card__characteristics" v-if="adsData.amount_name">-->
<!--          {{ adsData.amount_name }}:-->
<!--          {{ adsData.amount }}-->
<!--        </div>-->
<!--        <div class="small-card__characteristics" v-if="adsData.length_name">-->
<!--          {{ adsData.length_name }}:-->
<!--          {{ adsData.length }}-->
<!--        </div>-->
<!--        <div class="small-card__characteristics" v-if="adsData.width_name">-->
<!--          {{ adsData.width_name }}-->
<!--          {{ adsData.width }}-->
<!--        </div>-->
      </div>
<!--      <div class="small-card__category">-->
<!--        {{ adsData.category_name }}-->
<!--      </div>-->
      <div class="small-card__location" v-if="adsData.city">
        <Location />
        {{ adsData.city }}
      </div>
      <div class="small-card__price"> Цена:
        <span v-if="adsData.price_type !== 'договорная'">
          {{ adsData.price | price-break }}
          <span class="small-card__price-simbol">
            {{ adsData.translation_currency_code }}
            <span v-if="adsData.payment">/</span>
            {{ adsData.payment }}
          </span>
        </span>
        {{ adsData.price_type }}
      </div>
<!--      <div class="small-card__person" v-if="adsData.city">-->
<!--        <Verification v-if="adsData.company_is_verification"/>-->
<!--        {{ adsData.person }}-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import Location from "@/assets/images/icons/Map_Point.svg?inline";
import Star from "@/assets/images/icons/star.svg?inline";
import TokenNotProvided from "@/components/errors/TokenNotProvided";
import Verification from "@/assets/images/verification-small.svg?inline";

export default {
  name: "SmallCard",
  data() {
    return {
      errorAddtoFavorite: null,
    };
  },
  components: {
    Location,
    Star,
    TokenNotProvided,
    Verification,
  },
  props: {
    adsData: {
      type: Object,
      default() {
        return {};
      },
    },
    addAdvertisementFavorite: {
      type: Function,
      default() {
        return {}
      }
    },
    deleteAdvertisementsFavorite: {
      type: Function,
      default() {
        return {}
      }
    }
  },
  methods: {
    handleClick(advId) {
      this.$router.push(`/product/${advId}`);
    },
    // async addAdvertisementFavorite(id) {
    //   try {
    //     await this.$axios.post("/addAdvertisementFavorite", {
    //       advertisement_id: id,
    //     });
    //   } catch (e) {
    //     this.errorAddtoFavorite = e.response.data;
    //   }
    // },
    // async deleteAdvertisementsFavorite(id) {
    //   let advertisementIds = [];
    //   advertisementIds.push(id);
    //   try {
    //     await this.$axios.delete("/deleteAdvertisementsFavorite", {
    //       params: {
    //         advertisement_ids: advertisementIds,
    //       },
    //     });
    //   } catch (e) {
    //     this.error = e.response.data;
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.small-card {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  margin-bottom: 20px;
  background: $mainSecondColor;
  position: relative;
  height: 470px;
  width: 270px;
  overflow: hidden;

  &.allocate {
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    border-image: linear-gradient(91.41deg, #2575ed 0%, #50b987 100%);
    border-image-slice: 1;
  }

  &:hover {
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
  }

  &__image {
    min-height: 100%;
    min-width: 100%;
    width: auto;
    height: auto;
    max-width: 270px;
    max-height: none;
    display: block;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &:hover {
      cursor: pointer;
    }
  }

  &__image-conatiner {
    height: 45%;
    display: block !important;
    margin: auto;
    overflow: hidden;
    max-width: 270px;
  }

  &__title {
    line-height: 16px;
    margin: 0 auto;
    text-align: center;
    max-width: 220px;
    padding: 10px 0;
    height: 44px;
    overflow: hidden;
    margin-bottom: 7px;
  }

  &__price {
    font-size: $g-font-third-size;
    font-weight: bold;
    padding-bottom: 10px;
    text-align: center;
  }

  &__price-simbol {
    font-size: $g-font-base-size;
    padding-right: 5px;
  }

  &__category {
    font-size: $g-mobile-size;
    color: $mainFifthColor;
    padding: 10px 0;
    justify-content: flex-start !important;
  }

  &__location {
    justify-content: flex-start !important;
    svg {
      margin-right: 5px;
    }
  }

  &__body-block {
    display: flex;
    flex-direction: column;
    padding: 0 10px 0 10px;
    height: 60%;

    &:hover {
      cursor: pointer;
    }
  }
  .isFavorite {
    path {
      fill: $mainColor;
      stroke: $mainColor;
    }
  }

  &__characteristics {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
    justify-content: flex-start !important;
    text-align: left !important;
    padding: 5px 0;

    div {
      padding-left: 3px;
    }
    justify-content: flex-start !important;
  }

  &__person {
    display: flex;
    align-items: center;
    color: $mainFifthColor;
    font-size: $g-mobile-size;
    padding: 10px 0;
    justify-content: flex-start !important;
    text-align: left !important;

    svg {
      margin-right: 7px;
    }
  }

  &__location {
    justify-content: flex-start !important;
    svg {
      margin-right: 10px;
    }
  }

  &__star-wrap {
    background: $mainSecondColor;
    position: absolute;
    top: 15px;
    right: 15px;
    border-radius: 100%;
    padding: 8px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      cursor: pointer;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    }
  }

  &__characteristics-container {
    display: flex;
    flex-direction: column;
    min-height: 100px;
  }

  &__top {
    position: absolute;
    top: 15px;
    left: 0;
    background: linear-gradient(91.41deg, #2575ed 0%, #50b987 100%);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    font-weight: bold;
    color: $mainSecondColor;
    padding: 5px 23px;
  }
  &__urgent {
    position: absolute;
    top: 15px;
    left: 0;
    background: #50B987;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    font-weight: bold;
    color: $mainSecondColor;
    padding: 5px 23px;
  }

  /deep/.token-not-provided {
    width: 500px;
    position: absolute;
    top: 55px;
    left: 0;
    background: white;
    z-index: 1;
    flex-direction: column;

    div {
      span {
        display: block;
        padding: 0 5px;
      }
    }
  }
}
@media (max-width: $break-xlg) {
  .small-card {
    width: 95%;
    margin: 0 auto;

    &__image {
      max-width: 100%;
      object-fit: cover;
    }
  }
}
@media (max-width: $break-sm) {
  .small-card {
    width: 90%;

    &__star-wrap {
      top: 10px;
      right: 10px;
    }
  }
}
</style>
