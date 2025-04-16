<template>
  <div :class="['textarea-input',
    isBordered ? 'textarea-input--bordered' : '',
    isAverage ? 'textarea-input--average' : '']"
  >
    <label :for="label">
      <textarea :id="label" v-model="setValue[id]" :placeholder="placeholder" maxlength="500" />
    </label>
    <div v-if="errorMessages.length">
      <p v-for="error in errorMessages" :key="error.id" class="textarea-input__error">
       {{error}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputTextarea',
  props: {
    isAverage: {
      type: Boolean,
      default: false,
    },
    isBordered: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    setValue: {
      type: Object,
      default() {
        return {};
      },
    },
    errorMessages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.textarea-input {
  textarea {
    width: 100%;
    height: 100px;
    border: none;
    outline: none;
    font-size: 14px;
    padding: 3px 0 16px 16px;
    min-height: 70px;
    resize: none;
    padding: 14px 0 0 15px;
    border: 1px solid #DADADA;

    &::placeholder {
      font-size: 14px;
    }
  }
  &--average {
    input {
      height: 36px;
    }
  }
  &--bordered {
    textarea {
      box-sizing: border-box;
    }
  }
  &__error {
    padding-left: 10px;
  }
}
</style>
