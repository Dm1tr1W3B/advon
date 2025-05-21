<template>
  <div>
    <div :class="['checkbox-input', disabled && 'checkbox-input--disabled']">
      <div class="checkbox-input__checkbox-container">
        <input
          type="checkbox"
          :id="id" v-model="setValue[id]"
          :value="setValue[id]"
          :disabled="disabled"
        >
        <div
          @click="setValue[id] = !setValue[id]"
          :class="['checkbox-input__checkbox',
          setValue[id] && 'checkbox-input__checkbox--checked']"
          >
          <Check v-if="setValue[id]" />
        </div>
      </div>
      <label :for="id">{{ label }}<slot/></label>
    </div>
    <div v-if="errorMessages.length">
      <p v-for="error in errorMessages" :key="error.id">
       {{error}}
      </p>
    </div>
  </div>
</template>

<script>
import Check from '@/assets/images/icons/checked.svg?inline';

export default {
  name: 'InputCheckboxMain',
  props: {
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Check,
  },
};
</script>

<style lang="scss" scoped>
  .checkbox-input {
    display: flex;

    input {
      display: none;
    }

    &__checkbox {
      position: relative;
      width: 18px;
      height: 18px;
      border: 1px solid $mainFourthColor;
      box-sizing: border-box;
      background: $mainSecondColor;

      &--checked {
      }

      &:hover {
        cursor: pointer;
      }

      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    &--disabled {

      label {
        color: $mainFourthColor;
        margin-left: 10px;
        display: flex;
        align-items: center;
      }
    }

    label {
      margin-left: 10px;
      display: flex;
      align-items: center;

      &:hover {
        cursor: pointer;
      }
    }
  }

</style>
