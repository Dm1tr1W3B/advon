<template>
  <div class="profile">
    <div class="profile__title-block">
      <div class="profile__title">Мой профиль</div>
      <div class="profile__date-registration">
        Дата регистрации:
        {{ myProfileData.created_at }}
      </div>
    </div>
    <div class="profile__name-block">
      <img :src="myProfileData.avatar" alt="avatar" class="profile__avatar" />
      <!-- <DefaultAvatar class="profile__avatar" /> -->
      <div class="profile__name">
        {{ myProfileData.name }}
        <span> Частное лицо </span>
      </div>
    </div>
    <div class="profile__photo" v-if="myProfileData.additional_photos != ''">
      <div class="profile__photo-title">Ваши фото</div>
      <div class="profile__photos-block">
        <div v-for="photo in myProfileData.additional_photos" :key="photo.id">
          <img :src="photo.photo_url" alt="additional_photos" />
        </div>
      </div>
    </div>
    <div class="profile__about-me" v-if="myProfileData.description">
      <div class="profile__about-me-title">О себе</div>
      <div class="profile__about-me-text">
        {{ myProfileData.description }}
      </div>
    </div>
    <div class="profile__contact-block" v-if="myProfileData.latitude">
      <div class="profile__contact-title">Контакты</div>
      <div>
        <GmapMap
          :center="{
            lat: +myProfileData.latitude,
            lng: +myProfileData.longitude,
          }"
          :zoom="5"
          style="width: 460px; height: 120px"
        >
          <GmapMarker
            :position="{
              lat: +myProfileData.latitude,
              lng: +myProfileData.longitude,
            }"
          />
        </GmapMap>
      </div>
    </div>
    <div class="profile__address-block" v-if="myProfileData.country">
      <div class="profile__address-title">Адрес</div>
      <div class="profile__address">
        {{ myProfileData.country }}, {{ myProfileData.region }},
        {{ myProfileData.city }}
      </div>
    </div>
    <div class="profile__phone-block" v-if="myProfileData.phone">
      <div class="profile__phone-title">Телефон</div>
      <div class="profile__phone">
        {{ myProfileData.phone }}
      </div>
      <div
        class="profile__confirm-phone"
        v-if="myProfileData.phone_verified_at === null"
      >
        Телефон не подтвержден
        <NuxtLink to="/registration/phone-verification"> Подтвердить </NuxtLink>
      </div>
      <div
        class="profile__confirm-phone"
        v-if="myProfileData.phone_verified_at !== null"
      >
        <Verified />
        <span>Телефон подтвержден</span>
      </div>
    </div>
    <div v-if="this.myProfileData.additional_phones != null">
      <div
        class="profile__phone-block"
        v-if="this.myProfileData.additional_phones.length != 0"
      >
        <div class="profile__phone-title">
          Дополнительные телефоны
        </div>
        <div
          class="profile__phone"
          v-for="phone in this.myProfileData.additional_phones"
          :key="phone.id"
        >
          {{ phone }}
        </div>
      </div>
    </div>
    <div
      class="profile__more-contacts-block"
      v-if="myProfileData.contacts != ''"
    >
      <div class="profile__more-contacts-title">Еще контакты</div>
      <div
        class="profile__more-contacts"
        v-for="contact in myProfileData.contacts"
        :key="contact.id"
      >
        <div class="profile__contacts-block">
          <img :src="contact.photo_url" alt="" />
          {{ contact.values }}
        </div>
      </div>
    </div>
    <div class="profile__email-block">
      <div class="profile__email-title">Электронаая почта</div>
      <div class="profile__email">
        {{ myProfileData.email }}
      </div>
      <div
        class="profile__confirm-email"
        v-if="myProfileData.email_verified_at === null"
      >
        Email не подтвержден
        <NuxtLink to="/registration/email-verification"> Подтвердить </NuxtLink>
      </div>
      <div
        class="profile__confirm-email"
        v-if="myProfileData.email_verified_at !== null"
      >
        <Verified />
        <span>Email подтвержден</span>
      </div>
    </div>
    <div
      class="profile__social-section"
      v-if="myProfileData.social_media != ''"
    >
      <div class="profile__social-title">Социальные сети</div>
      <div
        class="profile__more-contacts"
        v-for="social in myProfileData.social_media"
        :key="social.id"
      >
        <div class="profile__social-block">
          <img :src="social.photo_url" alt="" />
          {{ social.name }}/{{ social.values }}
        </div>
      </div>
    </div>
    <DefaultButton class="profile__button-edit" @click.native="edit">
      Редактировать
    </DefaultButton>
  </div>
</template>

