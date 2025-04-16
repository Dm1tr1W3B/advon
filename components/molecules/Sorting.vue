<template>
  <div class="sorting">
    <div class="sorting__display" @click="goToListAdvs">
      <List />
      Список
    </div>
    <div
      class="sorting__display sorting__display-galery"
      @click="goToGaleryAdvs"
    >
      <Galery />
      Галерея
    </div>
    <div class="sorting__display sorting__display-map" @click="goToMapAdvs">
      <Location />
      На карте
    </div>
  </div>
</template>

<script>
import Galery from "@/assets/images/galery.svg?inline";
import Location from "@/assets/images/icons/location.svg?inline";
import List from "@/assets/images/icons/list.svg?inline";

export default {
  name: "Sorting",
  data() {
    return {};
  },
  components: {
    Galery,
    Location,
    List,
  },
  props: {
    goToMapAdvs: {
      type: Function,
      default() {
        return {};
      },
    },
    goToGaleryAdvs: {
      type: Function,
      default() {
        return {};
      },
    },
    goToListAdvs: {
      type: Function,
      default() {
        return {};
      },
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.sorting {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  &__block-sort {
    background: $mainSecondColor;
    border: 1px solid $mainFourthColor;
    width: 264px;
    padding: 10px;
    margin-right: 10px;
    position: relative;

    &:hover {
      cursor: pointer;
    }
  }

  &__sort {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__body-sorting {
    position: absolute;
    left: 0;
    z-index: 2;
    top: 37px;
  }

  &__body-sort {
    width: 264px;
    background: $mainSecondColor;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    z-index: 2;
    top: 47px;
    left: 0;
    div {
      padding: 10px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  &__display {
    display: flex;
    align-items: center;
    margin-left: 20px;

    svg {
      margin-right: 10px;

      rect,
      path {
        fill: #9e9e9e;
      }
    }

    &:hover {
      cursor: pointer;
      color: $mainColor;

      svg {
        rect,
        path {
          fill: $mainColor;
        }
      }
    }
  }
}
</style>
