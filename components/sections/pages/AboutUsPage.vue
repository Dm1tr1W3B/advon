<template>
  <div class="about">
    <div class="about__title">О нас</div>
    <div class="about__main">
      <b>ADVon.me – ваш персональный проводник в мире рекламы!</b>
      <div class="about__text">
        <p>Наша платформа позволяет владельцам частной недвижимости сдавать свои площади в аренду для размещения рекламы.
          Это удобный и простой способ монетизировать вашу собственность, предлагая рекламные места компаниям,
          организациям и частным лицам.
        </p>
        <p>ADVon.me работает не только на территории России, но и в других странах мира, обеспечивая удобную
          коммуникацию между владельцами площадей и рекламодателями. </p>
        <p>Размещайте объявления, находите выгодные предложения и создавайте
          эффективные рекламные кампании — всё это на одной платформе!</p>
      </div>
    </div>
    <div class="about__video">
      <div class="about__video_item">
        <PlayButton />
        <iframe
          width="100%"
          src="https://www.youtube.com/embed/b2_pdTm3EQo"
          title="YouTube video player"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      <div class="about__video_item">
        <PlayButton />
        <iframe
          width="100%"
          src="https://www.youtube.com/embed/b2_pdTm3EQo"
          title="YouTube video player"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import PlayButton from "@/assets/images/play-dynamic-clay.svg?inline";

export default {
  name: "About",
  components: {
    DefaultButton,
    PlayButton,
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
.about {
  &__title {
    font-size: 32px;
    line-height: 20px;
    margin-top: 40px;
  }

  &__text {
    line-height: 18px;
    color: #6D7885;
  }
  &__main {
    margin: 20px 0 40px;
  }
  &__text {
    display: flex;
    flex-direction: column;
    width: 60%;
    gap: 12px;
    margin-top: 20px;
  }
  &__video {
    display: flex;
    flex-direction: column;
    padding-bottom: 50px;
    width: 100%;
    gap: 40px;
  }
  &__video_item {
    width: 100%;
    height: 720px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
  }
  &__video_item svg {
    position: absolute;
    width: 220px;
    height: 220px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__video_item iframe {
    width: 100%;
    height: 100%;
  }

  &__video-title {
    font-weight: 500;
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
