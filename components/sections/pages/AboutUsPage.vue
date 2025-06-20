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
      <div
          class="about__video_item"
          v-for="(video, index) in videos"
          :key="index"
      >
        <iframe
            :src="getVideoSrc(video)"
            title="YouTube video player"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
        ></iframe>
        <PlayButton
            v-if="!video.playing"
            @click="playVideo(index)"
            class="about__video_play"
        />
        <PlayButtonMobile
            v-if="!video.playing && $device.isMobile"
            @click="playVideo(index)"
            class="about-us__video_play"
        />
      </div>
    </div>
    <div class="section">
      <h2>Мы в соцсетях</h2>
      <p class="social_subtitle">
        Присоединяйтесь к нам в социальных сетях – всё самое актуальное и важное в одном месте. <br>
        Будьте ближе к нам — вместе интереснее!
      </p>
      <div v-swiper:socialSwiper="optionSocial" class="about-us__social swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide social-item shadow_effect" v-for="(item, i) in socialLinks" :key="i">
            <component :is="item.icon" class="social-icon" />
            <button class="social_button">Перейти</button>
          </div>
        </div>
      </div>
    </div>
    <div class="reviews">
      <h2>Отзывы о нас и как мы помогаем людям зарабатывать на рекламе </h2>
      <Review />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import Review from "@/components/molecules/Reviews.vue";
import PlayButton from "@/assets/images/play-dynamic-clay.svg?inline";
import PlayButtonMobile from "@/assets/images/play-dynamic-clay_mobile.svg?inline";
import FbAbout from "@/assets/images/fb_about.svg?inline";
import InstaAbout from "@/assets/images/insta_about.svg?inline";
import VkAbout from "@/assets/images/vk_about.svg?inline";
import YoutubeAbout from "@/assets/images/youtube_about.svg?inline";

export default {
  name: "About",
  data() {
    return {
      videos: [
        { id: "b2_pdTm3EQo", playing: false },
        { id: "b2_pdTm3EQo", playing: false },
      ],
      socialLinks: [
        { title: 'facebook', icon: FbAbout },
        { title: 'instagram', icon: InstaAbout },
        { title: 'vk', icon: VkAbout },
        { title: 'youtube', icon: YoutubeAbout }
      ],
      optionSocial: {
        slidesPerView: 2,
        spaceBetween: 20,
        breakpoints: {
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        },
      },
    };
  },
  components: {
    DefaultButton,
    PlayButton,
    PlayButtonMobile,
    FbAbout,
    InstaAbout,
    VkAbout,
    YoutubeAbout,
    Review,
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
  &__video_play {
    position: absolute;
    width: 220px;
    height: 220px;
    top: 50%;
    left: 50%;
    transform: translate(-48%, -50%);
    cursor: pointer;
    z-index: 2;
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
  .section {
    padding: 40px 0;
  }
  .section h2 {
    font-size: 32px;
    margin-bottom: 20px;
    font-weight: 600;
  }
  .section .social_subtitle {
    color: #6D7885;
    margin-bottom: 30px;
    font-size: 16px;
  }

  .about-us__social.swiper-container {
    overflow: visible;
  }
  .about-us__social .social-item {
    padding: 32px !important;
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: space-between;
  }
  .social-item i.icon {
    font-size: 24px;
  }
  .social_button {
    padding: 9px;
    border: 1px solid #d10000;
    background: transparent;
    border-radius: 8px;
    cursor: pointer;
    width: calc(100% - 65px);
  }
  .swiper-button-prev, .swiper-button-next {
    position: absolute;
    top: -30px;
  }
  .swiper-button-prev {
    right: 50px;
    left: unset;
  }
  .swiper-button-prev:after, .swiper-button-next:after {
    font-size: 10px;
    color: #000 !important;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 10px 10px 30px rgba(0,0,0, 0.2), -10px -10px 30px #fff;
    border-radius: 50%;
  }
  .swiper-button-prev, .swiper-button-next {
    color: #000;
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
