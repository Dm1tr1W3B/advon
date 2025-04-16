<template>
  <div class="customization-dashboard">
    <div class="customization-dashboard__title-block">
      <div class="customization-dashboard__title">Настройки</div>
      <InputCheckbox
        :set-value="formDataToSend"
        :id="'is_hide_user'"
        :label="'Скрыть профиль'"
        class="customization-dashboard__checkbox"
        @click.native="isHideUser"
      />
      <InputCheckbox
        :set-value="formDataToSend"
        :id="'is_hide_company'"
        :label="'Скрыть профиль компании'"
        class="customization-dashboard__checkbox"
        @click.native="isHideCompany"
      />
      <div class="customization-dashboard__block-title">
        Связать с соцсетями
      </div>
      <div class="customization-dashboard__social-process-hint">
        Для ускорение процесса авторизации вы можете использовать свои аккаунты
        в социальных сетях :
      </div>
      <div class="customization-dashboard__social">
        <div v-for="social in this.socilData" :key="social.id">
          <div
            class="customization-dashboard__modal-social-block"
            @click="goToConnections(social.login_url)"
          >
            <img
              :src="social.image"
              alt="social.name"
              class="customization-dashboard__modal-social"
            />
            <Connections
              v-if="social.user_exists"
              class="customization-dashboard__connections-svg"
            />
            <!-- <span> {{ social.name }} </span> -->
          </div>
        </div>
      </div>
      <div class="customization-dashboard__block-title">
        Настройка email уведомлений
      </div>
      <InputCheckbox
        :set-value="formDataToSend"
        :id="'is_receive_news'"
        :label="'Получать рассылку о новостях ADVon.me'"
        class="customization-dashboard__checkbox"
        @click.native="setReceiveNews"
      />
      <InputCheckbox
        :set-value="formDataToSend"
        :id="'is_receive_messages_by_email'"
        :label="'Получать уведомления о новых сообщениях'"
        class="customization-dashboard__checkbox"
        @click.native="setReceiveMessagesByEmail"
      />
      <InputCheckbox
        :set-value="formDataToSend"
        :id="'is_receive_comments_by_email'"
        :label="'Получать уведомления о новых комментариях на объявления'"
        class="customization-dashboard__checkbox"
        @click.native="setReceiveCommentsByEmail"
      />
      <InputCheckbox
        :set-value="formDataToSend"
        :id="'is_receive_price_favorite_by_email'"
        :label="'Получать уведомления об изменении цены в избранных объявлениях'"
        class="customization-dashboard__checkbox"
        @click.native="setReceivePriceFavoriteByEmail"
      />
      <div class="customization-dashboard__block-title">
        Настройка sms уведомлений
      </div>
      <InputCheckbox
        :set-value="formDataToSend"
        :id="'is_receive_messages_by_phone'"
        :label="'Получать уведомления о новых сообщениях'"
        class="customization-dashboard__checkbox"
        @click.native="setReceiveMessagesByPhone"
      />
      <InputCheckbox
        :set-value="formDataToSend"
        :id="'is_receive_comments_by_phone'"
        :label="'Получать уведомления о новых комментариях на объявления'"
        class="customization-dashboard__checkbox"
        @click.native="setReceiveCommentsByPhone"
      />
      <InputCheckbox
        :set-value="formDataToSend"
        :id="'is_receive_price_favorite_by_phone'"
        :label="'Получать уведомления об изменении цены в избранных объявлениях'"
        class="customization-dashboard__checkbox"
        @click.native="setReceivePriceFavoriteByPhone"
      />
      <form @submit.prevent="changePassword" class="contact-form">
        <div class="customization-dashboard__block-title">Изменить пароль</div>
        <InputText
          :set-value="formDataToSend"
          :id="'currentPassword'"
          :label="'currentPassword'"
          :type="'password'"
          :placeholder="'Текущий пароль'"
          class="customization-dashboard__text-input"
        />
        <InputText
          :set-value="formDataToSend"
          :id="'passwordNew'"
          :label="'password'"
          :type="'password'"
          :placeholder="'Новый пароль'"
          class="customization-dashboard__text-input"
        />
        <InputText
          :set-value="formDataToSend"
          :id="'repeatPassword'"
          :label="'repeatPassword'"
          :type="'password'"
          :placeholder="'Повторите новый пароль'"
          class="customization-dashboard__text-input"
        />
        <DefaultButton
          :type="'submit'"
          class="customization-dashboard__button-change-password"
        >
          Изменить
        </DefaultButton>
        <Notification
          :message="errorChangePassword['current_password']"
          v-if="errorChangePassword"
        />
        <Notification
          :message="errorChangePassword['password']"
          v-if="errorChangePassword"
        />
      </form>
      <div class="customization-dashboard__block-title">
        Изменить основной телефон
      </div>
      <div class="customization-dashboard__phone">
        {{ this.myProfileData.phone }}
      </div>
      <InputText
        :set-value="formDataToSend"
        :id="'phone'"
        :label="'phone'"
        :type="'number'"
        :placeholder="'Введите номер телефона'"
        class="customization-dashboard__text-input"
      />
      <Notification :message="errorNewPhone['phone']" v-if="errorNewPhone" />
      <DefaultButton
        class="customization-dashboard__button-change-password"
        @click.native="updatePhone"
      >
        Изменить
      </DefaultButton>
      <div
        class="customization-dashboard__send-code"
        @click="goToVerificationPhone"
      >
        Отправить код верификации на этот номер
      </div>
      <div class="customization-dashboard__block-title">
        Удалить текущую запись
      </div>
      <div class="customization-dashboard__social-process-hint">
        Вы можете удалить свою учетную запись, если больше не планируете
        пользоваться сайтом
      </div>
      <InputText
        :set-value="formDataToSend"
        :id="'password'"
        :label="'password'"
        :type="'password'"
        :placeholder="'текущий пароль'"
        class="customization-dashboard__text-input"
      />
      <DefaultButton
        class="customization-dashboard__button-delete"
        :class="{ deleteActive: this.deleteAccountButton }"
        @click.native="deleteAccount"
      >
        Удалить учетную запись
      </DefaultButton>
      <Notification :message="error['password']" v-if="error" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import InputCheckbox from "@/components/atoms/inputs/InputCheckboxMain.vue";
