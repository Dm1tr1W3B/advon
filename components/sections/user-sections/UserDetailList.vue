<template>
  <div class="user-detail-list l-wrap" v-if="this.userDatail.main">
    <Search />
    <BreadCrumbs
      :lastItemName="userDatail.main.user_name"
    />
    <div v-if="$device.isDesktop" class="user-detail-list__header">
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
          <VueSlickCarousel ref="c1" :asNavFor="c2" :focusOnSelect="true">
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
            v-if="$device.isDesktop"
            ref="c2"
            :asNavFor="c1"
            v-show="c1"
            :slidesToShow="this.userDatail.main.additional_photos.length"
            :focusOnSelect="true"
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
          <div v-if="!$device.isDesktop" class="user-detail-list__header">
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
          <div v-if="!$device.isDesktop" class="user-detail-list__button-group">
            <div class="user-detail-list__button-group_button">
              <DefaultButton
                class="user-detail-list__write-to-the-author"
                @click.native="openModelWriteAuthor"
              >
                Написать автору
              </DefaultButton>
            </div>
            <div class="user-detail-list__button-group_button">
              <DefaultButton
                class="user-detail-list__offer-your-price"
                @click.native="subscription"
              >
                Подписаться
              </DefaultButton>
              <TokenNotProvided
                class="user-detail-list__complain-error"
                :error-comment="errorSubscription"
              />
              <Notification
                :message="errorSubscription['non_field_error']"
                v-if="errorSubscription"
              />
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
        <div
          class="user-detail-list__all-advs-author"
          @click="getAuthorAllAdvertisements()"
        >
          Все объявления автора ({{
            this.userDatail.person.number_advertisement
          }})
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
          <div
            v-if="!loggedInUser"
            @click="showContact"
            class="user-detail-list__show-contact"
          >
            Показать телефон
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
        <div class="user-detail-list__complain" @click="complaintAdv">
          Пожаловаться
        </div>
        <div
          class="user-detail-list__complain-list"
          v-if="this.complaintAdvData"
          v-click-outside="complaintAdvOutside"
        >
          <CloseModal
            class="user-detail-list__close-complain"
            @click="complaintAdvClose"
          />
          <div class="user-detail-list__complain-list-title">
            Укажите причины жалобы
          </div>
          <div
            v-for="complain in this.complaintList"
            :key="complain.id"
            class="user-detail-list__complain-list-item"
          >
            <InputCheckbox
              :set-value="formDataComplain.complainTypeList"
              :id="complain.complaint_type_id + ''"
              :label="complain.complaint_type_name"
              @click.native="hanbleReOpen"
            />
          </div>
          <DefaultButton
            class="user-detail-list__complain-button"
            @click.native="sendComplain"
          >
            Отправить
          </DefaultButton>
          <Notification
            :message="this.errorСomplain['non_field_error']"
            v-if="this.errorСomplain"
            class="user-detail-list__complain-error"
          />
          <Notification
            :message="errorСomplain['complaint_type_ids']"
            v-if="errorСomplain"
            class="user-detail-list__complain-error"
          />
        </div>
        <div v-if="$device.isDesktop" class="user-detail-list__button-group">
          <div>
            <DefaultButton
              class="user-detail-list__write-to-the-author"
              @click.native="openModelWriteAuthor"
            >
              Написать автору
            </DefaultButton>
          </div>
          <div>
            <DefaultButton
              class="user-detail-list__offer-your-price"
              @click.native="subscription"
            >
              Подписаться
            </DefaultButton>
            <TokenNotProvided
              class="user-detail-list__complain-error"
              :error-comment="errorSubscription"
            />
            <Notification
              :message="errorSubscription['non_field_error']"
              v-if="errorSubscription"
            />
          </div>
        </div>
      </div>
    </div>

    <DefaultModal
      v-if="openModalWriteToTheAuthor"
      :on-close="() => (openModalWriteToTheAuthor = !openModalWriteToTheAuthor)"
    >
      <div class="user-detail-list__title-message">Написать сообщение</div>
      <div class="user-detail-list__message-section">
        <div class="user-detail-list__message-block">
          <div class="user-detail-list__authir-block">
            <img :src="this.userDatail.person.avatar" alt="" />
            <div>
              {{ this.userDatail.person.name }}
            </div>
          </div>
          <div class="user-detail-list__phone-block-modal">
            <Phone />
            {{ this.userDatail.person.phone }}
          </div>
        </div>
        <div class="user-detail-list__message-text-block">
          <InputTextarea
            :set-value="formDataToSend"
            :id="'message'"
            :label="'message'"
            :placeholder="'Написать'"
          />
          <label for="files">
            <Clip />
            <input
              type="file"
              id="files"
              ref="files"
              multiple
              v-on:change="handleFilesUploads()"
              hidden
            />
          </label>
        </div>
        <div class="user-detail-list__message-bottom">
          <div>Вы можете прикрепить файл форматов jpg, png, pdf</div>
          <DefaultButton
            class="user-detail-list__message-button"
            @click.native="sendMessage"
          >
            Отправить
          </DefaultButton>
        </div>
        <Notification :message="errorMessage['text']" v-if="errorMessage" />
        <Notification
          :message="errorMessage['non_field_error']"
          v-if="errorMessage"
        />
      </div>
    </DefaultModal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Location from "@/assets/images/icons/location.svg?inline";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import InputTextarea from "@/components/atoms/inputs/InputTextarea.vue";
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
import Clip from "@/assets/images/icons/clip.svg?inline";
import DefaultModal from "@/components/molecules/DefaultModal.vue";
import Search from "@/components/molecules/Search.vue";
import TokenNotProvided from "@/components/errors/TokenNotProvided";
import Notification from "@/components/errors/Notification";
import ClickOutside from "vue-click-outside";
import CloseModal from "@/assets/images/icons/close-modal.svg?inline";
import BreadCrumbs from "@/components/molecules/BreadCrumbs.vue";

