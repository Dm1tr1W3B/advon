<template>
  <div class="dashboard-ad-promotion">
    <div v-if="promotionAds">
      <div class="dashboard-ad-promotion__title-block">
        <NuxtLink to="/dashboard/ads" class="dashboard-ad-promotion__back"
          >К объявлениям</NuxtLink
        >
        <div class="dashboard-ad-promotion__title">Продвижение объявления</div>
        <div class="dashboard-ad-promotion__promo-section">
          <label
            for="promotion"
            class="dashboard-ad-promotion__radio custom-radio"
          >
            <input
              type="radio"
              value="promotion"
              id="promotion"
              v-model="formDataToSend"
            />
            <span>
              <div class="dashboard-ad-promotion__promotion-block">
                <div class="dashboard-ad-promotion__promotion-svg">
                  <img
                    src="@/assets/images/promotion/raising-all-over-the-country.png"
                    alt=""
                  />
                </div>
                <div>
                  <div class="dashboard-ad-promotion__promotion-block-title">
                    Поднятие по всей стране
                  </div>
                  <div class="dashboard-ad-promotion__promotion-block-text">
                    Повышая приоритет вашего объявления вы поднимаете его в
                    начало списка объявлений по всей стране. Это удобный способ
                    для привлечения внимания посетителей портала к вашему
                    предложению. Станьте первыми в списке и будете лидером по
                    числу просмотров.
                  </div>
                </div>
                <div class="dashboard-ad-promotion__price">190 ₽</div>
              </div>
            </span>
          </label>
        </div>
        <div class="dashboard-ad-promotion__promo-section">
          <label
            for="allocate"
            class="dashboard-ad-promotion__radio custom-radio"
          >
            <input
              type="radio"
              value="allocate"
              id="allocate"
              v-model="formDataToSend"
            />
            <span>
              <div class="dashboard-ad-promotion__promotion-block">
                <div class="dashboard-ad-promotion__promotion-svg">
                  <img
                    src="@/assets/images/promotion/highlighting.png"
                    alt=""
                  />
                </div>
                <div>
                  <div class="dashboard-ad-promotion__promotion-block-title">
                    Выделение
                  </div>
                  <div class="dashboard-ad-promotion__promotion-block-text">
                    Объявление выделяется желтым фоном на всё время размещения
                    на сайте. Выделение объявления — отличный способ сделать
                    ваше объявление более ярким и заметным на фоне соседних.
                  </div>
                </div>
                <div class="dashboard-ad-promotion__price">199 ₽</div>
              </div>
            </span>
          </label>
        </div>
        <div class="dashboard-ad-promotion__promo-section">
          <label
            for="urgent"
            class="dashboard-ad-promotion__radio custom-radio"
          >
            <input
              type="radio"
              value="urgent"
              id="urgent"
              v-model="formDataToSend"
            />
            <span>
              <div class="dashboard-ad-promotion__promotion-block">
                <div class="dashboard-ad-promotion__promotion-svg">
                  <img src="@/assets/images/promotion/urgently.png" alt="" />
                </div>
                <div>
                  <div class="dashboard-ad-promotion__promotion-block-title">
                    Срочно
                  </div>
                  <div class="dashboard-ad-promotion__promotion-block-text">
                    Пометьте объявление как срочное до тех пор, пока вы не
                    продадите свой товар. - вы привлекаете больше внимания, а
                    значит получаете больше откликов - ваше объявление
                    становится более заметным среди других предложений
                  </div>
                </div>
                <div class="dashboard-ad-promotion__price">187 ₽</div>
              </div>
            </span>
          </label>
        </div>
        <div class="dashboard-ad-promotion__promo-section">
          <label for="turbo" class="dashboard-ad-promotion__radio custom-radio">
            <input
              type="radio"
              value="turbo"
              id="turbo"
              v-model="formDataToSend"
            />
            <span>
              <div class="dashboard-ad-promotion__promotion-block">
                <div class="dashboard-ad-promotion__promotion-svg">
                  <img src="@/assets/images/promotion/turbo.png" alt="" />
                </div>
                <div>
                  <div class="dashboard-ad-promotion__promotion-block-title">
                    Пакет “Турбо”
                  </div>
                  <div class="dashboard-ad-promotion__promotion-block-text">
                    Хотите продать свой товар/услугу максимально быстро? Тогда
                    это предложение именно для вас: - Выделение объявления на 5
                    дней - Пометка “Срочно” на 15 дней
                  </div>
                </div>
                <div class="dashboard-ad-promotion__price">450 ₽</div>
              </div>
            </span>
          </label>
        </div>
        <div class="dashboard-ad-promotion__promo-section">
          <label for="free" class="dashboard-ad-promotion__radio custom-radio">
            <input
              type="radio"
              value="free"
              id="free"
              v-model="formDataToSend"
            />
            <span
              class="dashboard-ad-promotion__promotion-block-free-container"
            >
              <div class="dashboard-ad-promotion__promotion-block-free">
                <div>
                  <div class="dashboard-ad-promotion__promotion-block-title">
                    Бесплатно
                  </div>
                  <div class="dashboard-ad-promotion__promotion-block-text">
                    Ваше объявление никак не будет выделено среди конкурентов
                  </div>
                </div>
              </div>
            </span>
          </label>
        </div>
        <div class="dashboard-ad-promotion__balance">
          Баланс кошелька: {{ loggedInUser.balance }} ₽
        </div>
        <div class="dashboard-ad-promotion__to-pay">
          К оплате:
          <span> {{ totalPrice }} ₽ </span>
          <Notification :message="error['non_field_error']" v-if="error" />
        </div>
        <div class="dashboard-ad-promotion__nav-group">
          <NuxtLink to="/dashboard/ads"> Отмена </NuxtLink>
          <DefaultButton
            class="dashboard-ad-promotion__button"
            @click.native="publication"
          >
            Опубликовать
          </DefaultButton>
        </div>
      </div>
    </div>
    <div v-if="successfulPublication">
      <div class="dashboard-ad-promotion__title">
        Вы успешно создали объявление!
      </div>
      <div v-if="successfulPublicationData != null" class="dashboard-ad-promotion__inform-booster">
        Вы успешно оплатили пакет “{{successfulPublicationData.package_name}}”. <span>Срок действия с {{dateToday}} по {{successfulPublicationData.date}} </span>
      </div>
      <div class="dashboard-ad-promotion__nav-promotion">
        <NuxtLink
          :to="'/product/' + this.$route.params.pathMatch"
          target="_blank"
        >
          Смотреть объявление
        </NuxtLink>
        <NuxtLink to="/dashboard/create-ad"> Добавить еще одно </NuxtLink>
        <NuxtLink to="/dashboard/ads"> К списку объявлений </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import Notification from "@/components/errors/Notification";

