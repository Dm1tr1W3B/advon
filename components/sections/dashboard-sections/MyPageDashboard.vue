<template>
  <div class="user-detail-list l-wrap" v-if="this.userDatail.main">
    <div v-if="$device.isDesktop">
      <div class="user-detail-list__go-to-profile" @click="goToProfile">
        Вернуться в Мой профиль
      </div>
      <div class="user-detail-list__title">
        {{ this.userDatail.main.user_name }}
      </div>
      <div class="user-detail-list__service-info-block-left">
        <div class="user-detail-list__location-block">
          <Location />
          <div>{{ this.userDatail.main.city }}</div>
          <div class="user-detail-list__date-add">
            Добавлено {{ this.userDatail.main.created_at }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="user-detail-list__main-wrap"
      v-if="this.userDatail.main.additional_photos"
    >
      <div class="user-detail-list__main-left">
        <div v-if="this.userDatail.main.additional_photos.length">
          <VueSlickCarousel ref="c1" :asNavFor="$refs.c2" :focusOnSelect="true">
            <div
              v-for="photo in this.userDatail.main.additional_photos"
              :key="photo.id"
              class="user-detail-list__slider-big-container"
            >
              <img
                :src="photo.photo_url"
                alt=""
                class="user-detail-list__slider-big"
              />
            </div>
          </VueSlickCarousel>
          <VueSlickCarousel
            ref="c2"
            :asNavFor="$refs.c1"
            :slidesToShow="this.userDatail.main.additional_photos.length"
            :focusOnSelect="true"
            v-if="$device.isDesktop"
          >
            <div
              v-for="photo in this.userDatail.main.additional_photos"
              :key="photo.id"
            >
              <img
                :src="photo.photo_url"
                alt=""
                class="user-detail-list__slider-small"
              />
            </div>
          </VueSlickCarousel>
          <div v-if="!$device.isDesktop">
            <div class="user-detail-list__title">
              {{ this.userDatail.main.user_name }}
            </div>
            <div class="user-detail-list__service-info-block-left">
              <div class="user-detail-list__location-block">
                <Location />
                <div>{{ this.userDatail.main.city }}</div>
                <div class="user-detail-list__date-add">
                  Добавлено {{ this.userDatail.main.created_at }}
                </div>
              </div>
            </div>
          </div>
          <div class="user-detail-list__description">
            <div class="user-detail-list__title">Описание</div>
            <div>
              {{ this.userDatail.main.user_description }}
            </div>
          </div>
        </div>
      </div>
      <div class="user-detail-list__main-right">
        <div class="user-detail-list__person-block">
          <div>
            <img
              :src="this.userDatail.person.avatar"
              alt=""
              class="user-detail-list__person-avatar"
            />
          </div>
          <div>
            <div>
              {{ this.userDatail.person.name }}
            </div>
            <div>На advon с {{ this.userDatail.person.created_at }}</div>
          </div>
        </div>
        <div class="user-detail-list__decore-line"></div>
        <div v-if="this.userDatail.person.phone">Контакты</div>
        <div
          class="user-detail-list__phone-block"
          v-if="this.userDatail.person.phone"
        >
          <div>
            <Phone />
            {{ this.userDatail.person.phone }}
          </div>
        </div>
        <div class="user-detail-list__contacts-block">
          <div
            v-for="contact in this.userDatail.person.contacts"
            :key="contact.id"
          >
            <img :src="contact.photo_url" alt="" />
            <div>
              {{ contact.values }}
            </div>
          </div>
        </div>
        <div class="user-detail-list__decore-line"></div>
        <div class="user-detail-list__social-block">
          <div>Поделиться:</div>
          <div>
            <Facebook />
            <Vk />
            <Twiter />
            <Odnoclasniki />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Location from "@/assets/images/icons/location.svg?inline";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import Search from "@/assets/images/icons/search.svg?inline";
import InputCheckbox from "@/components/atoms/inputs/InputCheckboxMain.vue";
import SelectArrow from "@/assets/images/arrow/select-arrow.svg?inline";

import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

import Phone from "@/assets/images/icons/phone.svg?inline";
import Facebook from "@/assets/images/social/facebook.svg?inline";
import Vk from "@/assets/images/social/vk.svg?inline";
import Twiter from "@/assets/images/social/twiter.svg?inline";
import Odnoclasniki from "@/assets/images/social/odnoclasniki.svg?inline";

import SmallCardHorizontal from "@/components/molecules/SmallCardHorizontal.vue";

export default {
  name: "UserDetailList",
  data() {
    return {
      userDatail: {},
      complaintList: {},
      complaintAdvData: false,
      formDataComplain: {
        complainTypeList: {},
      },
      settingsAds: {
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              arrows: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
            },
          },
        ],
      },
    };
  },
  components: {
    Location,
    DefaultButton,
    Search,
    VueSlickCarousel,
    Phone,
    Odnoclasniki,
    Twiter,
    Vk,
    Facebook,
    InputCheckbox,
    SelectArrow,
    SmallCardHorizontal,
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
  mounted() {
    this.getUserForGuest();
  },
  methods: {
    async getUserForGuest() {
      try {
        await this.$axios
          .get("/getUserForGuest", {
            params: {
              user_id: this.loggedInUser.id,
            },
          })
          .then((res) => {
            this.userDatail = res.data.data;
          });
      } catch (e) {
        this.error = e.response;
      }
    },
    goToProfile() {
      this.$router.push('/dashboard/profile')
    }
  },
};
</script>

