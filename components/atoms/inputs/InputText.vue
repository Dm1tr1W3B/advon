<template>
  <div :class="['text-default-input',
    isBordered ? 'text-default-input--bordered' : '',
    isAverage ? 'text-default-input--average' : '',
    disabled ? 'text-default-input--disabled' : ''
    ]"
  >
    <label :for="label">
      <input
        v-if="onChange"
        :id="label"
        @change="e => onChange(e.target.value)"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
      >
      <input
        v-else
        :id="label"
        v-model="setValue[id]"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        :autocomplete="autocomplete ? '' : 'new-password'"
      >
    </label>
    <div v-if="errorMessages.length">
      <p v-for="error in errorMessages" :key="error.id" class="text-default-input__error">
       {{error}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputText',
  props: {
    isAverage: {
      type: Boolean,
      default: false,
    },
    isBordered: {
      type: Boolean,
      default: false,
    },
    autocomplete: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    maxlength: {
      type: Number,
      default: 999,
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
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
    disabled: {
      type: Boolean,
      default: false,
    },
    onChange: {
      type: [Function, Boolean],
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
  .text-default-input {

    /deep/input {
      background: #FFFFFF;
      border: 1px solid #B6B9C9;
      box-sizing: border-box;
      padding: 14px 9px;
      width: 100%;
      max-width: 362px;

      &::placeholder {
        color: #C4C4C4;
      }
    }

    input:focus-visible {
      outline: none!important;
    }
  }
</style>
