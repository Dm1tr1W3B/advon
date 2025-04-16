<template>
  <div class="my-company">
    <div v-if="myProfileData.has_company === false">
      <div class="my-company__title">Моя компания</div>
      <div>У вас еще нет компании. Хотите создать компанию?</div>
      <NuxtLink to="/dashboard/create-company">
        <DefaultButton class="my-company__button-edit">
          Создать компанию
        </DefaultButton>
      </NuxtLink>
    </div>
    <div v-if="myProfileData.has_company">
      <div class="my-company__title-block">
        <div class="my-company__title">Моя компания</div>
        <div class="my-company__date-registration">
          Дата регистрации: {{ this.myCompanyData.created_at }}
        </div>
      </div>
      <div class="my-company__name-block">
        <div v-if="this.myCompanyData.logo === null">
          <DefaultAvatar />
        </div>
        <div
          class="my-company__company-avatar"
          v-if="this.myCompanyData.logo != null"
        >
          <img :src="this.myCompanyData.logo" alt="" />
        </div>
        <div class="my-company__name">
          {{ this.myCompanyData.name }}
        </div>
      </div>
      <div
        class="my-company__photo"
        v-if="this.myCompanyData.additional_photos != 0"
      >
        <div class="my-company__photo-title">Ваши фото</div>
        <div class="my-company__photos-block">
          <div
            class="my-company__photos"
            v-for="photos in this.myCompanyData.additional_photos"
            :key="photos.id"
          >
            <img :src="photos.photo_url" alt="" />
          </div>
        </div>
      </div>
      <div class="my-company__about-me" v-if="this.myCompanyData.description">
        <div class="my-company__about-me-title">Описание</div>
        <div class="my-company__about-me-text">
          {{ this.myCompanyData.description }}
        </div>
      </div>
      <div class="my-company__site" v-if="this.myCompanyData.site_url">
        <div class="my-company__site-title">Сайт</div>
        <div class="my-company__site-text">
          <NuxtLink :to="this.myCompanyData.site_url">{{
            this.myCompanyData.site_url
          }}</NuxtLink>
        </div>
      </div>
      <div class="my-company__hashtag" v-if="this.myCompanyData.hashtags != ''">
        <div class="my-company__hashtag-title">Хештеги компании</div>
        <div class="my-company__hashtag-block">
          <div
            class="my-company__hashtag-item"
            v-for="hashtag in this.myCompanyData.hashtags"
            :key="hashtag.id"
          >
            {{ hashtag }}
          </div>
        </div>
      </div>
      <div class="my-company__video" v-if="this.myCompanyData.video_url">
        <div class="my-company__video-title">Ссылка на видео</div>
        <div class="my-company__video-text">
          <NuxtLink :to="this.myCompanyData.video_url">{{
            this.myCompanyData.video_url
          }}</NuxtLink>
        </div>
      </div>
      <div class="my-company__audio" v-if="this.myCompanyData.audio">
        <div class="my-company__audio-title">Аудио реклама</div>
        <div class="my-company__audio-text">
          <Audio onclick="document.getElementById('audio').play()" />
          <div v-if="this.myCompanyData.audio.download_link != null">
            <audio
              controls
              hidden
              id="audio"
              :src="this.myCompanyData.audio.download_link"
            ></audio>
          </div>
          <span> {{ this.myCompanyData.audio.original_name }} </span>
        </div>
      </div>
      <div class="my-company__document" v-if="this.myCompanyData.document">
        <div class="my-company__document-title">
          Документ, подтверждающий, что вы имеет отношнение к компании
        </div>
        <div class="my-company__document-text">
          <a :href="this.myCompanyData.document.download_link" download>
            <Img />
          </a>
          <span> {{ this.myCompanyData.document.original_name }} </span>
        </div>
      </div>
      <div class="my-company__contact-block" v-if="myCompanyData.latitude">
        <div class="my-company__contact-title">Контакты</div>
        <GmapMap
          :center="{
            lat: +myCompanyData.latitude,
            lng: +myCompanyData.longitude,
          }"
          :zoom="5"
          map-type-id="terrain"
          style="width: 460px; height: 250px"
          :marker-position="formData.position"
        >
          <GmapMarker
            :position="{
              lat: +myCompanyData.latitude,
              lng: +myCompanyData.longitude,
            }"
          />
        </GmapMap>
      </div>
      <div class="my-company__address-block" v-if="this.myCompanyData.country">
        <div class="my-company__address-title">Адрес</div>
        <div class="my-company__address">
          <span>
            {{ this.myCompanyData.country }}
          </span>
          <span>
            {{ this.myCompanyData.region }}
          </span>
          <span>
            {{ this.myCompanyData.city }}
          </span>
        </div>
      </div>
      <div class="my-company__phone-block" v-if="this.myCompanyData.phone">
        <div class="my-company__phone-title">Телефон компании</div>
        <div class="my-company__phone">{{ this.myCompanyData.phone }}</div>
      </div>
      <div v-if="this.myCompanyData.additional_phones != null">
        <div
          class="my-company__phone-block"
          v-if="this.myCompanyData.additional_phones.length != 0"
        >
          <div class="my-company__phone-title">
            Дополнительные телефоны компании
          </div>
          <div
            class="my-company__phone"
            v-for="phone in this.myCompanyData.additional_phones"
            :key="phone.id"
          >
            {{ phone }}
          </div>
        </div>
      </div>
      <div v-if="this.myCompanyData.contacts != null">
        <div
          class="my-company__more-contacts-block"
          v-if="this.myCompanyData.contacts.length != 0"
        >
          <div class="my-company__more-contacts-title">Еще контакты</div>
          <div class="my-company__more-contacts">
            <div
              class="my-company__social-block"
              v-for="contact in this.myCompanyData.contacts"
              :key="contact.id"
            >
              <img :src="contact.photo_url" alt="" />
              {{ contact.values }}
            </div>
          </div>
        </div>
      </div>
      <div class="my-company__email-block" v-if="this.myCompanyData.email">
        <div class="my-company__email-title">Электронаая почта</div>
        <div class="my-company__email">{{ this.myCompanyData.email }}</div>
      </div>
      <div v-if="this.myCompanyData.social_media != null">
        <div
          class="my-company__social-section"
          v-if="this.myCompanyData.social_media.length != 0"
        >
          <div class="my-company__social-title">Социальные сети</div>
          <div
            class="my-company__social-block"
            v-for="social in this.myCompanyData.social_media"
            :key="social.id"
          >
            <img :src="social.photo_url" alt="" />
            {{ social.name }}/{{ social.values }}
          </div>
        </div>
      </div>
      <div class="my-company__button-group">
        <DefaultButton
          class="my-company__button-edit"
          @click.native="editCompany"
        >
          Редактировать
        </DefaultButton>
        <DefaultButton
          class="my-company__button-to-top"
          @click.native="companyPromotion"
        >
          Продвинуть компанию
        </DefaultButton>
      </div>
      <DefaultButton
        class="my-company__button-delete"
        @click.native="openModalDelete"
      >
        Удалить компанию
      </DefaultButton>
    </div>
    <DefaultModal
      v-if="openModal"
      :on-close="() => (openModal = !openModal)"
      class="my-company__delete"
    >
      <div class="my-company__delete-container">
        <div>Вы уверены, что хотите удалить компанию?</div>
        <div>Все объявления, созданные от имени компании будут удалены</div>
        <div class="my-company__delete-button-group">
          <div class="my-company__delete-button-not" @click="() => (openModal = !openModal)">Отмена</div>
          <div class="my-company__delete-button-yes" @click="deleteCompany">Да</div>
        </div>
      </div>
    </DefaultModal>
  </div>
