<template>
  <div class="file-container">
    <div class="file-container__icon" >
      <!-- <FileDeleteIcon @click="deleteCallBack"/> -->
      <div @click="deleteCallBack">Hello</div>
    </div>
    <div class="file-container__file-name">
      <p>{{ fileName }}</p>
      <div class="file-container__upload-status"></div>
    </div>
  </div>
</template>
<script>
// import FileDeleteIcon from '../assets/images/icons/file_delete.svg';
export default {
  name: 'FileContainer',
  props: {
    fileName: {
      type: String,
      default: '',
    },
    deleteCallBack: {
      type: Function,
      default() {
        return {};
      },
    },
  },
  components: {
    // FileDeleteIcon,
  },
};
</script>
<style lang="scss" scoped>
  .file-container {
    width: 50%;
    display: flex;
    align-items: center;
    &__icon {
      width: 20%;
    }
    &__file-name {
      width: 100%;
    }
    &__upload-status {
      width: 100%;
      height: 2px;
      background: rgba(42, 49, 51, 0.1);
    }
  }
</style>