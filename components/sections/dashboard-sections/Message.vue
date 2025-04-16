<template>
  <div class="message" v-if="this.chatData">
    <div class="message__back-to-block">
      <NuxtLink to="/dashboard/chat" class="message__back-to"
        >Назад к сообщениям
      </NuxtLink>
      <div @click="goToAllAvdAuthor" class="message__back-to">
        К объявлениям пользователя
      </div>
    </div>
    <div class="message__head-block" v-if="this.chatData.user_from">
      <div class="message__from-title">
        <div>
          <img
            :src="this.chatData.user_from.avatar"
            alt=""
            class="message__avatar"
          />
        </div>
        <div class="message__title-block">
          <div>
            {{ this.chatData.user_from.name }}
          </div>
          <div class="message__last-message-date">
            {{ this.chatData.user_from.message_date }}
          </div>
        </div>
      </div>
      <div>
        <Star
          @click="turnChatFavorite(chatData.is_favorite)"
          :class="{ activeFavorite: chatData.is_favorite }"
        />
        <Block
          @click="turnBlockChat(chatData.is_blocked)"
          :class="{ activeBlocked: chatData.is_blocked }"
        />
        <Delete @click="deleteChat()" />
      </div>
    </div>
    <div
      class="message__block"
      v-for="messageFrom in this.chatData.chat"
      :key="messageFrom.id"
    >
      <div v-if="chatData.user_from">
        <div v-if="messageFrom.author === 'to'" class="message__block-from">
          <div>
            <img
              :src="chatData.user_from.avatar"
              alt=""
              class="message__avatar"
            />
          </div>
          <div>
            <div v-if="chatData.user_from.name">
              {{ chatData.user_from.name }}
            </div>
            <div class="message__date" v-if="messageFrom.message_date">
              {{ messageFrom.message_date }}
            </div>
            <div
              class="message__adv-title"
              v-if="messageFrom.message.advertisement.id"
            >
              Для объявления №{{ messageFrom.message.advertisement.id }}
              поступило предложение:
            </div>
            <div v-if="messageFrom.message.price">
              <span> Цена: </span>
              {{ messageFrom.message.price }}
              {{ messageFrom.message.translation_currency_code }}
            </div>
            <div class="message__phone" v-if="messageFrom.message.phone">
              <span> Телефон: </span>
              {{ messageFrom.message.phone }}
            </div>
            <div class="message__message" v-if="messageFrom.message.text">
              {{ messageFrom.message.text }}
            </div>
            <div
              class="message__adv-img"
              v-if="messageFrom.message.advertisement.image"
              @click="goToAvd"
            >
              <img
                :src="messageFrom.message.advertisement.image"
                :alt="messageFrom.message.advertisement.title"
              />
            </div>
            <div v-if="messageFrom.files">
              <div
                class="message__files"
                v-for="file in messageFrom.files"
                :key="file.id"
              >
                <a :href="file.download_link" target="blank">
                  <div>
                    {{ file.original_name }}
                  </div>
                  <File />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="chatData.user_to" class="message__block-to-position">
        <div v-if="messageFrom.author === 'from'" class="message__block-to">
          <div>
            <img
              :src="chatData.user_to.avatar"
              alt=""
              class="message__avatar"
            />
          </div>
          <div>
            <div>
              {{ chatData.user_to.name }}
            </div>
            <div class="message__date" v-if="messageFrom.message_date">
              {{ messageFrom.message_date }}
            </div>
            <div
              class="message__adv-title"
              v-if="messageFrom.message.advertisement.id"
            >
              Для объявления №{{ messageFrom.message.advertisement.id }}
              поступило предложение:
            </div>
            <div v-if="messageFrom.message.price">
              <span> Цена: </span>
              {{ messageFrom.message.price }}
              {{ messageFrom.message.translation_currency_code }}
            </div>
            <div class="message__phone" v-if="messageFrom.message.phone">
              <span> Телефон: </span>
              {{ messageFrom.message.phone }}
            </div>
            <div class="message__message">
              {{ messageFrom.message.text }}
            </div>
            <div
              class="message__adv-img"
              v-if="messageFrom.message.advertisement.image"
            >
              <img
                :src="messageFrom.message.advertisement.image"
                :alt="messageFrom.message.advertisement.title"
              />
            </div>
            <div v-if="messageFrom.files">
              <div
                class="message__files"
                v-for="file in messageFrom.files"
                :key="file.id"
              >
                <a :href="file.download_link" target="blank">
                  <div>
                    {{ file.original_name }}
                  </div>
                  <File />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="message__message-text-block">
      <InputTextarea
        :set-value="formDataToSend"
        :id="'message'"
        :label="'message'"
        :placeholder="'Написать ответ'"
      />
      <Notification
        :message="errorSendMessage['text'] || errorSendMessage['non_field_error']"
        v-if="errorSendMessage"
      />
      <label for="files">
        <Clip />
        <input
          type="file"
          id="files"
          ref="files"
          multiple
          v-on:change="handleFilesUploads()"
          hidden
          accept="image/jpeg, image/png, application/pdf"
        />
      </label>
    </div>
    <div class="message__message-bottom">
      <div>Вы можете прикрепить файл форматов jpg, png, pdf</div>
      <DefaultButton
        class="message__message-button"
        @click.native="sendMessage"
      >
        Отправить
      </DefaultButton>
    </div>
  </div>
</template>

