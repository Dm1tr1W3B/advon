<template>
  <form @submit.prevent="handleSubmit" class="create-email-form">
    <div class="create-email-form__email">
      <InputText
        :set-value="formDataToSend"
        :id="'email'"
        :label="'email'"
        :type="'email'"
        :placeholder="'Введите email'"
      />
      <Notification :message="error['email']" v-if="error" />
    </div>
    <div class="create-email-form__password">
      <InputText
        :set-value="formDataToSend"
        :id="'password'"
        :label="'password'"
        :type="'password'"
        :placeholder="'Введите пароль'"
      />
      <Notification :message="error['password']" v-if="error" />
    </div>
    <Notification :message="error['non_field_error']" v-if="error" />

    <div class="create-email-form__password-repeat">
      <InputText
        :set-value="formDataToSend"
        :id="'repeatPassword'"
        :label="'repeat-password'"
        :type="'password'"
        :placeholder="'Повторите Пароль*'"
      />
      <Notification :message="error['password']" v-if="error" />
    </div>

    <DefaultButton :type="'submit'" class="create-email-form__button">
      Сохранить
    </DefaultButton>
  </form>
</template>

<script>
import InputText from "@/components/atoms/inputs/InputText.vue";
import InputCheckboxMain from "@/components/atoms/inputs/InputCheckboxMain.vue";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import authModule from "@/helpers/constants/store/authModule";
import Notification from "@/components/errors/Notification";
import SelectArrow from "@/assets/images/arrow/select-arrow.svg?inline";

export default {
  name: "CreateEmailForm",
  components: {
    InputText,
    DefaultButton,
    authModule,
    InputCheckboxMain,
    Notification,
    SelectArrow,
  },
  data() {
    return {
      formDataToSend: {
        email: "",
        password: "",
      },
      error: null,
      openModal: false,
    };
  },
  methods: {
    async handleSubmit() {
      const { formDataToSend } = this;
      let getToken = localStorage.getItem("auth._token.local");
      try {
        await this.$axios.post("/createEmailForSocialUser", {
          email: formDataToSend.email,
          password: formDataToSend.password,
          password_confirmation: formDataToSend.repeatPassword,
          token: getToken,
        });
        await this.$auth.loginWith("local", {
          data: {
            login: formDataToSend.email,
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
  },
};
</script>

<style lang="scss" scoped>
.create-email-form {
  max-width: 362px;

  /deep/.main-button {
    max-width: 100%;
  }

  &__email {
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
    margin: 20px 0 30px 0;

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
  }

  &__modal-social {
    position: relative !important;
    left: 0 !important;
    top: 0 !important;
    width: 24px;
  }

  &__password-repeat {
    margin-top: 10px;
  }
}
// @media (max-width: $break-xlg) {
//   .create-email-form {
//     /deep/.modal-container {
//       width: 90%;
//     }
//     /deep/.close-modal-btn {
//       top: 20px !important;
//       right: 20px !important;
//     }
//   }
// }
// @media (max-width: $break-sm) {
//   .create-email-form {
//     max-width: 95%;
//     /deep/.modal-container {
//       width: 100%;
//       height: 100%;
//     }
//     /deep/.close-modal-btn {
//       top: 20px !important;
//       right: 20px !important;
//     }
//   }
// }
</style>
