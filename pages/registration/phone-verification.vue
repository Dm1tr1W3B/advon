<template>
  <div class="phone-verification l-wrap">
    <RegistrationSteps />
    <div class="phone-verification__title">Верификация телефона</div>
    <div class="phone-verification__text">
      Мы выслали на ваш номер телефона код подтверждения
    </div>
    <div class="phone-verification__phone">
      {{ loggedInUser.phone }}
    </div>
    <div class="phone-verification__phone-verification">
      <InputText
        :set-value="formDataToSend"
        :id="'confirm'"
        :label="'confirm'"
        :type="'text'"
        :maxlength="4"
        :autocomplete="false"
      />
      <div class="phone-verification__items">
        {{formDataToSend.confirm}}
      </div>
      <div class="phone-verification__separator1"></div>
      <div class="phone-verification__separator2"></div>
      <div class="phone-verification__separator3"></div>
    </div>
    <Notification :message="error['non_field_error']" v-if="error" />
    <Notification
      :message="errorVerification['non_field_error']"
      v-if="errorVerification"
    />
    <div class="phone-verification__send-code">
      Не пришло смс?
      <div @click="sendSmsCode">Выслать другой код</div>
    </div>
    <NuxtLink
      to="/registration/email-verification"
      class="phone-verification__skip"
      v-if="email_verified_at === ''"
    >
      Не сейчас
    </NuxtLink>
    <NuxtLink
      to="/dashboard/profile"
      class="phone-verification__skip"
      v-if="email_verified_at !== ''"
    >
      Не сейчас
    </NuxtLink>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import InputText from "@/components/atoms/inputs/InputText.vue";
import RegistrationSteps from "@/components/molecules/RegistrationSteps.vue";
import Notification from "@/components/errors/Notification";

export default {
  name: "PhoneVerification",
  layout: "index",
  data() {
    return {
      error: null,
      errorVerification: null,
      formDataToSend: {
        confirm: "",
      },
    };
  },
  components: {
    InputText,
    RegistrationSteps,
    Notification,
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
  watch: {
    "formDataToSend.confirm": {
      handler() {
        const { formDataToSend } = this;
        if (formDataToSend.confirm.length === 4) {
          setTimeout(() => {
            this.confirmPhone();
          }, 1000);
        }
      },
    },
  },
  mounted() {
    this.$axios.post("/userSendSmsKey", { type: "user_verification" });
  },
  methods: {
    async sendSmsCode() {
      try {
        await this.$axios.post("/userSendSmsKey", {
          type: "user_verification",
        });
      } catch (e) {
        this.errorVerification = e.response.data;
      }
    },
    async confirmPhone() {
      const { formDataToSend } = this;
      try {
        await this.$axios.post("/userCheckSmsKey", {
          type: "user_verification",
          sms_key: formDataToSend.confirm,
        });
        this.$router.push("/dashboard/profile");
      } catch (e) {
        this.error = e.response.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.phone-verification {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 75px;
  min-height: 80vh;

  &__title {
    font-weight: 500;
    font-size: $g-second-title-size;
    line-height: 28px;
    padding-bottom: 20px;
  }

  &__text {
    padding-bottom: 15px;
  }

  &__phone {
    padding-bottom: 15px;
  }

  &__items {
      position: absolute;
      margin: 0 10px;
      padding: 12px 18px;
      letter-spacing: 40px;
      font-size: 18px;
      z-index: 1;
    }

  &__phone-verification {
    display: flex;
    padding-bottom: 20px;

    .text-default-input {
      width: 200px;
      height: 44px;
      margin: 0 10px;
    }

    /deep/input {
      position: relative;
        z-index: 2;
        padding: 11px 0!important;
        font-size: $g-font-third-size;
        letter-spacing: 33px;
        color: transparent !important;
        background: transparent !important;

        &:focus {
          border-color: black;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
    }
  }

  &__send-code {
    display: flex;
    align-items: center;
    padding-bottom: 5px;

    div {
      color: $mainColor;
      font-weight: normal;
      padding-left: 5px;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  &__separator1 {
    border-left: 1px solid $mainFourthColor;
    position: relative;
    right: 162px;
  }
  &__separator2 {
    border-left: 1px solid $mainFourthColor;
    position: relative;
    right: 112px;
  }
  &__separator3 {
    border-left: 1px solid $mainFourthColor;
    position: relative;
    right: 65px;
  }

  &__skip {
    color: $mainColor;

    &:hover {
      text-decoration: underline;
    }
  }
  /deep/.registration-steps__step-2 {
    background: #3b96bc;
  }
}
@media (max-width: $break-xlg) {
  .phone-verification {
    min-height: 70vh;
  }
}
@media (max-width: $break-sm) {
  .phone-verification {
    padding-top: 65px;
    min-height: 58vh;

    &__text {
      text-align: center;
    }
  }
}
</style>
