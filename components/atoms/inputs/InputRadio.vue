<template>
  <div>
    <div :class="['radio', disabled && 'radio--disabled']">
      <div class="radio__radio-container">
        <input
          type="radio"
        >
        <div
          @click="setValue[id] = !setValue[id]"
          :class="['radio__radio',
          setValue[id] && 'radio__radio--checked']"
          >
          <RadioDot v-if="setValue[id]" />
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
import RadioDot from '@/assets/images/icons/radio-dot.svg?inline';

export default {
  name: 'InputRadio',
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
      type: String,
      default() {
        return '';
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
    RadioDot,
  },
};
</script>

<style lang="scss" scoped>
  .radio {
    display: flex;

    input {
      display: none;
    }

    &__radio {
      position: relative;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1px solid $mainFourthColor;
      box-sizing: border-box;

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
    }
  }

</style>