<script>
import Star from "@/assets/images/chat/star.svg?inline";
import Block from "@/assets/images/chat/block.svg?inline";
import Delete from "@/assets/images/chat/delete.svg?inline";
import File from "@/assets/images/chat/file.svg?inline";
import Clip from "@/assets/images/icons/clip.svg?inline";
import InputTextarea from "@/components/atoms/inputs/InputTextarea.vue";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import Notification from "@/components/errors/Notification";

export default {
  name: "Message",
  data() {
    return {
      chatData: {},
      formDataToSend: {
        message: "",
      },
      files: [],
      advId: "",
      advAllId: "",
      errorSendMessage: null,
    };
  },
  components: {
    Star,
    Block,
    Delete,
    Clip,
    InputTextarea,
    DefaultButton,
    File,
    Notification,
  },
  mounted() {
    this.getMessages();
  },
  methods: {
    async getMessages() {
      try {
        await this.$axios
          .get("getMessages", {
            params: {
              chat_id: this.$route.params.pathMatch,
            },
          })
          .then((res) => {
            this.chatData = res.data.data;
            for (let i = 0; i < this.chatData.chat.length; i++) {
              this.advId = this.chatData.chat[i].message.advertisement.id;
            }
            this.advAllId = this.chatData.user_from.id;
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    handleFilesUploads() {
      this.files = this.$refs.files.files;
    },
    async sendMessage() {
      const { formDataToSend } = this;
      let formData = new FormData();
      let files = "";
      for (var i = 0; i < this.files.length; i++) {
        files = this.files[i];
        formData.append("files[" + i + "]", files);
      }
      formData.append("text", formDataToSend.message);
      formData.append("chat_id", this.$route.params.pathMatch);
      try {
        await this.$axios.post("/sendMessage", formData).then(() => {});
        formDataToSend.message = "";
        this.files = "";
        this.getMessages();
      } catch (e) {
        this.errorSendMessage = e.response.data;
      }
    },
    goToAvd() {
      this.$router.push(`/product/${this.advId}`);
    },
    goToAllAvdAuthor() {
      this.$router.push(`/all-advertisement/${"user" + this.advAllId}`);
    },
    async turnChatFavorite(favorite) {
      let isFavorite = true;
      if (favorite) {
        isFavorite = false;
      }
      try {
        await this.$axios.post("/turnChatFavorite", {
          chat_id: this.$route.params.pathMatch,
          is_favorite: isFavorite,
        });
        this.getMessages();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async turnBlockChat(block) {
      let isBlock = true;
      if (block) {
        isBlock = false;
      }
      try {
        await this.$axios.post("/turnBlockChat", {
          chat_id: this.$route.params.pathMatch,
          is_blocked: isBlock,
        });
        this.getMessages();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async deleteChat() {
      try {
        await this.$axios.delete("/deleteChat", {
          params: {
            chat_id: this.$route.params.pathMatch,
          },
        });
        this.getChatsAll();
      } catch (e) {
        this.error = e.response.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.message {
  padding: 30px 0 30px 30px;
  width: 80%;

  &__back-to {
    color: $mainColor;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  &__back-to-block {
    padding-bottom: 25px;
    display: flex;
    justify-content: space-between;
  }

  &__avatar {
    width: auto;
    height: auto;
    max-height: 56px;
    max-width: 56px;
    margin-right: 20px;
  }

  &__from-title {
    display: flex;
  }

  &__last-message-date {
    font-size: $g-mobile-size;
    color: $mainFifthColor;
    padding-top: 5px;
  }

  &__head-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid $mainFourthColor;

    div {
      svg {
        margin-left: 20px;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  &__block-from {
    display: flex;
    background: $mainSecondColor;
    width: auto;
    max-width: 70%;
    padding: 20px 50px 20px 20px;
    margin: 20px 0;
  }

  &__block-to {
    display: flex;
    background: #d4e3f6;
    width: auto;
    max-width: 70%;
    padding: 20px 80px 20px 20px;
    margin: 20px 0;
  }

  &__adv-title {
    padding: 15px 0;
  }

  &__date {
    font-size: $g-mobile-size;
    color: $mainFifthColor;
    padding-top: 5px;
  }

  &__phone {
    padding: 15px 0;
  }

  &__message {
    padding: 15px 0;
  }

  &__adv-img img {
    max-width: 133px;
    max-height: 90px;
    width: auto;
    height: auto;

    &:hover {
      cursor: pointer;
    }
  }

  &__message-text-block {
    position: relative;

    svg {
      position: absolute;
      top: 50px;
      right: 5px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  &__message-button {
    background: $buttonColor;
    width: 166px;
  }

  &__message-bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
    color: $mainFifthColor;
    font-size: $g-mobile-size;
  }

  &__block-to-position {
    display: flex;
    justify-content: flex-end;
  }

  &__files {
    a div {
      font-size: $g-mobile-size;
      color: $mainFifthColor;
    }
  }

  &__title-block {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

  .activeFavorite {
    fill: $mainColor;
  }

  .activeBlocked {
    stroke: red;
  }
}

@media (max-width: $break-xlg) {
  .message {
    width: 100%;
    padding: 25px 5px;
  }
}

@media (max-width: $break-sm) {
  .message {
    padding: 15px 7px;

    &__back-to-block {
      flex-direction: column;
      padding-bottom: 0;
    }

    &__back-to {
      padding-bottom: 14px;
    }

    &__block-from {
      max-width: 90%;
      margin: 10px 0;
    }

    &__block-to {
      max-width: 90%;
      margin: 10px 0;
    }
  }
}
</style>
