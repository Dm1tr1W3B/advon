<template>
  <div class="chat-dashboard">
    <div class="chat-dashboard__title">Сообщения</div>
    <div class="chat-dashboard__nav-menu">
      <div
        class="chat-dashboard__nav-item"
        :class="{ activeChat: activeChatAll }"
        @click="getChatsAll"
      >
        Все сообщения
      </div>
      <div
        class="chat-dashboard__nav-item"
        :class="{ activeChat: activeCompanyChat }"
        @click="getChatsCompany"
      >
        Для компании
      </div>
      <div
        class="chat-dashboard__nav-item"
        :class="{ activeChat: activePrivateChat }"
        @click="getChatsPrivate"
      >
        Для частного лица
      </div>
      <div
        class="chat-dashboard__nav-item"
        :class="{ activeChat: activeFavoriteChat }"
        @click="getChatsFavorite"
      >
        Избранные
      </div>
      <div
        class="chat-dashboard__nav-item"
        :class="{ activeChat: activeBlockedChat }"
        @click="getChatsBlockedChat"
      >
        Заблокированные
      </div>
    </div>
    <div
      class="chat-dashboard__message-block"
      v-for="chat in this.chatDate.data"
      :key="chat.id"
    >
      <div class="chat-dashboard__message-top-section">
        <div
          class="chat-dashboard__message-title-section"
          @click="goToChat(chat.chat_id)"
        >
          <img :src="chat.author_logo" alt="" />
          <div class="chat-dashboard__message-title-block">
            <div>{{ chat.author_name }}</div>
            <div>{{ chat.message_date }}</div>
          </div>
        </div>
        <div>
          <Star
            @click="turnChatFavorite(chat.chat_id, chat.is_favorite)"
            :class="{ activeFavorite: chat.is_favorite }"
          />
          <Block
            @click="turnBlockChat(chat.chat_id, chat.is_blocked)"
            :class="{ activeBlocked: chat.is_blocked }"
          />
          <Delete @click="deleteChat(chat.chat_id)" />
        </div>
      </div>
      <div
        class="chat-dashboard__message-medium-section"
        @click="goToChat(chat.chat_id)"
      >
        {{ chat.advertisement_title }}
      </div>
      <div class="chat-dashboard__message-bottom-section">
        <div class="chat-dashboard__message" @click="goToChat(chat.chat_id)">
          {{ chat.message_text }}
        </div>
        <div class="chat-dashboard__message-count-not-read" v-if="chat.count_unread > 0">
          {{ chat.count_unread }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Star from "@/assets/images/chat/star.svg?inline";
import Block from "@/assets/images/chat/block.svg?inline";
import Delete from "@/assets/images/chat/delete.svg?inline";

export default {
  name: "ChatDashboard",
  data() {
    return {
      activeChatAll: true,
      activeCompanyChat: false,
      activePrivateChat: false,
      activeFavoriteChat: false,
      activeBlockedChat: false,
      chatDate: {},
    };
  },
  components: {
    Star,
    Block,
    Delete,
  },
  mounted() {
    this.getChatsAll();
  },
  methods: {
    async getChatsAll() {
      try {
        await this.$axios
          .get("/getChats", {
            params: {},
          })
          .then((res) => {
            this.chatDate = res.data.data;
          });
        this.activeChatAll = true;
        this.activeCompanyChat = false;
        this.activePrivateChat = false;
        this.activeFavoriteChat = false;
        this.activeBlockedChat = false;
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getChatsCompany() {
      try {
        await this.$axios
          .get("/getChats", {
            params: {
              type: "company",
            },
          })
          .then((res) => {
            this.chatDate = res.data.data;
          });
        this.activeChatAll = false;
        this.activeCompanyChat = true;
        this.activePrivateChat = false;
        this.activeFavoriteChat = false;
        this.activeBlockedChat = false;
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getChatsPrivate() {
      try {
        await this.$axios
          .get("/getChats", {
            params: {
              type: "private",
            },
          })
          .then((res) => {
            this.chatDate = res.data.data;
          });
        this.activeChatAll = false;
        this.activeCompanyChat = false;
        this.activePrivateChat = true;
        this.activeFavoriteChat = false;
        this.activeBlockedChat = false;
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getChatsFavorite() {
      try {
        await this.$axios
          .get("/getChats", {
            params: {
              is_favorite: "1",
            },
          })
          .then((res) => {
            this.chatDate = res.data.data;
          });
        this.activeChatAll = false;
        this.activeCompanyChat = false;
        this.activePrivateChat = false;
        this.activeFavoriteChat = true;
        this.activeBlockedChat = false;
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getChatsBlockedChat() {
      try {
        await this.$axios
          .get("/getChats", {
            params: {
              is_blocked: "1",
            },
          })
          .then((res) => {
            this.chatDate = res.data.data;
          });
        this.activeChatAll = false;
        this.activeCompanyChat = false;
        this.activePrivateChat = false;
        this.activeFavoriteChat = false;
        this.activeBlockedChat = true;
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async turnChatFavorite(chatId, favorite) {
      let isFavorite = true;
      if (favorite) {
        isFavorite = false;
      }
      try {
        await this.$axios.post("/turnChatFavorite", {
          chat_id: chatId,
          is_favorite: isFavorite,
        });
        this.getChatsAll();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async turnBlockChat(chatId, block) {
      let isBlock = true;
      if (block) {
        isBlock = false;
      }
      try {
        await this.$axios.post("/turnBlockChat", {
          chat_id: chatId,
          is_blocked: isBlock,
        });
        this.getChatsAll();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async deleteChat(chatId) {
      try {
        await this.$axios.delete("/deleteChat", {
          params: {
            chat_id: chatId,
          },
        });
        this.getChatsAll();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    goToChat(id) {
      this.$router.push(`/dashboard/message/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-dashboard {
  padding: 30px 0 30px 30px;
  width: 80%;

  .activeChat {
    background: #d4e3f6;
    color: $mainThirdColor;
  }

  &__title {
    font-size: $g-second-title-size;
    padding-bottom: 25px;
  }

  &__nav-menu {
    display: flex;
    align-items: center;
  }

  &__nav-item {
    padding: 15px 30px;
    color: $mainColor;

    &:hover {
      cursor: pointer;
    }
  }

  &__message-top-section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 30px;

    div {
      :hover {
        cursor: pointer;
      }
    }

    svg {
      margin-left: 20px;

      :hover {
        cursor: pointer;
      }
    }
  }

  &__message-title-section {
    display: flex;
    width: 80%;

    &:hover {
      cursor: pointer;
    }

    img {
      width: 44px;
      height: 44px;
      margin-right: 20px;
    }
  }

  &__message-medium-section {
    padding: 20px 0 15px 0;

    &:hover {
      cursor: pointer;
    }
  }

  &__message {
    font-size: $g-mobile-size;
    line-height: 16px;
    color: $mainFifthColor;
    width: 70%;

    &:hover {
      cursor: pointer;
    }
  }

  &__message-block {
    border-bottom: 1px solid $mainFourthColor;
    padding-bottom: 20px;
  }

  &__message-count-not-read {
    background: #50b889;
    color: $mainSecondColor;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    height: 45px;
    width: 45px;
  }

  &__message-bottom-section {
    display: flex;
    justify-content: space-between;
  }

  .activeFavorite {
    fill: $mainColor;
  }

  .activeBlocked {
    stroke: red;
  }
}

@media (max-width: $break-xlg) {
  .chat-dashboard {
    width: 100%;
    padding: 25px 5px;

    &__title {
      padding-bottom: 15px;
    }

    &__nav-menu {
      justify-content: space-between;
      flex-wrap: wrap;
    }

    &__nav-item {
      padding: 15px;
    }
  }
}

@media (max-width: $break-sm) {
  .chat-dashboard {
    padding: 25px 7px;

    &__nav-item {
      padding: 15px;
      width: 50%;
      text-align: center;
    }

    &__message-title-section {
      width: 60%;
    }

    &__message-title-block {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__message {
      width: 80%;
    }
  }
}
</style>
