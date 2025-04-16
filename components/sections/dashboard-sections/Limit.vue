<template>
  <div class="limit">
    <div class="limit__title">Увеличить лимит</div>
    <div class="limit__text">
      Вы превысили лимит активных объявлений в данной категорий.<br />
      Чтобы увеличить лимит, выберите пакет дполнительных объявлений.
    </div>
    <div class="limit__promo-section">
      <label for="oneAd" class="custom-radio">
        <input type="radio" value="oneAd" id="oneAd" v-model="formDataToSend" />
        <span>
          <div class="limit__promotion-block">
            <div class="limit__promotion-container">
              <div class="limit__promotion-block-title">
                Дополнительное объявление
              </div>
              <div
                class="limit__promotion-block-text"
                v-for="item in this.translate"
                :key="item.id"
              >
                {{ item }}
              </div>
            </div>
            <div class="limit__price">250 ₽</div>
          </div>
        </span>
      </label>
    </div>
    <div class="limit__promo-section">
      <label for="manyAds" class="limit__radio custom-radio">
        <input
          type="radio"
          value="manyAds"
          id="manyAds"
          v-model="formDataToSend"
        />
        <span>
          <div class="limit__promotion-block">
            <div class="limit__promotion-container">
              <div class="limit__promotion-block-title">
                Пакет объявлений в рубрике
              </div>
              <div
                class="limit__promotion-block-text"
                v-for="item in this.translate"
                :key="item.id"
              >
                {{ item }}
              </div>
            </div>
            <div class="limit__select-wrap">
              <div class="limit__select" @click="selectOpen">
                {{ this.selectedCount }}
                <SelectArrow />
              </div>
              <div class="limit__select-option-body" v-if="selectOpened">
                <div
                  v-for="adv in advArray"
                  :key="adv.id"
                  @click="selectedAdvCount(adv.id, adv.name, adv.amount)"
                  :adv="'adv'"
                >
                  {{ adv.name }}
                  {{ adv.amount }}
                </div>
              </div>
            </div>
            <div class="limit__price">{{ this.selectedAmount }} ₽</div>
          </div>
        </span>
      </label>
    </div>
    <div class="limit__select-payment-method">Выберите способ оплаты</div>
    <div class="limit__payment-method-group">
      <div class="limit__payment-method">
        <label
          for="advon"
          class="limit__radio limit__radio-payment custom-radio"
        >
          <input type="radio" value="advon" id="advon" checked />
          <span>
            <img src="@/assets/images/promotion/advon.png" alt="" />
          </span>
        </label>
      </div>
    </div>
    <div class="limit__to-pay">
      К оплате:
      <span> {{ totalPrice }} руб </span>
      <Notification :message="error['non_field_error']" v-if="error" />
    </div>
    <div class="limit__nav-group">
      <NuxtLink to="/dashboard/ads"> Отмена </NuxtLink>
      <DefaultButton class="limit__button" @click.native="increaseLimit">
        Оплатить
      </DefaultButton>
    </div>
  </div>
</template>

<script>
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import SelectArrow from "@/assets/images/arrow/select-arrow.svg?inline";
import Notification from "@/components/errors/Notification";

