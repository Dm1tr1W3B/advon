<template>
  <div class="dashboard-company-promotion">
    <div v-if="promotionAds">
      <div class="dashboard-company-promotion__title-block">
        <div class="dashboard-company-promotion__title">
          Продвижение компании
        </div>
        <div class="dashboard-company-promotion__promo-section">
          <label
            for="promotion"
            class="dashboard-company-promotion__radio custom-radio"
          >
            <input
              type="radio"
              value="promotion"
              id="promotion"
              v-model="formDataToSend"
            />
            <span>
              <div class="dashboard-company-promotion__promotion-block">
                <div class="dashboard-company-promotion__promotion-svg">
                  <img src="@/assets/images/promotion/anchorage.png" alt="" />
                </div>
                <div>
                  <div
                    class="dashboard-company-promotion__promotion-block-title"
                  >
                    Закрепление
                  </div>
                  <div
                    class="dashboard-company-promotion__promotion-block-text"
                  >
                    <div>
                      Закрепив компанию вы поднимаете её в начало списка
                      компаний на 7 дней.
                    </div>
                    <div>- в 10 раз больше просмотров</div>
                    <div>- в 5 раз больше откликов</div>
                  </div>
                </div>
                <div class="dashboard-company-promotion__price">200 ₽</div>
              </div>
            </span>
          </label>
        </div>
        <div class="dashboard-company-promotion__promo-section">
          <label
            for="highlighting"
            class="dashboard-company-promotion__radio custom-radio"
          >
            <input
              type="radio"
              value="highlighting"
              id="highlighting"
              v-model="formDataToSend"
            />
            <span>
              <div class="dashboard-company-promotion__promotion-block">
                <div class="dashboard-company-promotion__promotion-svg">
                  <img src="@/assets/images/promotion/excretion.png" alt="" />
                </div>
                <div>
                  <div
                    class="dashboard-company-promotion__promotion-block-title"
                  >
                    Выделение
                  </div>
                  <div
                    class="dashboard-company-promotion__promotion-block-text"
                  >
                    Компания выделяется рамкой на период 7 дней. Выделение
                    компании — отличный способ сделать вашу компанию более яркой
                    и заметной на фоне соседних.
                  </div>
                </div>
                <div class="dashboard-company-promotion__price">199 ₽</div>
              </div>
            </span>
          </label>
        </div>
        <!-- <div class="dashboard-company-promotion__select-payment-method">
          Выберите способ оплаты
        </div>
        <div class="dashboard-company-promotion__payment-method-group">
          <div class="dashboard-company-promotion__payment-method">
            <label
              for="advon"
              class="dashboard-company-promotion__radio-price custom-radio"
            >
              <input type="radio" value="advon" id="advon" />
              <span>
                <img src="@/assets/images/promotion/advon.png" alt="" />
              </span>
            </label>
          </div>
        </div> -->
        <div class="dashboard-company-promotion__balance">
          Баланс кошелька: {{ loggedInUser.balance }} ₽
        </div>
        <div class="dashboard-company-promotion__to-pay">
          К оплате:
          <span> {{ totalPrice }} руб </span>
        </div>
        <div class="dashboard-company-promotion__nav-group">
          <NuxtLink to="/dashboard/ads"> Отмена </NuxtLink>
          <DefaultButton
            class="dashboard-company-promotion__button"
            @click.native="publication"
          >
            Продвинуть
          </DefaultButton>
        </div>
        <Notification
          :message="error['non_field_error']"
          v-if="error"
          class="dashboard-company-promotion__error"
        />
      </div>
    </div>
    <div v-if="successfulPublication">
      <div class="dashboard-company-promotion__title">
        Ваша компания успешно добавленна в топ!
      </div>
      <div v-if="successfulPublicationData != null" class="dashboard-ad-promotion__inform-booster">
        Вы успешно оплатили пакет “{{successfulPublicationData.package_name}}”. <span>Срок действия с {{dateToday}} по {{successfulPublicationData.date}} </span>
      </div>
      <!-- <div class="dashboard-company-promotion__nav-promotion">
        <NuxtLink to=""> Смотреть объявление </NuxtLink>
        <NuxtLink to="/dashboard/create-ad"> Добавить еще одно </NuxtLink>
        <NuxtLink to="/dashboard/ads"> К списку объявлений </NuxtLink>
      </div> -->
    </div>
    <div v-if="this.successfulExcretion">
      <div class="dashboard-company-promotion__title">
        Ваша компания успешно выделена!
      </div>
      <div v-if="successfulPublicationData != null" class="dashboard-company-promotion__inform-booster">
        Вы успешно оплатили пакет “{{successfulPublicationData.package_name}}”. <span>Срок действия с {{dateToday}} по {{successfulPublicationData.date}} </span>
      </div>
      <!-- <div class="dashboard-company-promotion__nav-promotion">
        <NuxtLink to=""> Смотреть объявление </NuxtLink>
        <NuxtLink to="/dashboard/create-ad"> Добавить еще одно </NuxtLink>
        <NuxtLink to="/dashboard/ads"> К списку объявлений </NuxtLink>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import Notification from "@/components/errors/Notification";

