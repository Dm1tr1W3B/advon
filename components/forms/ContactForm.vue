<template>
  <form @submit.prevent="handleSubmit" class="contact-form">
    <div class="contact-form__title">
      {{ formTitle }}
    </div>
    <div class="contact-form__header">
      <div class="contact-form__group">
        <div class="contact-form__label">
          Email<span>*</span>
        </div>
        <InputText
            :set-value="formDataToSend"
            :id="'email'"
            :label="'email'"
            :type="'email'"
            :placeholder="'Ваш email'"
          />
        <Notification :message="error['email']" v-if="error" />
      </div>
      <div class="contact-form__group">
        <div class="contact-form__label">
          Имя<span>*</span>
        </div>
        <InputText
            :set-value="formDataToSend"
            :id="'name'"
            :label="'name'"
            :type="'text'"
            :placeholder="'Ваше имя'"
          />
        <Notification :message="error['name']" v-if="error" />
      </div>
      <div class="contact-form__group">
        <div class="contact-form__label">
          Тема<span>*</span>
        </div>
        <InputMainSelect
          :setValue="formDataToSend"
          :id="'feedback_type_id'"
          :placeholder="'Выбрать'"
          :optionList="feedbackTypeList"
          :value="formDataToSend.feedback_type_id"
          :labelName="'feedback_type_name'"
         />
        <Notification :message="error['feedback_type_id']" v-if="error" />
      </div>
    </div>
    <div class="contact-form__group-textarea">
      <div class="contact-form__label">
        Сообщение<span>*</span>
      </div>
      <InputTextarea
            :set-value="formDataToSend"
            :id="'message'"
            :label="'message'"
            :type="'text'"
            :placeholder="'Введите сообщение'"
        />
      <Notification :message="error['message']" v-if="error" />
    </div>
    <DefaultButton :type="'submit'" class="contact-form__button">Отправить</DefaultButton>
  </form>
</template>

<script>
import InputText from '@/components/atoms/inputs/InputText.vue';
import InputTextarea from '@/components/atoms/inputs/InputTextarea.vue';
import InputMainSelect from '@/components/atoms/inputs/InputMainSelect.vue';
import DefaultButton from '@/components/atoms/buttons/MainButton.vue';
import Notification from '@/components/errors/Notification';

export default {
  name: 'ContactForm',
  components: {
    InputText,
    DefaultButton,
    Notification,
    InputMainSelect,
    InputTextarea
  },
  data() {
    return {
      feedbackTypeList: [],
      formDataToSend: {
        email: '',
        name: '',
        feedback_type_id: '',
        message: '',
      },
      error: null,
    };
  },
  props: {
    formTitle: {
      type: String,
      default: "Связаться с нами"
    }
  },
  methods: {
    async handleSubmit() {
      const { formDataToSend } = this;
      try {
        await this.$axios.post("/storeFeedback", {
          email: formDataToSend.email,
          name: formDataToSend.name,
          feedback_type_id: formDataToSend.feedback_type_id.cfeedback_type_id,
          message: formDataToSend.message,
        }).then((res) => {
          if (res.status === 200) {
            this.formDataToSend.email = "";
            this.formDataToSend.name = "";
            this.formDataToSend.feedback_type_id = "";
            this.formDataToSend.message = "";
            this.error = null;
          }
        });
      } catch (e) {
        this.error = e.response?.data;
      }
    },
    async handleGetFeedbackTypeList() {
      try {
        await this.$axios.get("/getFeedbackTypeList")
        .then((res) => {
          this.feedbackTypeList = res.data.data
        });
      } catch (e) {
        this.error = e.response.data;
      }
    },
  },
  mounted() {
    this.handleGetFeedbackTypeList();
  }
}
</script>

<style lang="scss" scoped>
.contact-form {
  background: $mainSecondColor;
  width: 75%;
  padding: 30px 80px 30px 30px;

  &__title {
    font-size: $g-font-third-size;
    padding-bottom: 15px;
  }
  &__label {
    font-size: 12px;
    padding-bottom: 12px;

    span {
      color: red;
    }
  }
  &__header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 25px;
  }
  &__group {
    width: 31%;
  }
  &__button {
    background: $mainColor;
    margin: 20px 0;
    max-width: 244px;

    &:hover {
      background: #4d8eee;
    }

    &:active {
      background: #4d8eee;
    }
  }

  /deep/textarea {
    &::placeholder {
      color: #C4C4C4;
    }
  }
}

@media (max-width: $break-xlg) {
  .contact-form {
    width: 100%;
    padding: 29px;

    /deep/.input-main-select {
      width: 200px;
    }
  }
}

@media (max-width: $break-sm) {
  .contact-form {
    padding: 18px 8px;
    margin-bottom: 40px;

    &__header {
      flex-direction: column;
      padding-bottom: 0;
    }

    &__group {
      width: 100%;
      padding-bottom: 16px;
    }

    &__button {
      width: 174px;
    }

    /deep/.input-main-select {
      width: 100%;
    }
  }
}
</style>
