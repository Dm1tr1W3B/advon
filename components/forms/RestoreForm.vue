<template>
  <form @submit.prevent="handleSubmit" class="restore-form">
    <div class="restore-form__container">
      <div class="restore-form__title">Создать новый пароль</div>
      <div class="restore-form__restore-password">
        <div>
          <InputText
            :set-value="formDataToSend"
            :id="'password'"
            :label="'password'"
            :type="'password'"
            :placeholder="'Введите пароль'"
          />
        </div>
        <div>
          <InputText
            :set-value="formDataToSend"
            :id="'repeatPassword'"
            :label="'repeat-password'"
            :type="'password'"
            :placeholder="'Повторите Пароль*'"
          />
        </div>
        <Notification :message="error['password']" v-if="error" />
      </div>
      <DefaultButton :type="'submit'" class="restore-form__button">
        Отправить
      </DefaultButton>
    </div>
    <div class="restore-form__hints">
      <h2 class="restore-form__hints-title">Пароль должен содержать</h2>
      <div class="restore-form__hints-item">
        <Verification class="restore-form__hints-icon" />
        <p class="restore-form__hints-text">Не менее 8 символов</p>
      </div>
      <div class="restore-form__hints-item">
        <Verification class="restore-form__hints-icon" />
        <p class="restore-form__hints-text">Латинские буквы</p>
      </div>
      <div class="restore-form__hints-item">
        <Verification class="restore-form__hints-icon" />
        <p class="restore-form__hints-text">Пароли совпадают</p>
      </div>
    </div>
  </form>
</template>

<script>
import InputText from "@/components/atoms/inputs/InputText.vue";
import InputCheckboxMain from "@/components/atoms/inputs/InputCheckboxMain.vue";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import Notification from "@/components/errors/Notification";
import SelectArrow from "@/assets/images/arrow/select-arrow.svg?inline";
import Verification from '@/assets/images/good-verified-small.svg?inline';


export default {
  name: "RestorePasswordForm",
  components: {
    InputText,
    DefaultButton,
    InputCheckboxMain,
    Notification,
    SelectArrow,
    Verification,
  },
  data() {
    return {
      formDataToSend: {
        password: "",
        repeatPassword: "",
      },
      error: null,
    };
  },
  methods: {
    async handleSubmit() {
      const { formDataToSend } = this;
      try {
        await this.$axios.post("/userRestorePassword", {
          password: formDataToSend.password,
          password_confirmation: formDataToSend.repeatPassword,
          token: this.$route.query.token,
        });
        this.$router.push('/login')
      } catch (e) {
        this.error = e.response.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.restore-form {
  min-height: 76vh;
  display: flex;
  justify-content: center;
  padding-top: 200px;
  position: relative;

  &__container {
    width: 362px;
  }

  &__title {
    font-size: $g-second-title-size;
    padding-bottom: 25px;
    text-align: center;
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

  &__restore-password div {
    margin-bottom: 20px;
  }

  &__hints {
    position: absolute;
    padding: 27px 30px;
    background: #eeeeee;
    right: -80px;
    top: 250px;
  }

  &__hints-title {
    font-weight: 700;
    font-size: 14px;
    padding-bottom: 15px;
  }

  &__hints-item {
    display: flex;
    padding-bottom: 8px;
  }

  &__hints-icon {
    width: 16px;
    height: 16px;
    margin-right: 9px;
  }
}

@media (max-width: 1500px) {
  .restore-form {
    &__hints {
      right: 20px;
    }
  }
}

@media (max-width: $break-xlg) {
  .restore-form {
    min-height: 68vh;
    flex-direction: column;
    align-items: center;
    padding-top: 0px;

    &__hints {
      position: static;
      width: auto;

    }
  }
}

@media (max-width: $break-sm) {
  .restore-form {
    min-height: 53vh;
    padding: 20px 7px;

    &__container {
      width: 100%;
    }
  }
}
</style>
