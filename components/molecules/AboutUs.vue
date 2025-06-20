<template>
  <div class="about-us">
    <div class="about-us__title">О компании</div>
    <div class="about-us__main">
      <div class="about-us__text">
        <b>ADVon.me – ваш персональный проводник в мире рекламы!</b>
        <p>Наша платформа позволяет владельцам частной недвижимости сдавать свои площади в аренду для размещения рекламы.
          Это удобный и простой способ монетизировать вашу собственность, предлагая рекламные места компаниям, организациям и частным лицам.
        </p>
        <p>ADVon.me работает не только на территории России, но и в других странах мира, обеспечивая удобную
          коммуникацию между владельцами площадей и рекламодателями. </p>
        <p>Размещайте объявления, находите выгодные предложения и создавайте
          эффективные рекламные кампании — всё это на одной платформе!</p>
      </div>
      <div class="about-us__video">
        <div class="about-us__video_item" v-for="(video, index) in videos">
          <iframe
            width="555"
            height="315"
            :src="getVideoSrc(video)"
            title="YouTube video player"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
          <PlayButton
              v-if="!video.playing && $device.isDesktop"
              @click="playVideo(index)"
              class="about-us__video_play"
          />
          <PlayButtonMobile
              v-if="!video.playing && $device.isMobile"
              @click="playVideo(index)"
              class="about-us__video_play"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import PlayButton from "@/assets/images/play-dynamic-clay.svg?inline";
import PlayButtonMobile from "@/assets/images/play-dynamic-clay_mobile.svg?inline";

export default {
  name: "AboutUs",
  data() {
    return {
      videos: [
        { id: "b2_pdTm3EQo", playing: false },
      ],
    };
  },
  components: {
    DefaultButton,
    PlayButton,
    PlayButtonMobile,
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    goToRegistration() {
      this.$router.push("/registration");
    },
    playVideo(index) {
      this.videos[index].playing = true;
    },
    getVideoSrc(video) {
      return `https://www.youtube.com/embed/${video.id}${video.playing ? '?autoplay=1&modestbranding=1&rel=0' : ''}`;
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
  &__video_item {
    width: 100%;
    height: 315px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
  }
  &__video_play {
    position: absolute;
    width: 180px;
    height: 180px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    cursor: pointer;
    z-index: 2;
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
    &__video_play {
      position: absolute;
      width: 180px;
      height: 180px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -60%);
      cursor: pointer;
      z-index: 2;
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
