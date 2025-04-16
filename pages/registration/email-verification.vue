<template>
  <div class="email-verification l-wrap">
    <RegistrationSteps />
    <div class="email-verification__title">
      Верификация email
    </div>
    <div class="email-verification__text">
      На ваш адрес было отправлено письмо со ссылкой для подтверждения имейла.
      Пожалуйста, перейдите по ссылке в письме или укажите код из письма.
    </div>
    <div class="email-verification__phone">
      {{loggedInUser.email}}
    </div>
    <div class="email-verification__email-verification">
      <InputText
        :set-value="formDataToSend"
        :id="'confirm'"
        :label="'confirm'"
        :type="'text'"
        :maxlength="6"
        :autocomplete="false"
      />
      <div class="email-verification__items">
        {{formDataToSend.confirm}}
      </div>
      <div class="email-verification__separator1"></div>
      <div class="email-verification__separator2"></div>
      <div class="email-verification__separator3"></div>
      <div class="email-verification__separator4"></div>
      <div class="email-verification__separator5"></div>
    </div>
    <Notification class="email-verification__errore" :message="error['non_field_error']" v-if="error" />
    <div class="email-verification__send-code">
      Не пришло письмо?
      <div @click="sendLetterCode">
        Отправить повторно
      </div>
    </div>
    <NuxtLink to="/dashboard/profile" class="email-verification__skip">
      Не сейчас
    </NuxtLink>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InputText from '@/components/atoms/inputs/InputText.vue';
import RegistrationSteps from '@/components/molecules/RegistrationSteps.vue';
import Notification from "@/components/errors/Notification";

export default {
  name: 'EmailVerification',
  data() {
    return {
      error: null,
      formDataToSend: {
        confirm: '',
      }
    }
  },
  layout: 'index',
  components: {
    InputText,
    RegistrationSteps,
    Notification
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  watch: {
    'formDataToSend.confirm': {
      handler() {
        setTimeout(() => {
          this.handleSubmit()
        },1000)
      }
    }
  },
  mounted() {
    this.$axios.post('/sendEmailVerificationNotification')
  },
  methods: {
    sendLetterCode() {
      this.$axios.post('/sendEmailVerificationNotification')
    },
    async handleSubmit() {
    const { formDataToSend } = this;
    try {
        await this.$axios.post('/checkEmailVerificationCode', {
          code: formDataToSend.confirm
        })
        this.$router.push('/dashboard/profile')
      } catch (e) {
        this.error = e.response.data;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .email-verification {
    height: 70vh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 75px;

    &__title {
      font-weight: 500;
      font-size: $g-second-title-size;
      line-height: 28px;
      padding-bottom: 20px;
    }

    &__text {
      padding-bottom: 15px;
      max-width: 550px;
      text-align: center;
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

    &__email-verification {
      display: flex;
      padding-bottom: 20px;

      .text-default-input {
        width: 300px;
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

    &__skip {
      color: $mainColor;

      &:hover {
        text-decoration: underline;
      }
    }

    /deep/.registration-steps__step-2 {
      background: #3B96BC;
    }

    /deep/.registration-steps__step-3 {
      background: #2677EB;
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
      right: 263px;
    }
    &__separator2 {
      border-left: 1px solid $mainFourthColor;
      position: relative;
      right: 215px;
    }
    &__separator3 {
      border-left: 1px solid $mainFourthColor;
      position: relative;
      right: 165px;
    }
    &__separator4 {
      border-left: 1px solid $mainFourthColor;
      position: relative;
      right: 115px;
    }
    &__separator5 {
      border-left: 1px solid $mainFourthColor;
      position: relative;
      right: 65px;
    }

    &__errore {
      padding-bottom: 10px;
    }
  }
@media (max-width: $break-xlg) {
  .email-verification {
    height: 70vh;
  }
}
@media (max-width: $break-sm) {
  .email-verification {
    height: 58vh;
  }
}
</style>
