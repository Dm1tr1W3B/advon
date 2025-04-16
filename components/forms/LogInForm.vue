<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <div class="login-form__login">
      <InputText
        :set-value="formDataToSend"
        :id="'login'"
        :label="'login'"
        :type="'login'"
        :placeholder="'Введите email или телефон'"
        :autocomplete="formDataToSend.remember"
      />
      <Notification :message="error['login']" v-if="error" />
    </div>
    <div class="login-form__password">
      <InputText
        :set-value="formDataToSend"
        :id="'password'"
        :label="'password'"
        :type="'password'"
        :placeholder="'Пароль'"
        :autocomplete="formDataToSend.remember"
      />
      <Notification :message="error['password']" v-if="error" />
    </div>
    <Notification :message="error['non_field_error']" v-if="error" />

    <div @click="handleRemember" class="login-form__remember-me">
      <InputCheckboxMain :id="'remember'" :label="'Запомнить меня'" :set-value="formDataToSend" />
    </div>

    <DefaultButton :type="'submit'" class="login-form__button">
      Войти
    </DefaultButton>

    <div class="login-form__social-title">Или войти через соцсети</div>
    <div class="login-form__social-popup" @click="openModalSocial">
      <div class="login-form__social-facebook-block">
        <Facebook class="login-form__social-facebook" />
        <span>Facebook</span>
      </div>
      <SelectArrow />
    </div>
    <div class="login-form__registration">
      Еще не зарегистрированы?
      <span>
        <NuxtLink to="/registration"> Зарегистрироваться </NuxtLink>
      </span>
    </div>
    <div class="login-form__forgot-pasword" @click="goToRestorePassword">
      Забыли пароль?
    </div>

    <!-- popup -->
    <DefaultModal v-if="openModal" :on-close="() => (openModal = !openModal)">
      <p class="login-form__modal-title">Выбрать соцсеть</p>
      <div v-for="social in this.socialLogins" :key="social.id">
        <div
          class="login-form__modal-social-block"
          @click="goToLogin(social.login_url)"
        >
          <!-- <Facebook class="login-form__modal-social" /> -->
          <img :src="social.image" alt="social.name" />
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
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import authModule from "@/helpers/constants/store/authModule";
import Notification from "@/components/errors/Notification";
import SelectArrow from "@/assets/images/arrow/select-arrow.svg?inline";
import Facebook from "@/assets/images/social/facebook.svg?inline";
import DefaultModal from "@/components/molecules/DefaultModal.vue";

export default {
  name: "LogInForm",
  components: {
    InputText,
    DefaultButton,
    authModule,
    InputCheckboxMain,
    Notification,
    SelectArrow,
    Facebook,
    DefaultModal,
  },
  data() {
    return {
      formDataToSend: {
        login: "",
        password: "",
        remember: false,
      },
      error: null,
      openModal: false,
      socialLogins: {},
    };
  },
  mounted() {
    this.getSocialLogins();
    localStorage.removeItem("connect");
    if (localStorage.getItem('savePassword') == null || localStorage.getItem('savePassword') == "false") {
      this.formDataToSend.remember = false;
    } else if (localStorage.getItem('savePassword') == "true") {
      this.formDataToSend.remember = true;
    }
  },
  methods: {
    handleRemember() {
      setTimeout(() => {
        localStorage.setItem("savePassword", this.formDataToSend.remember)
      }, 0)
    },
    async handleSubmit() {
      const { formDataToSend } = this;
      try {
        await this.$auth.loginWith("local", {
          data: {
            login: formDataToSend.login,
            password: formDataToSend.password,
          },
        });

        this.$router.push("/dashboard/profile");
      } catch (e) {
        this.error = e.response.data;
      }
    },
    openModalSocial() {
      this.openModal = true;
    },
    goToRestorePassword() {
      this.$router.push("/restore-password");
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
.login-form {
  max-width: 362px;

  /deep/.main-button {
    max-width: 100%;
  }

  &__login {
    margin: 25px 0 10px 0;
    width: 362px;
  }

  &__remember-me {
    display: flex;
    align-items: center;
    padding: 20px 0;
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
    text-align: center;
    padding: 25px 0 15px;
  }
  span a {
    color: $mainColor;

    &:hover {
      text-decoration: underline;
    }
  }

  &__forgot-pasword {
    text-align: center;
    color: $mainColor;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
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
  .login-form {
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
  .login-form {
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