<script>
import Skype from "@/assets/images/social/skype.svg?inline";
import Viber from "@/assets/images/social/viber.svg?inline";
import Telegram from "@/assets/images/social/telegram.svg?inline";
import Facebook from "@/assets/images/social/facebook.svg?inline";
import Vk from "@/assets/images/social/vk.svg?inline";
import Verified from "@/assets/images/icons/verified.svg?inline";
import DefaultAvatar from "@/assets/images/default-avatar.svg?inline";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";

export default {
  name: "Profile",
  data() {
    return {
      myProfileData: {},
    };
  },
  components: {
    Skype,
    Viber,
    Telegram,
    Facebook,
    Vk,
    DefaultButton,
    Verified,
    DefaultAvatar,
  },
  mounted() {
    this.getProfile();
  },
  methods: {
    async getProfile() {
      try {
        await this.$axios
          .get("/getProfile")
          .then((res) => {
            this.myProfileData = res.data.data;
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    edit() {
      this.$router.push("/dashboard/edit-profile");
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  padding: 30px 0 30px 30px;
  width: 80%;
  min-height: 80vh;

  &__title {
    font-size: $g-second-title-size;
    padding-bottom: 25px;
  }

  &__avatar {
    width: 68px;
    height: 68px;
    margin-right: 30px;
  }

  &__name-block {
    display: flex;
    align-items: center;
  }

  &__name {
    display: flex;
    flex-direction: column;

    span {
      color: $mainFifthColor;
      font-size: $g-mobile-size;
      padding-top: 10px;
    }
  }

  &__default-avatar {
    margin-right: 25px;
  }

  &__photo {
    padding-top: 25px;
  }

  &__photos-block {
    display: flex;
    flex-wrap: wrap;

    div {
      max-width: 133px;
      margin: 0 30px 30px 0;

      img {
        max-width: 133px;
        max-height: 90px;
      }
    }
  }

  &__photo-title {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
    padding-bottom: 15px;
  }

  &__about-me {
    padding-top: 25px;
  }

  &__about-me-title {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
  }

  &__about-me-text {
    padding-top: 5px;
    max-width: 460px;
    line-height: 18px;
  }

  &__contact-block {
    padding-top: 45px;
  }

  &__contact-title {
    font-size: $g-second-title-size;
    padding-bottom: 15px;
  }

  &__address-block {
    padding: 25px 0 0 0;
  }

  &__address-title {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
    padding-bottom: 10px;
  }

  &__phone-block,
  &__email-block {
    padding: 25px 0 0 0;
  }

  &__email-title {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
  }

  &__phone-title,
  &__phone-email {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
  }

  &__confirm-phone,
  &__confirm-email {
    padding: 15px 0 0 0;
    color: $mainFifthColor;
    font-size: $g-mobile-size;
    display: flex;
    align-items: center;

    span {
      padding-left: 5px;
    }
  }

  &__phone,
  &__email {
    padding-top: 10px;
  }

  &__confirm-phone a,
  &__confirm-email a {
    display: inline-block;
    color: $mainColor;
    padding-left: 5px;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  &__more-contacts-block {
    padding: 25px 0 0 0;
  }

  &__more-contacts-title {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
  }

  &__social-block {
    padding-top: 10px;
    display: flex;
    align-items: center;

    img {
      margin-right: 15px;
    }

    svg {
      width: 21px;
      height: 21px;
    }
  }

  &__social-section {
    padding: 25px 0 0 0;
  }

  &__social-title {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
  }

  &__button-edit {
    background: $mainColor;
    width: 264px;
    margin: 30px 0 50px 0;
  }

  &__date-registration {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
    line-height: 40px;
  }

  &__title-block {
    display: flex;
    justify-content: space-between;
  }

  &__contacts-block {
    margin-top: 15px;
    display: flex;

    img {
      margin-right: 15px;
    }
  }
}

@media (max-width: $break-xlg) {
  .profile {
    width: 100%;
    min-height: 70vh;
    padding: 25px 5px;
  }
}

@media (max-width: $break-sm) {
  .profile {
    min-height: 58vh;

    &__title {
      padding-bottom: 0;
    }

    &__avatar {
      margin-right: 7px;
    }

    &__photos-block {
      div {
        margin-right: 10px;
        width: 98px;
        height: 75px;
      }

      img {
        width: 98px;
        height: 75px;
      }
    }

    &__title-block {
      flex-direction: column;
    }

    &__photos-block {
      flex-wrap: wrap;

      div {
        margin-bottom: 5px;
      }
    }

    /deep/.vue-map-container {
      width: 100% !important;
    }
  }
}
</style>