export default {
  name: "DashboardCompanyPromotion",
  data() {
    return {
      successfulPublicationData: null,
      promotionAds: true,
      successfulPublication: false,
      successfulExcretion: false,
      lowBalance: {},
      formDataToSend: {
        promotion: null,
        highlighting: null,
        paymentMethod: null,
      },
      totalPrice: 0,
      error: null,
    };
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
    },
  },
  components: {
    DefaultButton,
    Notification,
  },
  watch: {
    formDataToSend: {
      deep: true,
      immediate: true,
      handler() {
        const { formDataToSend } = this;
        if (formDataToSend === "promotion") {
          this.totalPrice = 200;
        }
        if (formDataToSend === "highlighting") {
          this.totalPrice = 199;
        }
      },
    },
  },
  methods: {
    async publication() {
      const { formDataToSend } = this;
      if (formDataToSend === "promotion") {
        try {
          await this.$axios.post("/setCompanyTop").then((res) => {
            this.successfulPublication = true;
            this.promotionAds = false;
            this.successfulPublicationData = res.data.data;
            this.lowBalance = res.data?.data?.low_balance?.transaction_balance_id;
            if (this.lowBalance === -1) {
              this.$router.push(`/dashboard/top-up-balance/${this.lowBalance}`);
            }
          });
        } catch (e) {
          this.error = e.response.data;
        }
      } else {
        try {
          await this.$axios.post("/setCompanyAllocate").then((res) => {
            this.successfulExcretion = true;
            this.promotionAds = false;
            this.successfulPublicationData = res.data.data;
            this.lowBalance = res.data?.low_balance?.transaction_balance_id;
            if (this.lowBalance === -1) {
              this.$router.push(`/dashboard/top-up-balance/${this.lowBalance}`);
            }
          });
        } catch (e) {
          this.error = e.response.data;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-company-promotion {
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

  &__inform-booster {
    font-size: 14px;
    padding-bottom: 23px;

    span {
      padding-left: 10px;
      font-size: 12px;
      color: #9E9E9E;
    }
  }

  &__promotion-block {
    display: flex;
    align-items: center;
    background: $mainSecondColor;
    margin-left: 10px;
    padding: 10px 10px 10px 0;
    width: 100%;
  }

  &__promotion-block-free {
    display: flex;
    align-items: center;
    background: $mainSecondColor;
    margin-left: 10px;
    padding: 25px 10px 25px 20px;
    width: 100%;
  }

  &__balance {
    padding: 15px 0;
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
    font-weight: bold;
    display: flex;
    justify-content: flex-end;
    height: 75px;
    width: 105px;
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

  &__radio-price {
    margin-left: 10px;
  }

  &__radio span {
    width: 100%;
  }

  &__error {
    padding-top: 5px;
  }
}

@media (max-width: $break-xlg) {
  .dashboard-company-promotion {
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
  .dashboard-company-promotion {
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
  }
}
</style>
