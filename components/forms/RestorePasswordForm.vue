<template>
  <form @submit.prevent="handleSubmit" class="restore-password-form">
    <div class="restore-password-form__container">
      <div class="restore-password-form__title">Восстановить пароль</div>
      <div class="login-form__login">
        <InputText
          :set-value="formDataToSend"
          :id="'email'"
          :label="'email'"
          :type="'email'"
          :placeholder="'Введите email'"
        />
        <Notification :message="error['email']" v-if="error" />
        <Notification :message="error['non_field_error']" v-if="error" />
      </div>
      <DefaultButton :type="'submit'" class="restore-password-form__button">
        Отправить
      </DefaultButton>
    </div>
  </form>
</template>

<script>
import InputText from "@/components/atoms/inputs/InputText.vue";
import InputCheckboxMain from "@/components/atoms/inputs/InputCheckboxMain.vue";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import Notification from "@/components/errors/Notification";
import SelectArrow from "@/assets/images/arrow/select-arrow.svg?inline";

export default {
  name: "RestorePasswordForm",
  components: {
    InputText,
    DefaultButton,
    InputCheckboxMain,
    Notification,
    SelectArrow,
  },
  data() {
    return {
      formDataToSend: {
        email: "",
      },
      error: null,
    };
  },
  methods: {
    async handleSubmit() {
      const { formDataToSend } = this;
      try {
        await this.$axios.post("/userForgotPassword", {
          email: formDataToSend.email,
        });
        this.$router.push('/restore-msg')
      } catch (e) {
        this.error = e.response.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.restore-password-form {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  padding-top: 200px;

  &__container {
    width: 362px;
  }

  &__title {
    font-size: $g-second-title-size;
    padding-bottom: 25px;
  }

  &__button {
    background: $buttonColor;
    margin: 20px 0;
    max-width: 362px;

    &:hover {
      @include hover-button;
    }

    &:active {
      @include active-button;
    }
  }
}

@media (max-width: $break-xlg) {
  .restore-password-form {
    min-height: 68vh;
  }
}

@media (max-width: $break-sm) {
  .restore-password-form {
    min-height: 53vh;
    padding: 30px 7px;
    &__container {
      width: 100%;
    }
  }
}
</style>