export default {
  name: "UserDetailList",
  data() {
    return {
      userDatail: {},
      complaintList: {},
      complaintAdvData: false,
      openModalWriteToTheAuthor: false,
      errorSubscription: null,
      errorСomplain: null,
      c1: undefined,
      c2: undefined,
      errorMessage: null,
      files: [],
      formDataComplain: {
        complainTypeList: {},
      },
      formDataToSend: {
        message: "",
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
              arrows: true,
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
    Clip,
    InputTextarea,
    DefaultModal,
    TokenNotProvided,
    Notification,
    CloseModal,
    BreadCrumbs,
  },
  mounted() {
    this.getUserForGuest();
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
  directives: {
    ClickOutside,
  },
  watch: {
    userDatail: {
            deep: true,
            handler(newValue, oldValue) {
              setTimeout(() => {
                this.c1 = this.$refs.c1;
                this.c2 = this.$refs.c2;
              }, 0)
            }
        }
  },
  methods: {
    hanbleReOpen() {
      setTimeout(() => {
        this.complaintAdvData = false;
      }, 0);
      setTimeout(() => {
        this.complaintAdvData = true;

      }, 0);
    },
    async getUserForGuest() {
      try {
        await this.$axios
          .get("/getUserForGuest", {
            params: {
              user_id: this.$route.params.pathMatch,
            },
          })
          .then((res) => {
            this.userDatail = res.data.data;
          });
      } catch (e) {
        this.error = e.response;
      }
    },
    getAuthorAllAdvertisements() {
      this.$router.push(
        `/all-advertisement/${"user" + this.userDatail.main.user_id}`
      );
    },
    async complaintAdv() {
      try {
        await this.$axios
          .get("/getComplaintTypeList", {
            params: {
              complaint_type: "1",
            },
          })
          .then((res) => {
            this.complaintList = res.data.data;
            this.complaintAdvData = true;
          });
      } catch (e) {
        this.error = e.response;
      }
    },
    complaintAdvClose() {
      this.complaintAdvData = false;
    },
    complaintAdvOutside() {
      this.complaintAdvData = false;
    },
    async sendComplain() {
      const { formDataComplain } = this;
      try {
        await this.$axios
          .post("/storeAdvertisementAuthorComplaint", {
            author_user_id: this.$route.params.pathMatch,
            complaint_type_ids: Object.keys(formDataComplain.complainTypeList),
          })
          .then((res) => {
            this.complaintList = res.data.data;
          });
        this.complaintAdvData = false;
      } catch (e) {
        this.errorСomplain = e.response.data;
      }
    },
    async subscription() {
      try {
        await this.$axios
          .post("/storeSubscription", {
            sender_user_id: this.userDatail.main.user_id,
          })
          .then((res) => {});
      } catch (e) {
        this.errorSubscription = e.response.data;
      }
    },
    async sendYourPrice() {
      const { formDataToSend } = this;
      try {
        await this.$axios
          .post("/offerYourPrice", {
            currency_id: "1",
            price: formDataToSend.offerPriceData,
            advertisement_id: this.$route.params.pathMatch,
          })
          .then(() => {});
      } catch (e) {
        this.error = e.response;
      }
      this.offerPrice = false;
      formDataToSend.offerPriceData = "";
    },
    handleFilesUploads() {
      this.files = this.$refs.files.files;
    },
    openModelWriteAuthor() {
      this.openModalWriteToTheAuthor = true;
    },
    async sendMessage() {
      const { formDataToSend } = this;
      let formData = new FormData();
      let files = "";
      if (this.files.length != 0) {
        for (var i = 0; i < this.files.length; i++) {
          files = this.files[i];
          formData.append("files[" + i + "]", files);
        }
      }
      formData.append("text", formDataToSend.message);
      formData.append("to_id", this.$route.params.pathMatch);
      try {
        await this.$axios.post("/sendMessage", formData).then(() => {});
        this.openModalWriteToTheAuthor = false;
        formDataToSend.message = "";
      } catch (e) {
        this.errorMessage = e.response.data;
      }
    },
    async showContact() {
      this.$router.push(`/login`);
    },
  },
};
</script>

<style lang="scss" scoped>
.user-detail-list {
  &__title {
    font-size: $g-second-title-size;
    padding: 15px 0 20px 0;
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
    width: auto;
    max-height: 595px;
    margin: auto;
  }

  &__slider-big-container {
    max-height: 595px;

    img {
      min-height: 100%;
      min-width: 100%;
      width: 100%;
      height: 595px;
      max-width: none;
      max-height: 595px;
      display: block;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 0);
      object-fit: cover;
    }
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
    object-fit: cover;
  }

  &__all-advs-author {
    color: $mainColor;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
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
      color: $mainColor;
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

    &:hover {
      @include hover-main-color;
    }

    &:active {
      @include active-main-color;
    }
  }

  &__offer-your-price {
    border: 1px solid $mainColor;
    max-width: 100%;

    /deep/button {
      color: $mainColor;
      &:hover {
        color: $mainSecondColor;
      }
    }

    &:hover {
      background: #4d8eee;
    }

    &:active {
      background: #1167ea;
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

  &__title-message {
    line-height: 21px;
    font-size: $g-font-third-size;
    padding-bottom: 30px;
  }

  &__message-section {
    width: 754px;
  }

  &__message-block {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
  }

  &__authir-block {
    display: flex;
    align-items: center;

    img {
      margin-right: 10px;
      max-width: 68px;
      max-height: 68px;
      height: auto;
      width: auto;
    }
  }

  &__phone-block-modal {
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    border: 1px solid $mainColor;
    padding: 10px 20px;
    margin-top: 15px;
    max-height: 44px;

    svg {
      position: relative;
      top: 0;
      left: 0;
      margin-right: 10px;
    }
  }

  &__message-text-block {
    position: relative;

    svg {
      top: 50px;
      right: 5px;
    }
  }

  &__message-bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
    color: $mainFifthColor;
    font-size: $g-mobile-size;
  }

  &__message-button {
    background: $buttonColor;
    width: 166px;
  }

  &__complain-error {
    position: absolute;
    width: 500px;
    background: white;
    margin-top: 10px;
  }
  &__close-complain {
    position: absolute;
    right: 10px;
    top: 10px;

    &:hover {
      cursor: pointer;
    }
  }

  &__show-contact {
    &:hover {
      cursor: pointer;
      color: $mainColor;
    }
  }
}

@media (max-width: $break-xlg) {
  .user-detail-list {
    padding: 0 5px;

    &__main-wrap {
      flex-direction: column;
    }

    &__main-left {
      width: 100%;
      padding-top: 20px;
    }

    &__main-right {
      width: 100%;
      margin-left: 0;
    }

    &__title {
      padding-bottom: 15px;
    }

    &__write-to-the-author {
      margin-top: 0;
    }

    &__location-block {
      padding-bottom: 20px;
    }

    &__button-group {
      display: flex;
      justify-content: space-between;

      &_button {
        width: 49%;
      }
    }

    &__message-section {
      width: 500px;
    }

    &__description {
      margin-bottom: 10px;
    }

    &__main-right {
      background: #fff;
      padding: 30px 20px;
      margin-bottom: 50px;
    }

    &__phone-block {
      width: 357px;
    }

    &__person-block {
      padding-bottom: 17px;
    }

    &__decore-line {
      margin: 15px 0;
    }

    /deep/.slick-slide img {
      width: 100%;
      height: 576px;
      object-fit: cover;
      margin: 0;
    }

    /deep/.slick-next {
      right: -17px;
    }

    /deep/.slick-prev {
      left: -17px;
    }
  }
}

@media (max-width: $break-sm) {
  .user-detail-list {
    padding: 0;

    &__button-group {
      padding: 0 6px;
      flex-direction: column;

      &_button {
        width: 100%;
      }
    }

    &__message-section {
      width: 100%;
    }

    &__message-block {
      flex-direction: column;
    }

    &__phone-block-modal {
      width: 175px;
    }

    &__header {
      padding: 0 6px;
    }

    &__description {
      margin-top: 20px;
      padding: 5px 6px 20px;
    }

    &__main-right {
      padding: 10px 6px;
    }

    &__phone-block {
      width: 100%;
    }

    &__person-avatar {
      margin-right: 6px;
    }

    &__main-right {
      margin-bottom: 38px;
    }

    /deep/.modal-container {
      padding: 20px;
      width: 100%;
    }

    /deep/.slick-slide img {
      height: 252px;
    }

    /deep/.slick-next {
      right: 7px;

      &:before {
        opacity: 1;
      }
    }

    /deep/.slick-prev {
      left: 7px;

      &:before {
        opacity: 1;
      }
    }
  }
}
</style>