<style lang="scss" scoped>
.user-detail-list {
  &__title {
    font-size: $g-second-title-size;
    padding: 20px 0 20px 0;
  }

  &__main-wrap {
    display: flex;
  }

  &__main-left {
    width: 65%;
  }

  &__main-right {
    width: 35%;
    margin-left: 30px;
  }

  &__hashtags {
    display: flex;
    flex-wrap: wrap;
  }

  &__hashtag {
    display: inline-block;
    background: #d4e3f6;
    padding: 6.5px 10px;
    margin: 0 10px 25px 0;
  }

  &__slider-big {
    max-height: 595px;
    margin: auto;
    min-height: 100%;
    min-width: 100%;
    width: auto;
    height: auto;
    max-width: none;
    display: block;
    position: relative;
  }

  &__slider-big-container {
    max-height: 595px;
  }

  &__slider-small {
    width: auto;
    max-height: 80px;
    margin: 20px auto auto auto;
  }

  /deep/.slick-prev {
    left: 0;
    z-index: 10;
  }

  /deep/.slick-next {
    right: 0;
    z-index: 10;
  }

  /deep/.slick-prev {
    left: -27px;
    width: 30px;
    height: 30px;
  }
  /deep/.slick-next {
    right: -27px;
    width: 30px;
    height: 30px;
  }
  /deep/.slick-prev:before {
    font-size: 30px;
  }
  /deep/.slick-next:before {
    font-size: 30px;
  }
  /deep/.slick-prev:before {
    background-image: url("@/assets/images/slick/slick-prev.png");
    background-size: 100%;
    background-repeat: no-repeat;
    color: transparent;
  }
  /deep/.slick-next:before {
    background-image: url("@/assets/images/slick/slick-next.png");
    background-size: 100%;
    transform: rotate(180deg);
    background-repeat: no-repeat;
    color: transparent;
  }

  &__person-block {
    display: flex;
    padding: 0 0 25px 0;
  }

  &__person-avatar {
    width: 68px;
    height: 68px;
    margin-right: 30px;
  }

  &__all-advs-author {
    color: $mainColor;

    &:hover {
      cursor: pointer;
    }
  }

  &__decore-line {
    border: 1px solid $mainFourthColor;
    margin: 20px 0;
  }

  &__phone-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid $mainColor;
    padding: 10px 20px;
    margin-top: 15px;

    div {
      display: flex;
      align-items: center;

      svg {
        margin-right: 15px;
      }
    }
  }

  &__contacts-block {
    padding-top: 20px;

    div {
      display: flex;
      align-items: center;

      img {
        margin-right: 15px;
      }
    }
  }

  &__social-block {
    display: flex;
    align-items: center;
    padding-bottom: 10px;

    div {
      padding-right: 10px;
    }
    svg {
      width: 24px;

      :hover {
        cursor: pointer;
      }
    }
  }
  &__complain {
    color: $mainFifthColor;

    &:hover {
      cursor: pointer;
    }
  }

  &__complain-list {
    position: absolute;
    background: $mainSecondColor;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
    padding: 20px;
  }

  &__complain-list-title {
    text-align: center;
    padding-bottom: 20px;
  }

  &__complain-list-item {
    padding-bottom: 20px;
  }

  &__complain-button {
    background: $mainColor;
    margin-top: 10px;
    width: 320px;
  }

  &__write-to-the-author {
    background: $mainColor;
    margin: 25px 0 10px 0;
    max-width: 100%;
  }

  &__offer-your-price {
    border: 1px solid $mainColor;
    max-width: 100%;

    /deep/button {
      color: $mainColor;
    }
  }

  &__category-list-block {
    border: 1px solid #dadada;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 265px;
    padding: 11px 10px;
    margin-right: 7px;
    margin-bottom: 20px;
  }

  &__category-section-list {
    position: absolute;
    top: 40px;
    padding: 10px;
    background: white;
    width: 264px;

    &:hover {
      cursor: pointer;
    }
  }

  &__category-block {
    display: flex;
    justify-content: space-between;
  }

  &__category-adv-count {
    color: $mainFifthColor;
    position: relative;
    top: 10px;
  }

  &__location-block {
    display: flex;
    align-items: center;
    font-size: $g-mobile-size;
    padding-bottom: 15px;

    div {
      padding: 0 20px 0 10px;
    }
  }

  &__date-add {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
  }

  &__description {
    background: $mainSecondColor;
    margin: 30px 0 100px 0;
    padding: 25px 20px;
  }

  &__go-to-profile {
    color: $mainColor;
    padding-top: 25px;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}

@media (max-width: $break-xlg) {
  .user-detail-list {
    padding-top: 25px;

    &__main-wrap {
      flex-direction: column;
    }

    &__main-left {
      width: 100%;
    }

    &__title {
      padding-top: 0;
    }

    &__main-right {
      width: 100%;
      margin-left: 0;
    }

    &__phone-block {
      max-width: 350px;
    }

    &__description {
      margin-bottom: 30px;
    }

    /deep/.slick-prev:before,
    /deep/.slick-next:before {
      font-size: 40px;
    }

    /deep/.slick-next {
      width: 40px;
      height: 40px;
    }
  }
}

@media (max-width: $break-sm) {
  .user-detail-list {
    padding: 15px 7px;

    &__phone-block {
      max-width: 100%;
    }

    &__title {
      padding: 10px 0;
    }

    &__description {
      margin: 10px 0;
    }

    /deep/.slick-slide img {
      height: 250px;
    }

    /deep/.slick-next,
    /deep/.slick-prev {
      display: none !important;
    }
  }
}
</style>
