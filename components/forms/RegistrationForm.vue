<template>
  <form class="registration-form" @submit.prevent="handleSubmit">
    <RegistrationSteps />
    <div class="registration-form__input">
      <InputText
        :set-value="formDataToSend"
        :id="'email'"
        :label="'email'"
        :type="'email'"
        :placeholder="'Email*'"
      />
    </div>
    <Notification :message="error['email']" v-if="error" />
    <div class="registration-form__input">
      <InputText
        :set-value="formDataToSend"
        :id="'phone'"
        :label="'phone'"
        :type="'number'"
        :placeholder="'Телефон'"
      />
    </div>
    <Notification :message="error['phone']" v-if="error" />
    <div class="registration-form__input">
      <InputText
        :set-value="formDataToSend"
        :id="'password'"
        :label="'password'"
        :type="'password'"
        :placeholder="'Пароль*'"
      />
    </div>
    <Notification :message="error['password']" v-if="error" />
    <div class="registration-form__input">
      <InputText
        :set-value="formDataToSend"
        :id="'repeatPassword'"
        :label="'repeat-password'"
        :type="'password'"
        :placeholder="'Повторите Пароль*'"
      />
    </div>
    <Notification :message="error['repeat-password']" v-if="error" />
    <!-- <ReCaptcha /> -->
    <div>
      <p class="error"></p>
    </div>
    <div class="registration-form__remember-me">
      <InputCheckboxMain
        :set-value="formDataToSend"
        :id="'isAgree'"
        :label="''"
      />
      <span
        >Я соглашаюсь с
        <NuxtLink to="/terms-of-use">правилами использования сервиса</NuxtLink>
        и передачей и обработкой моих данных.</span
      >
    </div>
    <Notification :message="error['is_agree']" v-if="error" />
    <DefaultButton :type="'submit'" class="registration-form__button">
      Зарегистрироваться
    </DefaultButton>
    <div class="registration-form__social-title">Или войти через соцсети</div>
    <div class="registration-form__social-popup" @click="openModalSocial">
      <div class="registration-form__social-facebook-block">
        <Facebook class="registration-form__social-facebook" />
        <span>Facebook</span>
      </div>
      <SelectArrow />
    </div>
    <div class="registration-form__registration">
      Уже зарегистрированы?
      <span>
        <NuxtLink to="/login"> Войти </NuxtLink>
      </span>
    </div>

    <!-- popup -->
    <DefaultModal v-if="openModal" :on-close="() => (openModal = !openModal)">
      <p class="registration-form__modal-title">Выбрать соцсеть</p>
      <div v-for="social in this.socialLogins" :key="social.id">
        <div
          class="registration-form__modal-social-block"
          @click="goToLogin(social.login_url)"
        >
          <img :src="social.image" alt="social.name" class="registration-form__modal-social" />
          <span> {{ social.name }} </span>
        </div>
      </div>
    </DefaultModal>
    <!-- end popup -->
  </form>
</template>

<script>
import InputText from "@/components/atoms/inputs/InputText.vue";
import InputCheckboxMain from "@/components/atoms/inputs/InputCheckboxMain.vue";
import RegistrationSteps from "@/components/molecules/RegistrationSteps.vue";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import Notification from "@/components/errors/Notification";
import authModule from "@/helpers/constants/store/authModule";
import SelectArrow from "@/assets/images/arrow/select-arrow.svg?inline";
import Facebook from "@/assets/images/social/facebook.svg?inline";
import DefaultModal from "@/components/molecules/DefaultModal.vue";

import ReCaptcha from "@/components/atoms/buttons/ReCaptcha.vue";

export default {
  name: "RegistrationForm",
  components: {
    InputText,
    DefaultButton,
    authModule,
    InputCheckboxMain,
    RegistrationSteps,
    Notification,
    SelectArrow,
    Facebook,
    DefaultModal,
    ReCaptcha,
  },

  data() {
    return {
      formDataToSend: {
        email: "",
        phone: "",
        password: "",
        repeatPassword: "",
        isAgree: false,
      },
      error: null,
      openModal: false,
      socialLogins: {},
    };
  },
  mounted() {
    this.getSocialLogins();
  },
  methods: {
    async handleSubmit() {
      const { formDataToSend } = this;
      try {
        await this.$axios.post("/storeUser", {
          email: formDataToSend.email,
          phone: formDataToSend.phone,
          password: formDataToSend.password,
          password_confirmation: formDataToSend.repeatPassword,
          is_agree: formDataToSend.isAgree,
          ref_code: this.$route.query.ref
        });

        await this.$auth.loginWith("local", {
          data: {
            login: formDataToSend.email,
            password: formDataToSend.password,
          },
        });
        if (formDataToSend.phone === "") {
          this.$router.push("/registration/email-verification");
        } else this.$router.push("/registration/phone-verification");
      } catch (e) {
        this.error = e.response.data;
      }
    },
    openModalSocial() {
      this.openModal = true;
    },
    async getSocialLogins() {
      try {
        await this.$axios.get("/getSocialLogins").then((res) => {
          this.socialLogins = res.data.data;
        });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    goToLogin(url) {
      window.location.href = url;
    },
  },
};
</script>

<style lang="scss" scoped>
.registration-form {
  width: 362px;
  /deep/.main-button {
    max-width: 100%;
  }
  &__login {
    margin: 25px 0 10px 0;
    width: 362px;
  }

  &__input {
    padding-bottom: 10px;
  }

  &__remember-me {
    display: flex;
    padding: 20px 0;

    span {
      position: relative;
      bottom: 3px;

      a {
        color: $mainColor;

        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }

  &__button {
    background: $buttonColor;
    margin-bottom: 30px;

    &:hover {
      @include hover-button;
    }

    &:active {
      @include active-button;
    }
  }

  &__social-title {
    text-align: center;
  }

  &__registration {
    padding-top: 25px;
    text-align: center;
  }

  span a {
    color: $mainColor;
  }

  &__forgot-pasword {
    color: $mainColor;
  }

  &__social-popup {
    width: 100%;
    height: 44px;
    border: 1px solid $mainFourthColor;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    margin-top: 15px;

    &:hover {
      cursor: pointer;
    }
  }

  &__social-facebook {
    width: 24px;
  }

  &__social-facebook-block {
    display: flex;
    align-items: center;

    span {
      padding-left: 10px;
    }
  }

  &__modal-title {
    font-size: $g-font-third-size;
    line-height: 21px;
  }

  &__modal-social-block {
    display: flex;
    align-items: center;
    width: 750px;
    padding-top: 20px;

    span {
      padding-left: 10px;
    }

    &:hover {
      cursor: pointer;
      color: $mainColor;
    }
  }

  &__modal-social {
    position: relative !important;
    left: 0 !important;
    top: 0 !important;
    width: 24px;
  }
}
@media (max-width: $break-xlg) {
  .registration-form {
    /deep/.modal-container {
      width: 90%;
    }
    /deep/.close-modal-btn {
      top: 20px !important;
      right: 20px !important;
    }
  }
}
@media (max-width: $break-sm) {
  .registration-form {
    max-width: 95%;
    /deep/.modal-container {
      width: 100%;
      height: 100%;
    }
    /deep/.close-modal-btn {
      top: 20px !important;
      right: 20px !important;
    }
  }
}
</style>
