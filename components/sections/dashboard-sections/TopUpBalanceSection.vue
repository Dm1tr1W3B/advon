<template>
  <div class="top-up-balance-section">
    <div class="top-up-balance-section__back" @click="$router.go(-2)">
      Назад
    </div>
    <div class="top-up-balance-section__title">Пополнить счет</div>
    <div>Выберите сумму пополнения</div>
    <InputText
      class="top-up-balance-section__input"
      :set-value="formDataToSend"
      :id="'amount'"
      :label="'amount'"
      :type="'number'"
      :placeholder="'0'"
    />
    <div>Выберите способ оплаты</div>
    <div v-for="payment in this.paymentSustems" :key="payment.id">
      <div class="top-up-balance-section__payment-method-group">
        <div class="top-up-balance-section__payment-method">
          <label
            for="advon"
            class="
              top-up-balance-section__radio
              top-up-balance-section__radio-payment
              custom-radio
            "
          >
            <input type="radio" value="advon" id="advon" checked />
            <span>
              <img :src="payment.image" :alt="payment.image" />
            </span>
          </label>
        </div>
      </div>
    </div>
    <DefaultButton
      class="top-up-balance-section__button"
      @click.native="getRedirectUrl"
    >
      Пополнить
    </DefaultButton>
  </div>
</template>

<script>
import InputText from "@/components/atoms/inputs/InputText.vue";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";

export default {
  name: "TopUpBalanceSection",
  data() {
    return {
      paymentSustems: {},
      formDataToSend: {
        amount: '',
      },
      error: null,
      redirectUrl: {},
      successUrl: {},
    };
  },
  components: {
    InputText,
    DefaultButton,
  },
  mounted() {
    this.getPaymentSystems();
  },
  methods: {
    async getPaymentSystems() {
      try {
        await this.$axios.get("/getPaymentSystems").then((res) => {
          this.paymentSustems = res.data.data;
        });
        this.successUrl = this.$route.path;
      } catch (e) {
        this.error = e.response;
      }
    },
    async getRedirectUrl() {
      const { formDataToSend } = this;
      try {
        await this.$axios
          .get("/getRedirectUrl", {
            params: {
              payment_system_id: "1",
              amount: formDataToSend.amount,
              success_url: this.successUrl,
            },
          })
          .then((res) => {
            this.redirectUrl = res.data.data;
          });
        window.location.href = this.redirectUrl.redirect_url;
      } catch (e) {
        this.error = e.response;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.top-up-balance-section {
  padding: 30px 0 30px 30px;
  width: 80%;

  &__button {
    background: $mainColor;
    width: 166px;
    margin-top: 25px;
  }

  &__back {
    color: $mainColor;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  &__title {
    padding: 20px 0 10px 0;
    font-size: $g-second-title-size;
  }
  &__input {
    margin: 15px 0 25px 0;
    width: 264px;
  }
  &__payment-method-group {
    display: flex;
    padding-bottom: 30px;
  }
  &__payment-method {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 15px;
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
  &__radio-payment {
    padding-left: 10px;
  }
}
</style>