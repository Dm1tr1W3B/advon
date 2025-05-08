<template>
  <div :class="['small-card-horizontal', adsData.is_allocate ? 'allocate' : '']">
<!--    <div class="small-card-horizontal__image-conatiner">-->
<!--      <img-->
<!--        :src="adsData.image"-->
<!--        :alt="adsData.img"-->
<!--        class="small-card-horizontal__image"-->
<!--        @click="handleClick(adsData.advertisement_id)"-->
<!--      />-->
<!--      <div class="small-card-horizontal__top" v-if="adsData.is_top_country">Топ</div>-->
<!--      <div class="small-card-horizontal__urgent" v-if="adsData.is_urgent">Срочно</div>-->
<!--      <div class="small-card-horizontal__add-to-favorites">-->
<!--        <div-->
<!--          @click="addAdvertisementFavorite(adsData.advertisement_id)"-->
<!--          v-if="!adsData.is_favorite"-->
<!--        >-->
<!--          <div class="small-card-horizontal__star-wrap">-->
<!--            <Star :class="{ isFavorite: adsData.is_favorite }" />-->
<!--          </div>-->
<!--        </div>-->
<!--        <div-->
<!--          @click="deleteAdvertisementsFavorite(adsData.advertisement_id)"-->
<!--          v-if="adsData.is_favorite"-->
<!--        >-->
<!--          <div class="small-card-horizontal__star-wrap">-->
<!--            <Star :class="{ isFavorite: adsData.is_favorite }" />-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div
      class="small-card-horizontal__body-wrap"
      @click="handleClick(adsData.advertisement_id)"
    >
      <div class="small-card-horizontal__body-block">
        <div class="small-card-horizontal__title">
          {{ adsData.title }}
        </div>
        <div v-if="!$device.isMobile" class="small-card-horizontal__price-wrap">
          <div class="small-card-horizontal__price">
            {{ adsData.price }}
            <span class="small-card__price-simbol">
            {{ adsData.translation_currency_code }}
<!--            <span v-if="adsData.payment">/</span>-->
<!--            {{ adsData.payment }}-->
          </span>
          </div>
        </div>
        <div v-if="$device.isMobile" class="small-card-horizontal__price-wrap">
          <div class="small-card-horizontal__price">
            {{ adsData.price }}
            <span class="small-card__price-simbol">
            {{ adsData.translation_currency_code }}
<!--            <span v-if="adsData.payment">/</span>-->
<!--            {{ adsData.payment }}-->
          </span>
          </div>
        </div>
<!--        <div-->
<!--          class="small-card-horizontal__characteristics"-->
<!--          v-if="adsData.ready_for_political_advertising_name"-->
<!--        >-->
<!--          {{ adsData.ready_for_political_advertising_name }}:-->
<!--          <div v-if="adsData.ready_for_political_advertising === true">Да</div>-->
<!--          <div v-if="adsData.ready_for_political_advertising === false">-->
<!--            Нет-->
<!--          </div>-->
<!--        </div>-->
<!--        <div-->
<!--          class="small-card-horizontal__characteristics"-->
<!--          v-if="adsData.reach_audience_name"-->
<!--        >-->
<!--          {{ adsData.reach_audience_name }}-->
<!--          {{ adsData.reach_audience }}-->
<!--        </div>-->
<!--        <div-->
<!--          class="small-card-horizontal__characteristics"-->
<!--          v-if="adsData.amount_name"-->
<!--        >-->
<!--          {{ adsData.amount_name }}:-->
<!--          {{ adsData.amount }}-->
<!--        </div>-->
<!--        <div-->
<!--          class="small-card-horizontal__characteristics"-->
<!--          v-if="adsData.length_name"-->
<!--        >-->
<!--          {{ adsData.length_name }}:-->
<!--          {{ adsData.length }}-->
<!--        </div>-->
<!--        <div-->
<!--          class="small-card-horizontal__characteristics"-->
<!--          v-if="adsData.width_name"-->
<!--        >-->
<!--          {{ adsData.width_name }}-->
<!--        </div>-->
      </div>
      <div class="small-card-horizontal__location-block">
        <div class="small-card-horizontal__location" v-if="adsData.city">
        <Location />
        {{ adsData.city }}
      </div>
        <div class="small-card-horizontal__category">
          <span>Категория: </span>
          {{ adsData.category_name }}
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Location from "@/assets/images/icons/Map_Point.svg?inline";
import Star from "@/assets/images/icons/star.svg?inline";
// import Favorites from "@/assets/images/icons/favorites.svg?inline";

