<template>
  <div class="collapse-item__wrap">
      <div class="collapse-item__title-section" @click="activeSection">
        <div>
          {{ title }}
        </div>
        <Plus v-if="!isActive" />
        <Minus v-if="isActive" />
      </div>
      <div class="collapse-item__body-section" v-if="isActive">
        <div>
          {{ body }}
        </div>
      </div>
  </div>
</template>

<script>
import Plus from "@/assets/images/icons/plus.svg?inline";
import Minus from "@/assets/images/icons/minus.svg?inline";
export default {
  name: "CollapseItem",
  data() {
    return {
      isActive: false,
    }
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    body: {
      type: String,
      default: "",
    }
  },
  components: {
    Plus,
    Minus,
  },
  methods: {
    activeSection() {
      if (this.isActive === false) {
        this.isActive = true;
      } else this.isActive = false;
    },
  },
}
</script>

<style lang="scss" scoped>
  .collapse-item {
    &__wrap {
    margin-bottom: 20px;
    }

    &__title-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: $mainSecondColor;
      padding: 25px;
      line-height: 24px;
      font-size: $g-font-third-size;

      div {
        width: 75%;
      }
    }

    &__body-section {
      line-height: 20px;
      background: $mainSecondColor;
      padding: 25px;
      border-top: 1px solid $mainFourthColor;

      div {
        width: 75%;
      }
    }
  }

  @media (max-width: $break-sm) {
    .collapse-item {
      &__wrap {
        margin-bottom: 8px;
      }

      &__title-section {
        padding: 15px 7px;
        div {
          width: 85%;
          font-size: 12px;
          line-height: 16px;
        }
      }

      &__body-section {
        padding: 15px 7px;

        div {
          width: 100%;
          font-size: 12px;
          line-height: 16px;
        }
      }
    }
  }
</style>
