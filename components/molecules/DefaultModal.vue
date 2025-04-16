<template>
  <div class="modal" @click.self="handleCloseModal">
    <div class="modal-container">
      <CloseModal @click="handleCloseModal" class="close-modal-btn" />
      <slot />
    </div>
  </div>
</template>

<script>
import CloseModal from "@/assets/images/icons/close-modal.svg?inline";

export default {
  name: 'DefaultModal',
  props: {
    onClose: {
      type: Function,
      default() {
        return {};
      },
    },
  },
  components: {
    CloseModal,
  },
  methods: {
    handleCloseModal() {
      this.onClose();
    },
  },
};
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1500;

    .modal-container {
      position: absolute;
      top: 50%;
      left: 50%;
      padding: 30px;
      transform: translate(-50%, -50%);
      background: $mainSecondColor;
    }

    svg {
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;
    }
  }
</style>