</template>

<script>
import Skype from "@/assets/images/social/skype.svg?inline";
import Viber from "@/assets/images/social/viber.svg?inline";
import Telegram from "@/assets/images/social/telegram.svg?inline";
import Facebook from "@/assets/images/social/facebook.svg?inline";
import Vk from "@/assets/images/social/vk.svg?inline";
import Delete from "@/assets/images/icons/delete.svg?inline";
import Img from "@/assets/images/mock/img.svg?inline";
import Audio from "@/assets/images/audio.svg?inline";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import DefaultAvatar from "@/assets/images/default-avatar.svg?inline";
import DefaultModal from "@/components/molecules/DefaultModal.vue";

export default {
  name: "my-company",
  data() {
    return {
      openModal: false,
      myProfileData: {},
      myCompanyData: {},
      formData: {
        address: null,
        position: {
          lat: null,
          lng: null,
        },
      },
    };
  },
  components: {
    Skype,
    Viber,
    Telegram,
    Facebook,
    Vk,
    DefaultButton,
    Delete,
    Audio,
    Img,
    DefaultAvatar,
    DefaultModal,
  },
  created() {
    this.getProfile();
    this.getCompany();
  },
  methods: {
    async getProfile() {
      try {
        await this.$axios.get("/getProfile").then((res) => {
          this.myProfileData = res.data.data;
        });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    editCompany() {
      this.$router.push("/dashboard/create-company");
    },
    async deleteCompany() {
      try {
        await this.$axios.delete("/deleteCompany");
        this.$router.push("/dashboard/profile");
      } catch (e) {
        this.error = e.response;
      }
    },
    async getCompany() {
      try {
        await this.$axios.get("/getCompany").then((res) => {
          this.myCompanyData = res.data.data;
        });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    companyPromotion() {
      this.$router.push("company-promotion");
    },
    openModalDelete() {
      this.openModal = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.my-company {
  padding: 30px 0 30px 30px;
  width: 80%;
  min-height: 80vh;

  &__title {
    font-size: $g-second-title-size;
    padding-bottom: 25px;
  }

  &__name-block {
    display: flex;
    align-items: center;
  }

  &__name {
    display: flex;
    flex-direction: column;
    margin-left: 30px;
  }

  &__company-avatar {
    margin-right: 25px;
    width: 166px;
    height: 68px;
    display: flex;
    justify-content: center;

    img {
      max-width: 166px;
      max-height: 68px;
    }
  }

  &__photo {
    padding-top: 25px;
  }

  &__photo-title {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
  }

  &__photos-block {
    display: flex;
    flex-wrap: wrap;
  }

  &__photos {
    margin-right: 30px;
    padding-top: 15px;
    img {
      max-width: 133px;
      max-height: 90px;
    }
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
    padding: 25px 0 10px 0;
  }

  &__address-title {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
    padding-bottom: 10px;
  }

  &__phone-block,
  &__email-block {
    padding: 25px 0 10px 0;
  }

  &__phone-title,
  &__email-title {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
  }

  &__confirm-phone,
  &__confirm-email {
    padding: 25px 0 10px 0;
    color: $mainFifthColor;
    font-size: $g-mobile-size;
  }

  &__phone,
  &__email {
    padding-top: 10px;
  }

  &__more-contacts-block {
    padding: 25px 0 10px 0;
  }

  &__more-contacts-title {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
  }

  &__social-block {
    padding-top: 10px;
    display: flex;
    align-items: center;

    span {
      padding-left: 10px;
    }

    svg {
      width: 21px;
      height: 21px;
    }

    img {
      margin-right: 10px;
    }
  }

  &__social-section {
    padding: 25px 0 10px 0;
  }

  &__social-title {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
  }

  &__button-edit {
    background: $mainColor;
    width: 264px;
    margin: 30px 30px 20px 0;
  }
  &__button-to-top {
    background: $buttonColor;
    width: 264px;
    margin: 30px 0 20px 0;
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

  &__site {
    padding: 25px 0 10px 0;
  }

  &__site-title {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
    line-height: 40px;
  }

  &__hashtag {
    padding: 25px 0 10px 0;
  }

  &__hashtag-title {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
    line-height: 40px;
  }

  &__hashtag-block {
    display: flex;
    flex-wrap: wrap;
    max-width: 550px;
  }

  &__hashtag-item {
    background: #d4e3f6;
    padding: 6.5px 10px;
    margin: 0 10px 10px 0;

    svg {
      margin-left: 5px;
    }
  }

  &__video {
    padding: 25px 0 10px 0;
  }

  &__video-title {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
    line-height: 40px;
  }
  &__audio {
    padding: 25px 0 10px 0;
  }

  &__audio-title {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
    line-height: 40px;
  }

  &__audio-text {
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
    }
  }
  &__document {
    padding: 25px 0 10px 0;
  }

  &__document-title {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
    line-height: 40px;
  }

  &__document-text {
    display: flex;
    align-items: center;
    padding-top: 10px;

    span {
      margin-left: 10px;
    }
  }

  &__button-delete {
    padding-bottom: 50px;
    /deep/button {
      color: $mainFifthColor;
      text-align: left;
    }
  }

  &__button-group {
    display: flex;
  }

  &__delete-button-group {
    display: flex;
    align-items: center;
    margin-top: 25px;
  }

  &__delete-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;

    div {
      padding: 5px 0;
    }
  }

  div &__delete-button-not {
    color: $mainColor;
    padding-right: 25px;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  div &__delete-button-yes {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 25px; 
    height: 48px;
    width: 166px;
    background: $mainColor;
    color: $mainSecondColor;

    &:hover {
      @include hover-main-color;
    }

    &:active {
      @include active-main-color;
    }
  }
}

@media (max-width: $break-xlg) {
  .my-company {
    width: 100%;
    padding: 25px 5px;
  }
}

@media (max-width: $break-sm) {
  .my-company {

    &__title-block {
      flex-direction: column;
    }

    &__title {
      padding-bottom: 0;
    }

    &__name-block {
      flex-direction: column;
      align-items: flex-start;
    }

    &__name {
      margin-left: 0;
      margin-top: 15px;
    }

    &__contact-block {
      padding-top: 25px;
    }

    &__button-group {
      flex-direction: column;

      /deep/.main-button {
        margin: 20px 0 0 0;
      }
    }

    &__button-delete {
      padding-bottom: 0;
    }

    /deep/.vue-map-container {
      width: 100% !important;
    }
  }
}
</style>
