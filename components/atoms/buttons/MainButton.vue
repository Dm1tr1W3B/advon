<template>
  <div :class="[
    'main-button',
    isSearchStyleType && 'main-button--search',
    disabled && 'main-button--disabled',
    ]
  ">
    <button class="l-pointer" :type="type" :disabled="disabled">
      <slot />
    </button>
  </div>
</template>
<script>
export default {
  name: 'MainButton',
  props: {
    isSearchStyleType: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button',
    },
  },
};
</script>

<style lang="scss" scoped>
  .main-button {

    max-width: 264px;
    /deep/button {
      width: 100%;
      padding: 14px 9px;
      margin: auto;
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      color: #ffffff;
    }
  }
</style>