export default {
  name: "Limit",
  data() {
    return {
      formDataToSend: {
        oneAd: "",
        manyAds: "",
      },
      totalPrice: 0,
      raiseLimit: "",
      selectOpened: false,
      advArray: {},
      selectedCount: "5 объявлений",
      selectedAmount: "1200",
      selectId: "",
      translate: "",
      error: null,
    };
  },
  watch: {
    formDataToSend: {
      deep: true,
      immediate: true,
      handler() {
        const { formDataToSend } = this;
        if (formDataToSend === "oneAd") {
          this.totalPrice = 250;
        }
        if (formDataToSend === "manyAds") {
          this.totalPrice = this.selectedAmount;
        }
      },
    },
  },
  components: {
    DefaultButton,
    SelectArrow,
    Notification,
  },
  mounted() {
    this.getTranslate();
  },
  methods: {
    async increaseLimit() {
      const { formDataToSend } = this;
      if (formDataToSend === "oneAd") {
        this.raiseLimit = "";
      } else this.raiseLimit = this.selectId;
      try {
        await this.$axios
          .post("/increaseLimitAdvertisementCategory", {
            category_key: this.$route.params.pathMatch,
            advertisement_price_id: this.raiseLimit,
          })
          .then((res) => {});
        this.$router.push("/dashboard/ads");
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getAdvertisementPrices() {
      try {
        await this.$axios.get("/getAdvertisementPrices").then((res) => {
          this.advArray = res.data.data;
        });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    selectOpen() {
      if (this.selectOpened === false) {
        this.selectOpened = true;
        this.getAdvertisementPrices();
      } else this.selectOpened = false;
    },
    selectedAdvCount(id, name, amount) {
      this.selectedCount = name;
      this.selectedAmount = amount;
      (this.selectId = id), (this.selectOpened = false);
      this.totalPrice = this.selectedAmount;
    },
    async getTranslate() {
      try {
        await this.$axios
          .get("/getTranslations", {
            params: {
              language_key: "ru",
              keys: [this.$route.params.pathMatch],
            },
          })
          .then((response) => {
            this.translate = response.data.data;
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.limit {
  min-height: 80vh;
  padding: 30px 0 30px 30px;
  width: 80%;

  &__title {
    font-size: $g-second-title-size;
  }

  &__text {
    line-height: 20px;
    padding: 10px 0 15px 0;
  }

  &__select-payment-method {
    line-height: 16px;
    padding: 10px 0 20px 0;
  }

  &__payment-method {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: #d4e3f6;
    width: 264px;
    height: 60px;
    margin-right: 30px;

    label {
      display: flex;
      align-items: center;
    }

    input {
      margin: 0 15px;
    }
  }

  &__payment-method-group {
    display: flex;
    padding-bottom: 30px;
  }

  &__to-pay {
    padding-bottom: 30px;

    span {
      color: $mainColor;
      font-weight: bold;
    }
  }

  &__radio-payment {
    padding-left: 10px;
  }

  &__promo-section {
    padding-bottom: 20px;

    label span {
      width: 100%;
    }
  }

  &__promo-section label {
    display: flex;
    align-items: center;
  }

  &__promotion-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $mainSecondColor;
    margin-left: 10px;
    padding: 20px;
    width: 100%;
  }

  &__to-pay {
    padding-bottom: 30px;

    span {
      color: $mainColor;
      font-weight: bold;
    }
  }

  &__nav-group {
    display: flex;
    align-items: center;

    a {
      color: $mainColor;
    }
  }

  &__button {
    background: $mainColor;
    width: 264px;
    margin-left: 50px;

    &:hover {
      @include hover-main-color;
    }

    &:active {
      @include active-main-color;
    }
  }

  &__price {
    color: #50b889;
    display: flex;
  }

  &__promotion-block-title {
    font-size: $g-font-third-size;
    padding-bottom: 10px;
  }

  &__select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $mainSecondColor;
    width: 166px;
    border: 1px solid $mainFourthColor;
    padding: 11px 10px 11px 10px;

    &:hover {
      cursor: pointer;
    }
  }

  &__select-wrap {
    position: relative;
  }

  &__select-option-body {
    position: absolute;
    top: 43px;
    background: $mainSecondColor;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    z-index: 1;
    width: 166px;
    padding: 10px;

    div {
      padding-bottom: 10px;

      &:hover {
        cursor: pointer;
      }
    }
  }
}

@media (max-width: $break-xlg) {
  .limit {
    width: 100%;
    padding: 25px 5px;
  }
}

@media (max-width: $break-sm) {
  .limit {
    padding: 25px 7px;

    &__promotion-block {
      margin-left: 0;
    }

    &__select-wrap {
      margin-top: 5px;
      order: 1;
      width: 90%;
    }

    &__promotion-block {
      flex-wrap: wrap;
      align-items: flex-start;
    }

    &__select {
      width: 100%;
    }

    &__promotion-container {
      width: 80%;
    }

    &__promotion-block {
      padding: 9px;
    }

    &__select-option-body {
      width: 100%;
    }

    &__nav-group {
      flex-direction: column;
      align-items: flex-start;
    }

    &__button {
      order: -1;
      margin-left: 0;
      margin-bottom: 25px;
    }
  }
}
</style>
