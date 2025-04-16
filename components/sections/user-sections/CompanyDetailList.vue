<template>
  <div class="company-detail-list l-wrap" v-if="this.companyDatail.main">
    <Search />
    <BreadCrumbs
      :lastItemName="companyDatail.main.company_name"
    />
    <div v-if="$device.isDesktop" class="company-detail-list__title-container">
      <div class="company-detail-list__title">
        <Verification v-if="this.companyDatail.main.company_is_verification" />
        {{ this.companyDatail.main.company_name }}
      </div>
      <div class="company-detail-list__service-info-block-left">
        <div class="company-detail-list__location-block">
          <Location />
          <div>{{ this.companyDatail.main.city }}</div>
          <div class="company-detail-list__date-add">
            Добавлено {{ this.companyDatail.main.created_at }}
          </div>
        </div>
      </div>
    </div>
    <div class="company-detail-list__main-wrap">
      <div class="company-detail-list__main-left">
        <div v-if="$device.isDesktop" class="company-detail-list__hashtags">
          <div
            v-for="hashtag in this.companyDatail.main.hashtags"
            :key="hashtag.id"
          >
            <div class="company-detail-list__hashtag">
              {{ hashtag }}
            </div>
          </div>
        </div>
        <div
          class="company-detail-list__not-photos-mock"
          v-if="this.companyDatail.main.additional_photos"
        >
          <div v-if="this.companyDatail.main.additional_photos.length > 0">
            <VueSlickCarousel ref="c1" :asNavFor="c2" :focusOnSelect="true">
              <div
                v-for="photo in this.companyDatail.main.additional_photos"
                :key="photo.id"
                class="company-detail-list__slider-big-container"
              >
                <img
                  :src="photo.photo_url"
                  alt=""
                  class="company-detail-list__slider-big"
                />
              </div>
            </VueSlickCarousel>
            <VueSlickCarousel
              v-if="$device.isDesktop"
              class="company-detail-list__slider-small-wrap"
              ref="c2"
              :asNavFor="c1"
              v-show="c1"
              :slidesToShow="this.companyDatail.main.additional_photos.length"
              :focusOnSelect="true"
              v-bind="settingsSmall"
            >
              <div
                v-for="photo in this.companyDatail.main.additional_photos"
                :key="photo.id"
              >
                <img
                  :src="photo.photo_url"
                  alt=""
                  class="company-detail-list__slider-small"
                />
              </div>
            </VueSlickCarousel>
          </div>
        </div>
        <div
          v-if="!$device.isDesktop"
          class="company-detail-list__title-container"
        >
          <div class="company-detail-list__title">
            <Verification
              v-if="this.companyDatail.main.company_is_verification"
            />
            {{ this.companyDatail.main.company_name }}
          </div>
          <div class="company-detail-list__service-info-block-left">
            <div class="company-detail-list__location-block">
              <Location />
              <div>{{ this.companyDatail.main.city }}</div>
              <div class="company-detail-list__date-add">
                Добавлено {{ this.companyDatail.main.created_at }}
              </div>
            </div>
          </div>
        </div>
        <div class="company-detail-list__description">
          <div class="company-detail-list__title">Описание</div>
          <div>
            {{ this.companyDatail.main.company_description }}
          </div>
        </div>
        <div v-if="!$device.isDesktop" class="company-detail-list__hashtags">
          <div
            v-for="hashtag in this.companyDatail.main.hashtags"
            :key="hashtag.id"
          >
            <div class="company-detail-list__hashtag">
              {{ hashtag }}
            </div>
          </div>
        </div>
        <div
          v-if="!$device.isDesktop"
          class="company-detail-list__buttons-group"
        >
          <div class="company-detail-list__buttons-group_button">
            <DefaultButton
              class="company-detail-list__write-to-the-author"
              @click.native="openModelWriteAuthor"
            >
              Написать автору
            </DefaultButton>
          </div>
          <div class="company-detail-list__buttons-group_button">
            <DefaultButton
              class="company-detail-list__offer-your-price"
              @click.native="subscription"
            >
              Подписаться
            </DefaultButton>
            <TokenNotProvided
              class="company-detail-list__complain-error"
              :error-comment="errorSubscription"
            />
            <Notification
              :message="errorSubscription['non_field_error']"
              v-if="errorSubscription"
            />
          </div>
        </div>
        <div v-if="$device.isDesktop" class="company-detail-list__product">
          <div class="company-detail-list__category-block">
            <div
              @click="getCategoryList"
              class="company-detail-list__category-list-block"
            >
              {{ categoryName }}
              <SelectArrow />
            </div>
            <div class="company-detail-list__category-adv-count">
              Всего {{ this.companyDatail.advertisementList.length }} объявлений
            </div>
          </div>
          <div
            v-if="this.categoryList"
            class="company-detail-list__category-section-list"
          >
            <div
              v-if="
                this.categoryName !== 'Выберите категорию' &&
                this.categoryName !== 'Все категории'
              "
              @click="searchCategoryAdvAll()"
            >
              Все категории
            </div>
            <div
              v-for="category in this.companyDatail.categories"
              :key="category.id"
              class="company-detail-list__category-list"
            >
              <div
                @click="
                  searchCategoryAdv(
                    category.category_key,
                    category.category_name
                  )
                "
              >
                {{ category.category_name }}
              </div>
            </div>
          </div>
          <div
            v-for="ads in this.companyDatail.advertisementList"
            :key="ads.id"
            class="company-detail-list__adv"
          >
            <SmallCardHorizontal
              :ads-data="ads"
              :add-advertisement-favorite="addAdvertisementFavorite"
              :delete-advertisements-favorite="deleteAdvertisementsFavorite"
            />
          </div>
        </div>
      </div>
      <div class="company-detail-list__main-right">
        <div class="company-detail-list__person-block">
          <div>
            <img
              :src="this.companyDatail.person.avatar"
              alt=""
              class="company-detail-list__person-avatar"
            />
          </div>
          <div>
            <div>
              {{ this.companyDatail.person.name }}
            </div>
            <div>На advon с {{ this.companyDatail.person.created_at }}</div>
          </div>
        </div>
        <div
          class="company-detail-list__all-advs-author"
          @click="getAuthorAllAdvertisements"
        >
          Все объявления ({{ this.companyDatail.person.number_advertisement }})
        </div>
        <div class="company-detail-list__decore-line"></div>
        <div v-if="this.companyDatail.person.phone">Контакты</div>
        <div
          class="company-detail-list__phone-block"
          v-if="this.companyDatail.person.phone"
        >
          <div>
            <Phone />
            {{ this.companyDatail.person.phone }}
          </div>
          <div
            v-if="!loggedInUser"
            @click="showContact"
            class="company-detail-list__show-contact"
          >
            Показать телефон
          </div>
        </div>
        <div class="company-detail-list__contacts-block">
          <div
            v-for="contact in this.companyDatail.person.contacts"
            :key="contact.id"
          >
            <img :src="contact.photo_url" alt="" />
            <div>
              {{ contact.values }}
            </div>
          </div>
        </div>
        <div class="company-detail-list__decore-line"></div>
        <div class="company-detail-list__social-block">
          <div>Поделиться:</div>
          <div>
            <Facebook />
            <Vk />
            <Twiter />
            <Odnoclasniki />
          </div>
        </div>
        <div class="company-detail-list__complain" @click="complaintAdvOpen">
          Пожаловаться
        </div>
        <div
          class="company-detail-list__complain-list"
          v-if="this.complaintAdvData"
          v-click-outside="complaintAdvClose"
        >
          <CloseModal
            class="company-detail-list__close-complain"
            @click="complaintAdvClose"
          />
          <div class="company-detail-list__complain-list-title">
            Укажите причины жалобы
          </div>
          <div
            v-for="complain in this.complaintList"
            :key="complain.id"
            class="company-detail-list__complain-list-item"
          >
            <InputCheckbox
              :set-value="formDataComplain.complainTypeList"
              :id="complain.complaint_type_id + ''"
              :label="complain.complaint_type_name"
              @click.native="hanbleReOpen"
            />
          </div>
          <DefaultButton
            class="company-detail-list__complain-button"
            @click.native="sendComplain"
          >
            Отправить
          </DefaultButton>
          <TokenNotProvided
            class="company-detail-list__complain-error"
            :error-comment="errorComplain"
          />
          <Notification
            :message="errorComplain['complaint_type_ids']"
            v-if="errorComplain"
            class="main-adv__complain-error"
          />
        </div>
        <div
          v-if="$device.isDesktop"
          class="company-detail-list__buttons-group"
        >
          <div class="company-detail-list__buttons-group_button">
            <DefaultButton
              class="company-detail-list__write-to-the-author"
              @click.native="openModelWriteAuthor"
            >
              Написать автору
            </DefaultButton>
          </div>
          <div class="company-detail-list__buttons-group_button">
            <DefaultButton
              class="company-detail-list__offer-your-price"
              @click.native="subscription"
            >
              Подписаться
            </DefaultButton>
            <TokenNotProvided
              class="company-detail-list__complain-error"
              :error-comment="errorSubscription"
            />
            <Notification
              :message="errorSubscription['non_field_error']"
              v-if="errorSubscription"
            />
          </div>
        </div>
      </div>
      <div v-if="!$device.isDesktop" class="company-detail-list__product">
        <div class="company-detail-list__category-block">
          <div
            @click="getCategoryList"
            class="company-detail-list__category-list-block"
          >
            {{ categoryName }}
            <SelectArrow />
          </div>
          <div class="company-detail-list__category-adv-count">
            Всего {{ this.companyDatail.advertisementList.length }} объявлений
          </div>
        </div>
        <div
          v-if="this.categoryList"
          class="company-detail-list__category-section-list"
        >
          <div
            v-if="
              this.categoryName !== 'Выберите категорию' &&
              this.categoryName !== 'Все категории'
            "
            @click="searchCategoryAdvAll()"
          >
            Все категории
          </div>
          <div
            v-for="category in this.companyDatail.categories"
            :key="category.id"
            class="company-detail-list__category-list"
          >
            <div
              @click="
                searchCategoryAdv(category.category_key, category.category_name)
              "
            >
              {{ category.category_name }}
            </div>
          </div>
        </div>
        <div
          v-for="ads in this.companyDatail.advertisementList"
          :key="ads.id"
          class="company-detail-list__adv"
        >
          <SmallCardHorizontal :ads-data="ads" />
        </div>
      </div>
    </div>

    <DefaultModal
      v-if="openModalWriteToTheAuthor"
      :on-close="() => (openModalWriteToTheAuthor = !openModalWriteToTheAuthor)"
    >
      <div class="company-detail-list__title-message">Написать сообщение</div>
      <div class="company-detail-list__message-section">
        <div class="company-detail-list__message-block">
          <div class="company-detail-list__authir-block">
            <img :src="this.companyDatail.person.avatar" alt="" />
            <div>
              {{ this.companyDatail.person.name }}
            </div>
          </div>
          <div class="company-detail-list__phone-block-modal">
            <Phone />
            {{ this.companyDatail.person.phone }}
          </div>
        </div>
        <div class="company-detail-list__message-text-block">
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
        <div class="company-detail-list__message-bottom">
          <div>Вы можете прикрепить файл форматов jpg, png, pdf</div>
          <DefaultButton
            class="company-detail-list__message-button"
            @click.native="sendMessage"
          >
            Отправить
          </DefaultButton>
        </div>
        <Notification :message="this.errorMessage['text']" v-if="this.errorMessage" />
        <Notification
          :message="this.errorMessage['non_field_error']"
          v-if="this.errorMessage"
        />
        <TokenNotProvided :error-comment="this.errorMessage" />
      </div>
    </DefaultModal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Location from "@/assets/images/icons/location.svg?inline";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import InputCheckbox from "@/components/atoms/inputs/InputCheckboxMain.vue";
