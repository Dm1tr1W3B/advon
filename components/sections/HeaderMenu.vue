<template>
  <div class="header-menu">
    <NuxtLink to="/dashboard/ads" class="header-menu__ads">
      Объявления
    </NuxtLink>
    <NuxtLink to="/dashboard/favorites" class="header-menu__favorites">
      Избранные
    </NuxtLink>
    <NuxtLink to="/dashboard/chat" class="header-menu__chat">
      Сообщения
    </NuxtLink>
    <div class="header-menu__bill-block" @click="isSubMenuOpen">
      <span>
        Счёт
<!--        <span class="header-menu__bill"> {{ loggedInUser.balance }} ₽</span>-->
      </span>
    </div>
    <div class="header-menu__sub-menu" v-if="isSubMenu">
      <NuxtLink to="/dashboard/history" class="header-menu__">История операций </NuxtLink>
      <NuxtLink to="" class="header-menu__">Просмотры контактов </NuxtLink>
    </div>
    <NuxtLink to="/dashboard/bonus" class="header-menu__bonus">
      Бонусы
    </NuxtLink>
    <NuxtLink
      to="/dashboard/subscriptions"
      class="header-menu__subscriptions"
    >
      Подписки
    </NuxtLink>
    <NuxtLink to="/dashboard/my-page" class=""> Моя страница </NuxtLink>
    <NuxtLink to="/dashboard/profile" class="header-menu__profile">
      Мой профиль
    </NuxtLink>
    <NuxtLink
      to="/dashboard/customization"
      class="header-menu__customization"
    >
      Настройки
    </NuxtLink>
    <NuxtLink to="/dashboard/my-company" class="header-menu__my-company">
      Моя компания
    </NuxtLink>
    <DefaultButton
      v-if="!$device.isDesktop"
      class="header-menu__button-add-company"
      @click.native="createCompany"
    >
      Создать компанию
    </DefaultButton>
    <div
      class="header-menu__info-text"
      v-if="!loggedInUser.is_full_registration && !$device.isDesktop"
    >
      Ваш профиль заполнен не полностью
    </div>
    <div
      class="header-menu__fill-profile"
      v-if="!loggedInUser.is_full_registration && !$device.isDesktop"
    >
      <NuxtLink to="/dashboard/edit-profile"> Заполнить </NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import SelectArrow from "@/assets/images/arrow/select-arrow.svg?inline";
import SelectArrowTop from "@/assets/images/arrow/select-arrow-top.svg?inline";

export default {
  name: "HeaderMenu",
  data() {
    return {
      isSubMenu: false,
    };
  },
  components: {
    DefaultButton,
    SelectArrow,
    SelectArrowTop,
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
  methods: {
    createCompany() {
      this.$router.push("/dashboard/create-company");
    },
    Logout() {
      this.$auth.logout();
      this.$router.push("/");
    },
    isSubMenuOpen() {
      if (this.isSubMenu === false) {
        this.isSubMenu = true;
      } else this.isSubMenu = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.header-menu {
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  background: $mainSecondColor;
  box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 39px;
  width: 230px;
  left: 10px;
  z-index: 2;

  a {
    padding: 10px 20px;
    font-size: $g-font-second-size;
    color: $mainThirdColor;

    &:hover {
      background: #d4e3f6;
    }
  }

  &__fill-profile a {
    font-size: $g-font-base-size;
    color: $mainColor;

    &:hover {
      background: none;
    }
  }

  &__button-add-company {
    width: 190px;
    background: $mainColor;
    margin: 20px 0 0 20px;
  }

  &__info-text {
    padding: 30px 0 0 20px;
    color: black;
  }

  &__fill-profile {
    padding: 10px 0;
  }

  &__fill-profile a {
    font-size: $g-font-base-size;
    color: $mainColor;

    &:hover {
      background: none;
      text-decoration: underline;
    }
  }

  &__bill {
    color: $mainColor;
    font-weight: bold;
    padding-left: 5px;
  }

  &__logout {
    border-top: 1px solid $mainFourthColor;
    padding: 15px 20px;
    color: $mainFifthColor;
    font-size: $g-font-second-size;

    &:hover {
      color: $mainColor;
    }
  }

  &__bill-block {
    padding: 10px 20px;
    font-size: $g-font-second-size;
    color: $mainThirdColor;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      cursor: pointer;
      background: #d4e3f6;
    }
  }

  &__sub-menu {
    margin-left: 10px;
    a {
      font-size: $g-font-base-size;
      display: inline-block;
    }
  }
}
@media (max-width: $break-xlg) {
  .header-menu {
    position: fixed;
    top: 0;
    right: 0;
    left: auto;
    height: 100%;
  }
  .header-menu__overlay {
    position: fixed;
    inset: 0;
    background: rgba(#000000, 0.4);
    z-index: 100;
  }
  .header-menu__button-add-company {
    margin-bottom: 10px;
  }
}
@media (max-width: $break-sm) {
  .header-menu {
    right: auto;
    left: 0;
  }
}
</style>