import InputText from "@/components/atoms/inputs/InputText.vue";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import Facebook from "@/assets/images/social/facebook.svg?inline";
import Vk from "@/assets/images/social/vk.svg?inline";
import Twiter from "@/assets/images/social/twiter.svg?inline";
import Odnoclasniki from "@/assets/images/social/odnoclasniki.svg?inline";
import Notification from "@/components/errors/Notification";
import Connections from "@/assets/images/connections.svg?inline";

export default {
  name: "CustomizationDashboard",
  data() {
    return {
      formDataToSend: {
        currentPassword: "",
        password: "",
        repeatPassword: "",
        phone: "",
        is_hide_company: false,
        is_hide_user: false,
        is_receive_messages_by_phone: false,
        is_receive_price_favorite_by_phone: false,
        is_receive_comments_by_phone: false,
        is_receive_price_favorite_by_email: false,
        is_receive_comments_by_email: false,
        is_receive_messages_by_email: false,
        is_receive_news: false,
      },
      error: null,
      errorNewPhone: null,
      errorChangePassword: null,
      deleteAccountButton: false,
      myProfileData: {},
      setingsData: {},
      socilData: {},
    };
  },
  components: {
    InputCheckbox,
    InputText,
    DefaultButton,
    Facebook,
    Vk,
    Twiter,
    Odnoclasniki,
    Notification,
    Connections,
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
  watch: {
    formDataToSend: {
      deep: true,
      immediate: true,
      handler() {
        const { formDataToSend } = this;
        if (formDataToSend.password != "") {
          this.deleteAccountButton = true;
        } else this.deleteAccountButton = false;
      },
    },
  },
  mounted() {
    this.getProfile();
    this.getUserSettings();
    this.getUserSocialConnections();
  },
  methods: {
    async getProfile() {
      try {
        await this.$axios.get("/getProfile").then((res) => {
          this.myProfileData = res.data.data;
        });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getUserSocialConnections() {
      try {
        await this.$axios.get("/getUserSocialConnections").then((res) => {
          this.socilData = res.data.data;
        });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getUserSettings() {
      try {
        await this.$axios.get("/getUserSettings").then((res) => {
          this.setingsData = res.data.data;
        });
        for (let i = 0; i < this.setingsData.length; i++) {
          this.formDataToSend.is_hide_company =
            this.setingsData[i].is_hide_company;
          this.formDataToSend.is_hide_user = this.setingsData[i].is_hide_user;
          this.formDataToSend.is_receive_messages_by_phone =
            this.setingsData[i].is_receive_messages_by_phone;
          this.formDataToSend.is_receive_price_favorite_by_phone =
            this.setingsData[i].is_receive_price_favorite_by_phone;
          this.formDataToSend.is_receive_comments_by_phone =
            this.setingsData[i].is_receive_comments_by_phone;
          this.formDataToSend.is_receive_price_favorite_by_email =
            this.setingsData[i].is_receive_price_favorite_by_email;
          this.formDataToSend.is_receive_comments_by_email =
            this.setingsData[i].is_receive_comments_by_email;
          this.formDataToSend.is_receive_messages_by_email =
            this.setingsData[i].is_receive_messages_by_email;
          this.formDataToSend.is_receive_news =
            this.setingsData[i].is_receive_news;
        }
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async changePassword() {
      const { formDataToSend } = this;
      try {
        await this.$axios.post("/changePassword", {
          current_password: formDataToSend.currentPassword,
          password: formDataToSend.passwordNew,
          password_confirmation: formDataToSend.repeatPassword,
        });
        formDataToSend.currentPassword = "";
        formDataToSend.passwordNew = "";
        formDataToSend.repeatPassword = "";
        this.$auth.logout();
      } catch (e) {
        this.errorChangePassword = e.response.data;
      }
    },
    async deleteAccount() {
      const { formDataToSend } = this;
      try {
        await this.$axios.post("/deleteAccount", {
          password: formDataToSend.password,
        });
        this.$auth.logout();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async updatePhone() {
      const { formDataToSend } = this;
      try {
        await this.$axios.post("/updatePhone", {
          phone: formDataToSend.phone,
        });
        formDataToSend.phone = "";
        this.getProfile();
      } catch (e) {
        this.errorNewPhone = e.response.data;
      }
    },
    goToVerificationPhone() {
      this.$router.push("/registration/phone-verification");
    },
    async isHideUser() {
      const { formDataToSend } = this;
      let hide;
      if (formDataToSend.is_hide_user === false) {
        hide = true;
      } else hide = false;
      try {
        await this.$axios
          .patch("/setHideUser", {
            is_hide_user: hide,
          })
          .then((res) => {});
        this.getUserSettings();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async isHideCompany() {
      const { formDataToSend } = this;
      let hide;
      if (formDataToSend.is_hide_company === false) {
        hide = true;
      } else hide = false;
      try {
        await this.$axios
          .patch("/setHideCompany", {
            is_hide_company: hide,
          })
          .then((res) => {});
        this.getUserSettings();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async setReceiveMessagesByPhone() {
      const { formDataToSend } = this;
      let hide;
      if (formDataToSend.is_receive_messages_by_phone === false) {
        hide = true;
      } else hide = false;
      try {
        await this.$axios
          .patch("/setReceiveMessagesByPhone", {
            is_receive_messages_by_phone: hide,
          })
          .then((res) => {});
        this.getUserSettings();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async setReceivePriceFavoriteByPhone() {
      const { formDataToSend } = this;
      let hide;
      if (formDataToSend.is_receive_price_favorite_by_phone === false) {
        hide = true;
      } else hide = false;
      try {
        await this.$axios
          .patch("/setReceivePriceFavoriteByPhone", {
            is_receive_price_favorite_by_phone: hide,
          })
          .then((res) => {});
        this.getUserSettings();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async setReceiveCommentsByPhone() {
      const { formDataToSend } = this;
      let hide;
      if (formDataToSend.is_receive_comments_by_phone === false) {
        hide = true;
      } else hide = false;
      try {
        await this.$axios
          .patch("/setReceiveCommentsByPhone", {
            is_receive_comments_by_phone: hide,
          })
          .then((res) => {});
        this.getUserSettings();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async setReceivePriceFavoriteByEmail() {
      const { formDataToSend } = this;
      let hide;
      if (formDataToSend.is_receive_price_favorite_by_email === false) {
        hide = true;
      } else hide = false;
      try {
        await this.$axios
          .patch("/setReceivePriceFavoriteByEmail", {
            is_receive_price_favorite_by_email: hide,
          })
          .then((res) => {});
        this.getUserSettings();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async setReceiveCommentsByEmail() {
      const { formDataToSend } = this;
      let hide;
      if (formDataToSend.is_receive_comments_by_email === false) {
        hide = true;
      } else hide = false;
      try {
        await this.$axios
          .patch("/setReceiveCommentsByEmail", {
            is_receive_comments_by_email: hide,
          })
          .then((res) => {});
        this.getUserSettings();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async setReceiveMessagesByEmail() {
      const { formDataToSend } = this;
      let hide;
      if (formDataToSend.is_receive_messages_by_email === false) {
        hide = true;
      } else hide = false;
      try {
        await this.$axios
          .patch("/setReceiveMessagesByEmail", {
            is_receive_messages_by_email: hide,
          })
          .then((res) => {});
        this.getUserSettings();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async setReceiveNews() {
      const { formDataToSend } = this;
      let hide;
      if (formDataToSend.is_receive_news === false) {
        hide = true;
      } else hide = false;
      try {
        await this.$axios
          .patch("/setReceiveNews", {
            is_receive_news: hide,
          })
          .then((res) => {});
        this.getUserSettings();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    goToConnections(url) {
      window.location.href = url;
      localStorage.setItem("connect", JSON.stringify("true"));
    },
  },
};
</script>

<style lang="scss" scoped>
.customization-dashboard {
  padding: 30px;
  width: 70%;

  &__title {
    font-size: $g-second-title-size;
    padding-bottom: 25px;
  }

  &__text {
    line-height: 16px;
    padding: 0 0 15px 0;
  }

  &__button-change-password {
    background: $mainColor;

    &:hover {
      @include hover-main-color;
    }

    &:active {
      @include active-main-color;
    }
  }

  &__checkbox {
    margin-bottom: 10px;
  }

  &__block-title {
    padding: 50px 0 15px 0;
  }

  &__social-process-hint {
    color: $mainFifthColor;
    padding-bottom: 15px;
    max-width: 366px;
    line-height: 14px;
    font-size: $g-mobile-size;
  }

  &__social {
    display: flex;
    /deep/svg {
      width: 24px;
      height: 24px;
      margin-right: 10px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  &__text-input {
    margin-bottom: 10px;
    width: 266px;
  }

  &__button-delete {
    background: $mainFourthColor;
    margin: 20px 0 10px 0;

    /deep/button {
      color: $mainFifthColor;

      &:hover {
        cursor: not-allowed;
      }
    }
  }

  &__phone {
    padding: 0 0 15px 0;
  }

  .deleteActive {
    background: $mainColor;

    /deep/button {
      color: $mainSecondColor;
      &:hover {
        cursor: pointer;
      }
    }
  }

  &__send-code {
    color: $mainColor;
    padding-top: 10px;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  &__connections-svg {
    position: absolute;
    left: 15px;
    bottom: 5px;
  }

  &__modal-social-block {
    display: flex;
    align-items: center;
    padding-top: 20px;
    margin-right: 20px;
    position: relative;

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
  /deep/label {
    padding-left: 30px;
    position: relative;
    right: 30px;
  }
}

@media (max-width: $break-xlg) {
  .customization-dashboard {
    width: 80%;
    padding: 25px 5px;
  }
}

@media (max-width: $break-sm) {
  .customization-dashboard {
    width: 100%;
    padding: 25px 7px;

    &__social {
      svg {
        width: 30px;
        height: 30px;
      }
    }

    &__block-title {
      padding: 28px 0 15px 0;
    }
  }
}
</style>
