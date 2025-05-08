<template>
  <div class="footer">
    <div class="footer__wrap container">
      <div class="footer__menu">
        <div class="footer__menu-left">
          <div class="footer__menu-top">
            <NuxtLink to="/" class="logo_part">
              <Logo />
            </NuxtLink>
            <NuxtLink to="/" class="footer__menu-item">О нас</NuxtLink>
            <NuxtLink to="/" class="footer__menu-item"
              >Карта</NuxtLink>
            <NuxtLink to="/all-companies" class="footer__menu-item">Компании</NuxtLink>
            <NuxtLink to="/" class="footer__menu-item">Юрликбез</NuxtLink>
            <NuxtLink to="/" class="footer__menu-item">Реклама на сайте</NuxtLink>
            <NuxtLink to="/faq" class="footer__menu-item">FAQ</NuxtLink>
          </div>
        </div>
        <div class="footer__menu-right">
          <div class="footer__menu-item footer__menu-item-social">
            <NuxtLink to="/">
              <WA />
            </NuxtLink>
            <NuxtLink to="/">
              <Vk />
            </NuxtLink>
            <NuxtLink to="/">
              <Telegram />
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="footer__copy">
        <div>Служба поддержки: <a href="mailto:example@postbox.ru">example@postbox.ru</a></div>
        <div><a href="">Политика конфиденциальности</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vk from "@/assets/images/icons/VK.svg?inline";
import WA from "@/assets/images/icons/WA.svg?inline";
import Telegram from "@/assets/images/icons/TG.svg?inline";
import Logo from "@/assets/images/icons/Logo_footer.svg?inline";

export default {
  name: "Footer",
  components: {
    WA,
    Vk,
    Telegram,
    Logo,
  },
};
</script>

<style lang="scss" scoped>
.footer {
  background: $mainSecondColor;
  width: 100%;
  &__copy {
    color: $mainFifthColor;
    text-align: center;
    padding-bottom: 10px;
  }

  &__menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 35px 0;
  }
  &__menu-left {
    flex-grow: 1;
  }

  &__menu-top,
  &__menu-bottom {
    display: flex;
    justify-content: space-between;
  }

  &__menu-top {
    padding-bottom: 10px;
  }

  &__menu-item {
    width: 100%;
    color: $mainFifthColor;
    padding-top: 10px;
  }
  svg {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: $break-xlg) {
  .footer {
    &__menu {
      flex-direction: column;
    }
    &__menu-right {
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .footer__menu-item {
        width: auto;
      }
      .footer__menu-item-social {
        padding-top: 20px;
      }
    }
  }
}

@media (max-width: $break-lg) {
  .footer {
    padding: 0 10px;
  }
}

@media (max-width: $break-sm) {
  .footer {
    &__copy {
      font-size: $g-mobile-size;
      padding: 15px 15%;
    }

    &__menu {
      padding: 15px 0 0 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &__menu-left {
      padding: 0 6px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .footer__menu-item {
        width: auto;
      }
    }

    &__menu-right {
      padding-top: 15px;

      .footer__menu-item-social {
        padding-top: 15px;
      }
    }

    &__menu-top,
    &__menu-bottom {
      display: flex;
      flex-direction: column;

      a {
        padding-bottom: 10px;
      }
    }
  }
}
</style>
