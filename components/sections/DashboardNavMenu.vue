<template>
  <div class="dashboard-nav-menu dashboard_nav_menu">
    <NuxtLink to="/dashboard/ads" class="dashboard-nav-menu__ads">
      Объявления
    </NuxtLink>
    <NuxtLink to="/dashboard/favorites" class="dashboard-nav-menu__favorites">
      Избранные
    </NuxtLink>
    <NuxtLink to="/dashboard/chat" class="dashboard-nav-menu__chat">
      Сообщения
    </NuxtLink>
    <div class="dashboard-nav-menu__bill-block" @click="isSubMenuOpen">
      <span>
        Счёт
<!--        <span class="dashboard-nav-menu__bill">-->
<!--          {{ loggedInUser.balance }} ₽-->
<!--        </span>-->
      </span>
<!--      <SelectArrow class="dashboard-nav-menu__arrow" v-if="!isSubMenu" />-->
<!--      <SelectArrowTop class="dashboard-nav-menu__arrow" v-if="isSubMenu" />-->
    </div>
    <div class="dashboard-nav-menu__sub-menu" v-if="isSubMenu">
      <NuxtLink to="/dashboard/history" class="dashboard-nav-menu__"> История операций </NuxtLink>
      <NuxtLink to="" class="dashboard-nav-menu__">
        Просмотры контактов
      </NuxtLink>
    </div>
    <NuxtLink to="/dashboard/bonus" class="dashboard-nav-menu__bonus">
      Бонусы
    </NuxtLink>
<!--    <NuxtLink-->
<!--      to="/dashboard/subscriptions"-->
<!--      class="dashboard-nav-menu__subscriptions"-->
<!--    >-->
<!--      Подписки-->
<!--    </NuxtLink>-->
<!--    <NuxtLink to="/dashboard/my-page" class=""> Моя страница </NuxtLink>-->
<!--    <NuxtLink to="/dashboard/profile" class="dashboard-nav-menu__profile">-->
<!--      Мой профиль-->
<!--    </NuxtLink>-->
    <NuxtLink
      to="/dashboard/customization"
      class="dashboard-nav-menu__customization"
    >
      Настройки
    </NuxtLink>
    <NuxtLink to="/dashboard/my-company" class="dashboard-nav-menu__my-company">
      Моя компания
    </NuxtLink>
    <div class="ads-dashboard__button-create-adv" @click="createAdv">
      Создать объявление
    </div>
    <DefaultButton
      class="dashboard-nav-menu__button-add-company"
      @click.native="createCompany"
    >
      Создать компанию
    </DefaultButton>
    <div class="header-menu__logout" @click="Logout" v-if="$device.isDesktop">
      <Logout />
      Выйти
    </div>
<!--    <div-->
<!--      class="dashboard-nav-menu__info-text"-->
<!--      v-if="!loggedInUser.is_full_registration"-->
<!--    >-->
<!--      Ваш профиль заполнен не полностью-->
<!--    </div>-->
<!--    <div-->
<!--      class="dashboard-nav-menu__fill-profile"-->
<!--      v-if="!loggedInUser.is_full_registration"-->
<!--    >-->
<!--      <NuxtLink to="/dashboard/edit-profile"> Заполнить </NuxtLink>-->
<!--    </div>-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import SelectArrow from "@/assets/images/arrow/select-arrow.svg?inline";
import SelectArrowTop from "@/assets/images/arrow/select-arrow-top.svg?inline";
import Logout from "@/assets/images/icons/Logout.svg?inline";

export default {
  name: "DashboardNavMenu",
  data() {
    return {
      isSubMenu: false,
    };
  },
  components: {
    DefaultButton,
    SelectArrow,
    SelectArrowTop,
    Logout,
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
  methods: {
    createCompany() {
      this.$router.push("/dashboard/create-company");
    },
    createAdv() {
      this.$router.push("/dashboard/create-ad");
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
.dashboard-nav-menu {
  display: flex;
  flex-direction: column;
  width: 20%;
  padding: 0 0 10px 0;
  background: $mainSecondColor;
  box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.1);

  a {
    padding: 10px 20px;
    font-size: $g-font-second-size;
    color: $mainThirdColor;

    &:hover {
      background: #d4e3f6;
    }
  }

  &__bill-block {
    padding: 10px 20px;
    font-size: $g-font-second-size;
    color: $mainThirdColor;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
      cursor: pointer;
      background: #d4e3f6;
    }
  }

  &__button-add-company {
    width: 190px;
    background: $mainColor;
    margin: 20px 0 0 20px;
  }

  &__info-text {
    padding: 30px 0 0 20px;
  }

  &__fill-profile {
    padding-top: 10px;
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

  &__sub-menu {
    margin-left: 10px;
    a {
      font-size: $g-font-base-size;
      display: inline-block;
    }
  }
}
</style>