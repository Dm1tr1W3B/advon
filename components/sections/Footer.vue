<template>
  <div class="footer">
    <div class="footer__wrap l-wrap">
      <div class="footer__menu">
        <div class="footer__menu-left">
          <div class="footer__menu-top">
            <NuxtLink to="/" class="footer__menu-item">Исполнители</NuxtLink>
            <NuxtLink to="/cooperation" class="footer__menu-item"
              >Сотрудничество</NuxtLink
            >
            <NuxtLink to="/contacts" class="footer__menu-item">Контакты</NuxtLink>
            <NuxtLink to="/" class="footer__menu-item">Блог</NuxtLink>
          </div>
          <div class="footer__menu-bottom">
            <NuxtLink to="/" class="footer__menu-item">Рекламодатели</NuxtLink>
            <NuxtLink to="/" class="footer__menu-item">Услуги</NuxtLink>
            <NuxtLink to="/faq" class="footer__menu-item">FAQ</NuxtLink>
            <NuxtLink to="/legal-information" class="footer__menu-item"
              >Юридическая справка</NuxtLink
            >
          </div>
        </div>
        <div class="footer__menu-right">
          <div class="footer__menu-item footer__menu-item-social-title">
            Мы в соцсетях
          </div>
          <div class="footer__menu-item footer__menu-item-social">
            <NuxtLink to="/">
            <Facebook />
            </NuxtLink>
            <NuxtLink to="/">
              <Vk />
            </NuxtLink>
            <NuxtLink to="/">
              <span class="footer__svg-istagram">
                <Instagram />
              </span>
            </NuxtLink>
            <NuxtLink to="/">
              <Twiter />
            </NuxtLink>
            <NuxtLink to="/">
              <Odnoclasniki />
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="footer__copy">
        2021 - ADVon.me - все права защищены © . Свидетельство №2019613383
      </div>
    </div>
  </div>
</template>

<script>
import Facebook from "@/assets/images/social/facebook.svg?inline";
import Vk from "@/assets/images/social/vk.svg?inline";
import Instagram from "@/assets/images/social/instagram.svg?inline";
import Twiter from "@/assets/images/social/twiter.svg?inline";
import Odnoclasniki from "@/assets/images/social/odnoclasniki.svg?inline";

export default {
  name: "Footer",
  components: {
    Facebook,
    Vk,
    Instagram,
    Twiter,
    Odnoclasniki,
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