import InputTextarea from "@/components/atoms/inputs/InputTextarea.vue";
import SelectArrow from "@/assets/images/arrow/select-arrow.svg?inline";
import TokenNotProvided from "@/components/errors/TokenNotProvided";
import ClickOutside from "vue-click-outside";

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
import Verification from "@/assets/images/verification.svg?inline";
import DefaultModal from "@/components/molecules/DefaultModal.vue";
import Search from "@/components/molecules/Search.vue";
import Notification from "@/components/errors/Notification";
import CloseModal from "@/assets/images/icons/close-modal.svg?inline";
import BreadCrumbs from "@/components/molecules/BreadCrumbs.vue";

export default {
  name: "CompanyDetailList",
  data() {
    return {
      companyDatail: {},
      complaintList: {},
      complaintAdvData: false,
      categoryName: "Все категории",
      categoryId: null,
      categoryList: false,
      openModalWriteToTheAuthor: false,
      errorComplain: null,
      errorSubscription: null,
      files: [],
      c1: undefined,
      c2: undefined,
      formDataToSend: {
        message: "",
      },
      formDataComplain: {
        complainTypeList: {},
      },
      settingsSmall: {
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
      },
      errorMessage: null,
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
    Verification,
    ClickOutside,
    CloseModal,
    BreadCrumbs,
  },
  mounted() {
    this.getCompanyForGuest();
    this.complaintAdv();
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
    iterationComplaint() {
      const complain = Object.keys(this.formDataComplain.complainTypeList);
      const complainArray = [];
      for (let i = 0; i < complain.length; i++) {
        if (this.formDataComplain.complainTypeList[complain[i]] != false) {
          complainArray.push(complain[i]);
        }
      }
      return complainArray;
    },
  },
  watch: {
    companyDatail: {
      deep: true,
      handler(newValue, oldValue) {
        setTimeout(() => {
          this.c1 = this.$refs.c1;
          this.c2 = this.$refs.c2;
        }, 0);
      },
    },
  },
  directives: {
    ClickOutside,
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
    async getCompanyForGuest(category = '') {
      try {
        await this.$axios
          .get("/getCompanyForGuest", {
            params: {
              company_id: this.$route.params.pathMatch,
              category_key: category,
            },
          })
          .then((res) => {
            this.companyDatail = res.data.data;
          });
      } catch (e) {
        this.error = e.response;
      }
    },
    getAuthorAllAdvertisements() {
      this.$router.push(
        `/all-advertisement/${"company" + this.companyDatail.main.company_id}`
      );
    },
    searchCategoryAdv(id, name) {
      this.getCompanyForGuest(id);
      this.categoryName = name;
      this.categoryId = id;
      this.categoryList = false;
    },
    searchCategoryAdvAll() {
      this.getCompanyForGuest();
      this.categoryName = "Все категории";
      this.categoryId = null;
      this.categoryList = false;
    },
    complainItemIteration() {
      for (let i = 0; i < this.complaintList.length; i++) {
        this.formDataComplain.complainTypeList[
          this.complaintList[i].complaint_type_id
        ] = false;
      }
    },
    async complaintAdv() {
      try {
        await this.$axios
          .get("/getComplaintTypeList", {
            params: {
              complaint_type: "2",
            },
          })
          .then((res) => {
            this.complaintList = res.data.data;
            this.complainItemIteration();
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    complaintAdvOpen() {
      setTimeout(() => {
        this.complaintAdvData = true;
      }, 0);
    },
    async sendComplain() {
      const { formDataComplain } = this;
      try {
        await this.$axios
          .post("/storeAdvertisementComplaint", {
            advertisement_id: this.$route.params.pathMatch,
            complaint_type_ids: this.iterationComplaint,
          })
          .then((res) => {
            this.complaintAdvData = false;
          });
      } catch (e) {
        this.errorComplain = e.response.data;
      }
    },
    getCategoryList() {
      if (this.categoryList === true) {
        this.categoryList = false;
      } else this.categoryList = true;
    },
    openModelWriteAuthor() {
      this.openModalWriteToTheAuthor = true;
    },
    handleFilesUploads() {
      this.files = this.$refs.files.files;
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
      formData.append("to_company_id", this.$route.params.pathMatch);
      try {
        await this.$axios.post("/sendMessage", formData).then(() => {});
        this.openModalWriteToTheAuthor = false;
        formDataToSend.message = "";
      } catch (e) {
        this.errorMessage = e.response.data;
      }
    },
    async subscription() {
      try {
        await this.$axios.post("/storeSubscription", {
          sender_company_id: this.companyDatail.main.company_id,
        });
      } catch (e) {
        this.errorSubscription = e.response.data;
      }
    },
    complaintAdvClose() {
      this.complaintAdvData = false;
    },
    async showContact() {
      this.$router.push(`/login`);
    },
    async addAdvertisementFavorite(id) {
      try {
        await this.$axios.post("/addAdvertisementFavorite", {
          advertisement_id: id,
        });
        this.getCompanyForGuest(this.categoryId || '');
      } catch (e) {
        this.errorAddtoFavorite = e.response.data;
      }
    },
    async deleteAdvertisementsFavorite(id) {
      let advertisementIds = [];
      advertisementIds.push(id);
      try {
        await this.$axios.delete("/deleteAdvertisementsFavorite", {
          params: {
            advertisement_ids: advertisementIds,
          },
        });
        this.getCompanyForGuest(this.categoryId || '');
      } catch (e) {
        this.error = e.response.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.company-detail-list {
  &__title {
    display: flex;
    align-items: center;
    font-size: $g-second-title-size;
    padding: 15px 0 20px 0;

    svg {
      margin-right: 10px;
    }
  }

  &__close-complain {
    position: absolute;
    right: 10px;
    top: 10px;

    &:hover {
      cursor: pointer;
    }
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
    min-height: 100%;
    min-width: 100%;
    width: auto;
    height: auto;
    max-width: none;
    max-height: 595px;
    display: block;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
  }

  &__slider-small {
    width: auto;
    max-height: 80px;
    margin: 20px auto auto auto;
  }

  &__category-list {
    div {
      padding: 5px 0;
    }
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
      background: #4d8eee;
    }

    &:active {
      background: #1167ea;
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

  &__not-photos-mock {
    width: 100%;
    min-height: 300px;
  }

  &__slider-small-wrap {
    /deep/.slick-slide {
      padding: 0 10px;
      width: 100px !important;
      height: 100px;
    }
    /deep/.slick-track {
      display: flex!important;
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
    z-index: 2;

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
    margin: 30px 0 75px 0;
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
  &__slider-big-container {
    img {
      width: 100%;
      min-height: 595px;
      object-fit: cover;
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

  &__show-contact {
    cursor: pointer;
    color: $mainColor;
  }

  &__product {
    position: relative;
  }

  &__complain-error {
    position: absolute;
    width: 500px;
    background: white;
    margin-top: 10px;
  }
  /deep/.small-card-horizontal__title {
    margin: 0;
    width: 250px;
  }
  /deep/.small-card-horizontal__body-block {
    width: 250px;
  }
}

@media (max-width: $break-xlg) {
  .company-detail-list {
    padding: 0 5px;

    &__main-wrap {
      flex-direction: column;
      padding-top: 18px;
    }

    &__main-left {
      width: 100%;
    }

    &__main-right {
      width: 100%;
    }

    &__slider-big {
      height: 575px;
      object-fit: cover;
    }

    &__slider-big-container {
      img {
        width: 100%;
        min-height: 575px;
        object-fit: cover;
      }
    }

    &__buttons-group {
      display: flex;
      justify-content: space-between;

      &_button {
        width: 49%;
      }
    }

    &__category-section-list {
      top: 70px;
    }

    &__write-to-the-author {
      margin: 0;
    }

    &__message-section {
      width: 100%;
    }

    &__description {
      padding-top: 5px;
      margin-bottom: 10px;
    }

    &__main-right {
      padding: 30px 20px;
      margin-left: 0;
      background: #fff;
    }

    &__person-avatar {
      object-fit: contain;
    }

    &__person-block {
      padding-bottom: 19px;
    }

    &__decore-line {
      margin: 15px 0;
    }

    &__phone-block {
      width: 357px;
    }

    &__complain-list {
      z-index: 10;
    }

    &__product {
      padding-top: 30px;
    }

    /deep/.modal-container {
      width: 100%;
    }

    /deep/.slick-next {
      right: -17px;

      &:before {
        opacity: 1;
      }
    }

    /deep/.slick-prev {
      left: -17px;

      &:before {
        opacity: 1;
      }
    }
  }
}

@media (max-width: $break-sm) {
  .company-detail-list {
    padding: 0;

    &__slider-big {
      height: 252px;
    }

    &__not-photos-mock {
      min-height: auto;
    }

    &__title-container {
      padding: 0 7px;
    }

    &__slider-big-container {
      img {
        width: 100%;
        min-height: 252px;
        object-fit: cover;
      }
    }

    &__category-section-list {
      top: 60px;
    }

    &__hashtags {
      padding: 0 7px;
    }

    &__hashtag {
      margin-bottom: 10px;
    }

    &__buttons-group {
      padding: 0 7px;
      flex-direction: column;

      &_button {
        width: 100%;
      }
    }

    &__write-to-the-author {
      margin-bottom: 10px;
    }

    &__description {
      margin-top: 20px;
    }

    &__description {
      padding: 5px 7px 20px;
    }

    &__main-right {
      padding: 11px 7px;
    }

    &__phone-block {
      width: 100%;
    }

    &__person-avatar {
      margin-right: 8px;
    }

    &__product {
      padding: 20px 7px;
    }

    &__category-block {
      flex-direction: column;
      margin-bottom: 16px;
    }

    &__category-adv-count {
      top: 0;
    }

    &__category-list-block {
      margin-bottom: 15px;
    }

    /deep/.slick-next {
      right: 7px;
    }

    /deep/.slick-prev {
      left: 7px;
    }

    /deep/.small-card-horizontal__location-block {
      width: 90%;
    }
  }
}
</style>
