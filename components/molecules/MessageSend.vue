<template>
  <div class="message-send__overlay" @click.self="handleCloseModal">
    <div class="message-send__container">
      <CloseModal @click="handleCloseModal" class="message-send__close" />
      <div class="message-send__text">
        <div class="message-send__text-header"><Check class="message-send__check" />Ваше сообщение отправлено</div>
        <div class="message-send__text-main">Вы можете увидеть ваши диалоги в личном кабинете в разделе <NuxtLink to="/dashboard/chat">Сообщения</NuxtLink></div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseModal from "@/assets/images/icons/close-modal.svg?inline";
import Check from "@/assets/images/check.svg?inline";

export default {
  name: "MessageSend",
  props: {
    close: {
      type: [Function, Boolean],
      default: false,
    }
  },
  components: {
    CloseModal,
    Check,
  },
  methods: {
    handleCloseModal() {
      this.close();
    },
  },
}
</script>

<style lang="scss" scoped>
.message-send {
  &__overlay {
    position: fixed;
    inset: 0;
    background: rgba(#000000, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__container {
    position: relative;
    max-width: 558px;
    padding: 80px 80px;
    background: $mainSecondColor;
  }

  &__close {
    position: absolute;
    top: 15px;
    right: 15px;

    &:hover {
      opacity: 0.7;
    }
  }

  &__text-header {
    padding-bottom: 5px;
    text-align: center;
  }

  &__check {
    margin-right: 10px;
  }

  &__text-main {
    text-align: center;
    line-height: 20px;

    a {
      color: $mainColor;
    }
  }
}
@media (max-width: $break-sm) {
  .message-send {
    &__container {
      width: 90%;
    }
  }
}
</style>
