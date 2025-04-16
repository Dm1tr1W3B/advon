<template>
  <div class="input-file-with-text-multi">
    <div class="input-file-with-text-multi__input-container">
      <InputText
        :id="textInputId"
        :set-value="inputSetValue"
        :placeholder="textInputPlaceholder"
      />
    <div class="input-file-with-text-multi__file-input">
      <input :id="fileInputId"
        :ref="fileInputId"
        accept="image/png,image/gif,image/jpeg,image/webp,image/svg,image/bmp"
        type="file"
        @change="previewFiles"
        multiple
      >
      <label :for="fileInputId">
        <!-- <FileAddIcon /> -->
        Загрузить
      </label>
    </div>
    </div>
    <p>
      <MainButton @click.native="$router.push('')">
        Какие файлы нужно прикрепить?
      </MainButton>
      Укажите актуальные данные
    </p>
    <div v-if="inputSetValue[fileInputId]"
      class="input-file-with-text-multi__files-container"
    >
      <FileContainer
        v-for="file in inputSetValue[fileInputId]"
        :key="file.id"
        :file-name="file.name"
        :delete-call-back="() => deleteFile(file)"
      />
    </div>
  </div>
</template>
<script>
// import FileAddIcon from '../assets/images/icons/file_add.svg';
import InputText from '../atoms/inputs/InputText';
import MainButton from '../atoms/buttons/MainButton.vue';
import FileContainer from '../atoms/inputs/FileContainer.vue';
export default {
  name: 'InputFileWithTextMulti',
  props: {
    textInputId: {
      type: String,
      default: '',
    },
    textInputPlaceholder: {
      type: String,
      default: '',
    },
    inputSetValue: {
      type: Object,
      default() {
        return {};
      },
    },
    fileInputId: {
      type: String,
      default: '',
    },
  },
  components: {
    // FileAddIcon,
    InputText,
    MainButton,
    FileContainer,
  },
  methods: {
    previewFiles() {
      const { fileInputId } = this;
      this.inputSetValue[fileInputId] = Array.from(this.$refs[fileInputId].files).map((file) => file);
    },
    deleteFile(file) {
      const { fileInputId } = this;
      this.inputSetValue[fileInputId] = this.inputSetValue[fileInputId].filter((el) => el.name !== file.name);
    },
  },
};
</script>
<style lang="scss" scoped>
  .input-file-with-text-multi {
    &__input-container {
      position: relative;
    }
    &__file-input {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      input {
        display: none;
      }
    }
    &__files-container {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
  }
</style>