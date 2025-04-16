<template>
  <div class="header">
    <div class="header__wrap l-wrap">
      <div v-if="!$device.isDesktop" class="header__burger">
        <Burger @click="handleOpenSideMenu" />
      </div>
      <NuxtLink to="/">
        <Logo />
      </NuxtLink>
      <div class="header__right-block">
        <NavMenu :handleCloseSideMenu="handleCloseSideMenu" :side-menu="sideMenu" />
      </div>
    </div>
  </div>
</template>

<script>
import NavMenu from "@/components/sections/NavMenu.vue";
import Logo from "@/assets/images/logo.svg?inline";
import Burger from "@/assets/images/icons/burger.svg?inline"

export default {
  name: 'Header',
  data() {
    return {
      sideMenu: false,
    }
  },
  components: {
    Logo,
    NavMenu,
    Burger,
  },
  methods: {
    handleOpenSideMenu() {
      this.sideMenu = true;
      document.querySelector('html').classList.add("overflow-block");
    },
    handleCloseSideMenu() {
      this.sideMenu = false;
      document.querySelector('html').classList.remove("overflow-block");
    }
  }
};
</script>

<style lang="scss" scoped>
.header {

  background: $mainSecondColor;
  border-bottom: 1px solid #DADADA;
  &__wrap {
    display: flex;
    position: relative;
    justify-content: space-between;
    padding: 10px 0;
  }
  &__right-block {
    display: flex;
    align-items: center;
  }
  &__burger {
    display: flex;
    align-items: center;
    padding-right: 30px;
  }
}

@media (max-width: $break-lg) {
  .header {
    &__wrap {
      width: 100vw;
      padding: 10px;
    }
  }
}

@media (max-width: $break-sm) {
  .header {
    &__wrap {
      width: 100vw;
      padding: 10px;
    }
  }
}
</style>