export default {
  name: "SmallCardHorizontal",
  components: {
    Location,
    // Favorites,
    Star,
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
    },
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
.small-card-horizontal {
  display: flex;
  flex-direction: row;
  background: $mainSecondColor;
  position: relative;
  margin-bottom: 20px;
  max-height: 150px;
  overflow: hidden;

  &.allocate {
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    border-image: linear-gradient(91.41deg, #2575ed 0%, #50b987 100%);
    border-image-slice: 1;
  }

  &__image {
    min-height: 100%;
    min-width: 100%;
    width: auto;
    height: auto;
    max-width: 190px;
    max-height: 150px;
    display: block;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
  }

  &__add-to-favorites {
    position: absolute;
    bottom: 15px;
    right: 15px;
  }

  &__star-wrap {
    background: $mainSecondColor;
    border-radius: 100%;
    padding: 8px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);

    &:hover {
      cursor: pointer;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    }
  }

  &__image-conatiner {
    display: block !important;
    margin: auto;
    min-width: 190px;
    height: 150px;

    img {
      &:hover {
        cursor: pointer;
        box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
      }
    }
  }

  &__title {
    line-height: 16px;
    text-align: left;
    padding: 10px 0 33px 0;
    overflow: hidden;
  }

  &__price {
    font-size: $g-font-third-size;
    font-weight: bold;
    padding-bottom: 10px;
    width: 100%;
    text-align: right;
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
      margin-right: 10px;
    }
  }

  &__body-block {
    display: flex;
    flex-direction: column;
    padding: 0 10px 15px 10px;
    height: 60%;
    width: 33%;
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
  .isFavorite {
    path {
      fill: $mainColor;
      stroke: $mainColor;
    }
  }

  &__price-simbol {
    font-size: $g-font-base-size;
    padding-right: 5px;
  }

  &__characteristics {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
    justify-content: flex-start !important;
    text-align: left !important;
    padding: 3px 0;

    div {
      padding-left: 3px;
    }
    justify-content: flex-start !important;
  }

  &__location {
    justify-content: flex-start !important;
    svg {
      margin-right: 10px;
    }
  }

  &__body-wrap {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px 20px;

    &:hover {
      cursor: pointer;
      box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
    }
  }

  &__location-block {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__price-wrap {
    width: 30%;
  }
}
@media (max-width: $break-xlg) {
  .small-card-horizontal {
    max-height: none;
    &__location-block {
      width: 120px;
    }

    &__title {
      width: auto;
      margin: 0;
      max-height: 55px;
    }

    &__body-block {
      padding-right: 40px;
      width: 50%;
    }

    &__image-conatiner {
      margin: 0;
    }

    &__image {
      max-width: 171px;
      max-height: 136px;
      object-fit: cover;
    }

    &__location-block {
      padding-top: 30px;
      width: 30%;
    }

    &__price-wrap {
      width: 30%;
    }

    &__price {
      text-align: right;
    }

    &__location {
      display: flex;
      align-items: flex-start;
    }
  }
}

@media (max-width: $break-sm) {
  .small-card-horizontal {
    max-height: none;

    &__image {
      max-width: 96px;
      max-height: 75px;
      object-fit: cover;
    }

    &__image-conatiner {
      max-width: 96px;
      max-height: 75px;
      min-width: 96px;
    }

    &__body-wrap {
      padding: 10px 7px;
      flex-direction: column;
    }

    &__body-block {
      width: 100%;
    }

    &__title {
      padding: 0;
      max-height: 35px;
    }

    &__price {
      padding: 3px 0;
      text-align: left;
    }

    &__characteristics {
      display: flex;
    }

    &__body-block {
      padding: 0;
    }

    &__location-block {
      padding: 0;
    }

    &__price-wrap {
      width: 100%;
    }
  }
}
</style>