export default {
  name: "DashboardAdPromotion",
  data() {
    return {
      promotionData: {},
      successfulPublicationData: null,
      promotionAds: true,
      totalPrice: 0,
      successfulPublication: false,
      formDataToSend: {
        promotion: null,
        allocate: null,
        urgent: null,
        turbo: null,
        free: null,
      },
      lowBalance: {},
      advListUser: {},
      error: null,
    };
  },
  components: {
    DefaultButton,
    Notification,
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
    dateToday() {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = today.getFullYear();
      today = mm + '.' + dd + '.' + yyyy;
      return today
    }
  },
  watch: {
    formDataToSend: {
      deep: true,
      immediate: true,
      handler() {
        const { formDataToSend } = this;
        if (formDataToSend === "promotion") {
          this.totalPrice = 190;
        }
        if (formDataToSend === "allocate") {
          this.totalPrice = 199;
        }
        if (formDataToSend === "urgent") {
          this.totalPrice = 187;
        }
        if (formDataToSend === "turbo") {
          this.totalPrice = 450;
        }
        if (formDataToSend === "free") {
          this.totalPrice = 0;
        }
      },
    },
  },
  methods: {
    async publication() {
      const { formDataToSend } = this;
      if (formDataToSend === "promotion") {
        try {
          await this.$axios
            .post("/setAdvertisementTopCountry", {
              advertisement_id: this.$route.params.pathMatch,
            })
            .then((res) => {
              this.successfulPublication = true;
              this.promotionAds = false;
              this.successfulPublicationData = res.data.data;
              this.lowBalance = res.data?.data?.low_balance?.transaction_balance_id;
              if( this.lowBalance === -1 ) {
                this.$router.push(`/dashboard/top-up-balance/${this.lowBalance}`);
              }
            });
        } catch (e) {
          this.error = e.response.data;
        }
      } else if (formDataToSend === "allocate") {
        try {
          await this.$axios
            .post("/setAdvertisementAllocate", {
              advertisement_id: this.$route.params.pathMatch,
            })
            .then((res) => {
              this.successfulPublication = true;
              this.promotionAds = false;
              this.successfulPublicationData = res.data.data;
              this.lowBalance = res.data?.data?.low_balance?.transaction_balance_id;
              if( this.lowBalance === -1 ) {
                this.$router.push(`/dashboard/top-up-balance/${this.lowBalance}`);
              }
            });
        } catch (e) {
          this.error = e.response.data;
        }
      } else if (formDataToSend === "urgent") {
        try {
          await this.$axios
            .post("/setAdvertisementUrgent", {
              advertisement_id: this.$route.params.pathMatch,
            })
            .then((res) => {
              this.successfulPublication = true;
              this.promotionAds = false;
              this.successfulPublicationData = res.data.data;
              this.lowBalance = res?.data?.data?.low_balance?.transaction_balance_id;
              if( this.lowBalance === -1 ) {
                this.$router.push(`/dashboard/top-up-balance/${this.lowBalance}`);
              }
            });
        } catch (e) {
          this.error = e.response.data;
        }
      } else if (formDataToSend === "turbo") {
        try {
          await this.$axios
            .post("/setAdvertisementTurbo", {
              advertisement_id: this.$route.params.pathMatch,
            })
            .then((res) => {
              this.successfulPublication = true;
              this.promotionAds = false;
              this.successfulPublicationData = res.data.data;
              this.lowBalance = res.data?.data?.low_balance?.transaction_balance_id;
              if( this.lowBalance === -1 ) {
                this.$router.push(`/dashboard/top-up-balance/${this.lowBalance}`);
              }
            });
        } catch (e) {
          this.error = e.response.data;
        }
      } else {
        this.successfulPublication = true;
        this.promotionAds = false;
      }
      this.setPublished();
    },
    async setPublished() {
      let checkedNames = [];
      checkedNames.push(this.$route.params.pathMatch);
      try {
        await this.$axios
          .patch("/setPublished", {
            advertisement_ids: checkedNames,
            is_published: true,
          })
          .then((res) => {
            this.adsListUser();
          });
      } catch (e) {
        this.errorPublished = e.response.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-ad-promotion {
  padding: 30px 0 30px 30px;
  width: 80%;

  &__title {
    font-size: $g-second-title-size;
    padding-bottom: 25px;
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

  &__inform-booster {
    font-size: 14px;
    padding-bottom: 23px;

    span {
      padding-left: 10px;
      font-size: 12px;
      color: #9E9E9E;
    }
  }

  &__back {
    color: $mainColor;
    padding-bottom: 15px;
    display: block;
    font-size: 16px;
  }

  &__nav-group {
    display: flex;
    align-items: center;

    a {
      color: $mainColor;
    }
  }

  &__nav-promotion {
    a {
      color: $mainColor;
      padding-right: 30px;
    }
  }

  &__promotion-block {
    display: flex;
    align-items: center;
    background: $mainSecondColor;
    margin-left: 10px;
    padding: 10px 10px 10px 0;
  }

  &__promotion-block-free {
    display: flex;
    align-items: center;
    background: $mainSecondColor;
    margin-left: 10px;
    padding: 25px 10px 25px 20px;
    width: 100%;
  }

  &__promotion-svg {
    width: 128px;
    margin: 0 30px 0 0;
  }

  &__promotion-block-text {
    color: $mainFifthColor;
    padding-right: 50px;
    line-height: 18px;
  }

  &__promotion-block-title {
    font-size: $g-font-third-size;
    line-height: 21px;
    padding-bottom: 10px;
  }

  &__promo-section {
    padding-bottom: 20px;
  }

  &__promo-section label {
    display: flex;
    align-items: center;
  }

  &__price {
    color: #50b889;
    display: flex;
    width: 105px;
  }

  &__balance {
    padding: 15px 0;
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

  &__promotion-block-free-container {
    width: 100%;
  }
}

@media (max-width: $break-xlg) {
  .dashboard-ad-promotion {
    width: 100%;
    padding: 25px 5px;

    &__promotion-block {
      align-items: flex-start;
    }

    &__promotion-block-text {
      padding-right: 0;
    }

    &__price {
      min-width: 40px;
    }
  }
}

@media (max-width: $break-sm) {
  .dashboard-ad-promotion {
    padding: 25px 7px;

    &__promotion-svg {
      display: none;
    }

    &__promotion-block {
      padding: 10px;
    }

    &__payment-method-group {
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    &__payment-method {
      width: 48%;
      margin: 0;

      img {
        width: 70%;
        object-fit: cover;
      }
    }

    &__nav-group {
      flex-direction: column-reverse;
      align-items: flex-start;
    }

    &__button {
      margin: 0;
      margin-bottom: 27px;
    }

    &__nav-promotion {
      display: flex;
      flex-direction: column;

      a {
        margin-bottom: 24px;
      }
    }
  }
}
</style>
