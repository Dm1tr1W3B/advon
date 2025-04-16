<template>
  <div class="about-us">
    <div class="about-us__title">Что такое ADVon.me?</div>
    <div class="about-us__text">
      Advon.me - платформа для сдачи рекламных площадей на частной
      собственности, принадлежащей им, для размещения рекламы стронними лицами,
      фирмами, организациями, функционирующая на территории РФ и других стран
      мира.
    </div>
    <div class="about-us__video">
      <div class="about-us__video_item">
        <div class="about-us__video-title">Исполнителям</div>
        <iframe
          width="555"
          height="315"
          src="https://www.youtube.com/embed/b2_pdTm3EQo"
          title="YouTube video player"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <DefaultButton
          v-if="!isAuthenticated"
          class="about-us__button-registration"
          @click.native="goToRegistration"
        >
          Зарегистрироваться
        </DefaultButton>
      </div>
      <div class="about-us__video_item">
        <div class="about-us__video-title">Рекламодателям</div>
        <iframe
          width="555"
          height="315"
          src="https://www.youtube.com/embed/HT1-D79gSBY"
          title="YouTube video player"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <DefaultButton
          v-if="!isAuthenticated"
          class="about-us__button-registration"
          @click.native="goToRegistration"
        >
          Зарегистрироваться
        </DefaultButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";

export default {
  name: "AboutUs",
  components: {
    DefaultButton,
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    goToRegistration() {
      this.$router.push("/registration");
    },
  },
};
</script>

<style lang="scss" scoped>
.about-us {
  &__title {
    font-size: 36px;
    color: $mainColor;
    line-height: 20px;
    padding: 85px 0 20px 0;
    text-align: center;
  }

  &__text {
    line-height: 18px;
    text-align: center;
    padding: 0 20%;
    margin-bottom: 80px;
  }

  &__video {
    display: flex;
    justify-content: space-between;
    padding-bottom: 50px;
  }

  &__button-registration {
    background: $mainColor;
    margin: 30px auto 80px auto;
  }

  &__video-title {
    font-weight: 500px;
    font-size: $g-second-title-size;
    padding-bottom: 15px;
  }
}

@media (max-width: $break-xlg) {
  .about-us {
    &__text {
      padding: 0;
    }
    &__video_item {
      width: 48%;

      iframe {
        width: 100% !important;
        height: 220px !important;
      }
    }
  }
}

@media (max-width: $break-sm) {
  .about-us {
    padding: 0 6px;
    &__video {
      flex-direction: column;

      iframe {
        width: 100% !important;
      }
    }
    &__title {
      font-size: 18px;
    }
    &__text {
      margin-bottom: 15px;
    }
    &__video_item {
      width: 100%;
    }
  }
}
</style>
