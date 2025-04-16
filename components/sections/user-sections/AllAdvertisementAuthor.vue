<template>
  <div
    class="all-advertisement-author l-wrap"
    v-if="allAuthorAdvertisements.advertisementList != null"
  >
    <Search />
    <BreadCrumbs :lastItemName="allAuthorAdvertisements.person.name" />
    <div
      class="all-advertisement-author__title"
      v-if="this.$route.params.pathMatch.indexOf('company') == 0"
    >
      Все объявления компании
    </div>
    <div
      class="all-advertisement-author__title"
      v-if="this.$route.params.pathMatch.indexOf('company') == -1"
    >
      Все объявления автора
    </div>
    <div class="all-advertisement-author__top-section">
      <div class="all-advertisement-author__user-nav-block">
        <div
          class="all-advertisement-author__performer"
          :class="{ performer: performer }"
          @click="performerActive"
        >
          Исполнители
        </div>
        <div
          class="all-advertisement-author__employer"
          :class="{ employer: employer }"
          @click="employerActive"
        >
          Рекламодатели
        </div>
      </div>
      <div class="all-advertisement-author__select-wrap">
        <div class="all-advertisement-author__select" @click="selectOpen">
          {{ this.categorySelected }}
          <SelectArrow />
        </div>
        <div
          class="all-advertisement-author__select-option-body"
          v-if="selectOpened"
        >
          <div
            v-if="
              this.categorySelected !== 'Выберите категорию' &&
              this.categorySelected !== 'Все категории'
            "
            @click="searchCategoryAdvAll()"
          >
            Все категории
          </div>
          <div
            v-for="category in allAuthorAdvertisements.categories"
            :key="category.id"
          >
            <div
              @click="
                categoryKeySend(category.category_key, category.category_name)
              "
            >
              {{ category.category_name }}
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="all-advertisement-author__author">Рекламодатель</div> -->
    </div>
    <div class="all-advertisement-author__body">
      <div class="all-advertisement-author__body-right">
        <TokenNotProvided
          class="all-advertisement-author__token-error"
          :error-comment="errorAddtoFavorite"
        />
        <div
          class="all-advertisement-author__card"
          v-for="allAdv in allAuthorAdvertisements.advertisementList.data"
          :key="allAdv.id"
        >
          <SmallCard
            :ads-data="allAdv"
            :add-advertisement-favorite="addAdvertisementFavorite"
            :delete-advertisements-favorite="deleteAdvertisementsFavorite"
          />
        </div>
      </div>
      <div class="all-advertisement-author__body-left">
        <NuxtLink
          :to="
            this.$route.params.pathMatch.indexOf('company') == -1
              ? `/user-detail/${allAuthorAdvertisements.person.id}`
              : this.$route.params.pathMatch.indexOf('company') == 0
              ? `/company-detail/${allAuthorAdvertisements.person.id}`
              : ''
          "
          class="all-advertisement-author__author-info"
        >
          <div>
            <img :src="allAuthorAdvertisements.person.avatar" alt="" />
          </div>
          <div>
            <div>
              {{ allAuthorAdvertisements.person.name }}
            </div>
            <div class="all-advertisement-author__author-create-at">
              На advon с
              {{ allAuthorAdvertisements.person.created_at }}
            </div>
          </div>
        </NuxtLink>
        <div class="all-advertisement-author__decore-line"></div>
        <div>Контакты</div>
        <div
          class="all-advertisement-author__phone-block"
          v-if="allAuthorAdvertisements.person.phone"
        >
          <div>
            <Phone />
            {{ allAuthorAdvertisements.person.phone }}
          </div>
          <div
            v-if="!loggedInUser"
            @click="showContact"
            class="all-advertisement-author__show-contact"
          >
            Показать телефон
          </div>
        </div>
        <div class="all-advertisement-author__contacts-block">
          <div
            v-for="contact in this.allAuthorAdvertisements.person.contacts"
            :key="contact.id"
          >
            <img :src="contact.photo_url" alt="" />
            <div>
              {{ contact.values }}
            </div>
          </div>
        </div>
        <div class="all-advertisement-author__decore-line"></div>
        <div class="all-advertisement-author__social-block">
          <div>Поделиться:</div>
          <div>
            <Facebook />
            <Vk />
            <Twiter />
            <Odnoclasniki />
          </div>
        </div>
        <div class="all-advertisement-author__complain" @click="complaintAdv">
          Пожаловаться
        </div>
        <div
          class="all-advertisement-author__complain-list"
          v-if="this.complaintAdvData"
          v-click-outside="complaintAdvOutside"
        >
          <CloseModal
            class="all-advertisement-author__close-complain"
            @click="complaintAdvClose"
          />
          <div class="all-advertisement-author__complain-list-title">
            Укажите причины жалобы
          </div>
          <div
            v-for="complain in this.complaintList"
            :key="complain.id"
            class="all-advertisement-author__complain-list-item"
          >
            <InputCheckbox
              :set-value="formDataComplain.complainTypeList"
              :id="complain.complaint_type_id + ''"
              :label="complain.complaint_type_name"
              @click.native="hanbleReOpen"
            />
          </div>
          <DefaultButton
            class="all-advertisement-author__complain-button"
            @click.native="sendComplain"
          >
            Отправить
          </DefaultButton>
          <TokenNotProvided
            :error-comment="errorComplaint"
            class="all-advertisement-author__complain-error"
          />
          <Notification
            :message="errorComplaint['complaint_type_ids']"
            v-if="errorComplaint"
            class="main-adv__complain-error"
          />
        </div>
        <div>
          <DefaultButton
            @click.native="openModelWriteAuthor"
            class="all-advertisement-author__write-to-the-author"
          >
            Написать автору
          </DefaultButton>
        </div>
        <div>
          <DefaultButton
            class="all-advertisement-author__offer-your-price"
            @click.native="subscription"
          >
            Подписаться
          </DefaultButton>
        </div>
        <Notification
          :message="errorSubscription['non_field_error']"
          v-if="errorSubscription"
        />
        <TokenNotProvided :error-comment="errorSubscription" />
      </div>
    </div>
    <DefaultModal
      v-if="openModalWriteToTheAuthor"
      :on-close="() => (openModalWriteToTheAuthor = !openModalWriteToTheAuthor)"
    >
      <div class="all-advertisement-author__title-message">
        Написать сообщение
      </div>
      <div class="all-advertisement-author__message-section">
        <div class="all-advertisement-author__message-block">
          <div class="all-advertisement-author__authir-block">
            <img :src="this.allAuthorAdvertisements.person.avatar" alt="" />
            <div>
              {{ this.allAuthorAdvertisements.person.name }}
            </div>
          </div>
          <div class="all-advertisement-author__phone-block-modal">
            <Phone />
            {{ this.allAuthorAdvertisements.person.phone }}
          </div>
        </div>
        <div class="all-advertisement-author__message-text-block">
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
        <div class="all-advertisement-author__message-bottom">
          <div>Вы можете прикрепить файл форматов jpg, png, pdf</div>
          <DefaultButton
            class="all-advertisement-author__message-button"
            @click.native="sendMessage"
          >
            Отправить
          </DefaultButton>
        </div>
        <TokenNotProvided
          :error-comment="this.errorSendMessage"
          class="all-advertisement-author__errore-send-message"
        />
        <Notification
          :message="errorSendMessage['non_field_error']"
          v-if="errorSendMessage"
        />
        <Notification
          :message="errorSendMessage['text']"
          v-if="errorSendMessage"
        />
      </div>
    </DefaultModal>
    <Pagination
      v-if="maxPage > 1"
      :max-page="maxPage"
      :page="page"
      :handle-page-change="handlePageChange"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SmallCard from "@/components/molecules/SmallCard.vue";
import SelectArrow from "@/assets/images/arrow/select-arrow.svg?inline";
import Phone from "@/assets/images/icons/phone.svg?inline";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import InputCheckbox from "@/components/atoms/inputs/InputCheckboxMain.vue";
import Pagination from "@/components/molecules/Pagination.vue";

import Facebook from "@/assets/images/social/facebook.svg?inline";
import Vk from "@/assets/images/social/vk.svg?inline";
import Twiter from "@/assets/images/social/twiter.svg?inline";
import Odnoclasniki from "@/assets/images/social/odnoclasniki.svg?inline";
import Search from "@/components/molecules/Search.vue";
import TokenNotProvided from "@/components/errors/TokenNotProvided";
import Clip from "@/assets/images/icons/clip.svg?inline";
import InputTextarea from "@/components/atoms/inputs/InputTextarea.vue";
import DefaultModal from "@/components/molecules/DefaultModal.vue";
import Notification from "@/components/errors/Notification";
import CloseModal from "@/assets/images/icons/close-modal.svg?inline";
import ClickOutside from "vue-click-outside";
import BreadCrumbs from "@/components/molecules/BreadCrumbs.vue";

export default {
  name: "AllAdvertisementAuthor",
  data() {
    return {
      performer: true,
      employer: false,
      userType: "performer",
      allAuthorAdvertisements: {},
      selectOpened: false,
      complaintAdvData: false,
      formDataComplain: {
        complainTypeList: {},
      },
      complaintList: {},
      categoryKey: "",
      categorySelected: "Выберите категорию",
      openModalWriteToTheAuthor: false,
      formDataToSend: {
        message: "",
      },
      errorSendMessage: null,
      errorSubscription: null,
      files: "",
      errorComplaint: null,
      errorAddtoFavorite: null,
      maxPage: null,
      page: 1,
    };
  },
  components: {
    DefaultButton,
    SmallCard,
    SelectArrow,
    Phone,
    Facebook,
    Vk,
    Twiter,
    Odnoclasniki,
    InputCheckbox,
    Search,
    TokenNotProvided,
    Clip,
    DefaultModal,
    InputTextarea,
    Notification,
    CloseModal,
    Pagination,
    BreadCrumbs,
  },
  mounted() {
    this.getAuthorAllAdvertisements();
    if (JSON.parse(localStorage.getItem("user-key")) !== null) {
      this.userType = JSON.parse(localStorage.getItem("user-key"));
      if ((this.userType === "performer")) {
        this.performer = true;
        this.employer = false;
      }
      if ((this.userType === "employer")) {
        this.performer = false;
        this.employer = true;
      }
    }
  },
  directives: {
    ClickOutside,
  },
  computed: {
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
    ...mapGetters(["loggedInUser"]),
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
    async getAuthorAllAdvertisements(page) {
      let id;
      let idUser;
      let idCompany;
      let queryPage;
      if (
        this.$route.params.pathMatch.indexOf("user") == -1 &&
        this.$route.params.pathMatch.indexOf("company") == -1
      ) {
        id = this.$route.params.pathMatch.replaceAll("/", "");
      }
      if (this.$route.params.pathMatch.indexOf("user") == 0) {
        idUser = this.$route.params.pathMatch.replace(/user/g, "");
      }
      if (this.$route.params.pathMatch.indexOf("company") == 0) {
        idCompany = this.$route.params.pathMatch.replace(/company/g, "");
      }
      if (this.$route.query.page) {
        queryPage = +this.$route.query.page;
      }
      try {
        await this.$axios
          .get("/getAuthorAllAdvertisements", {
            params: {
              advertisement_id: id,
              advertisement_type: this.userType,
              user_id: idUser,
              company_id: idCompany,
              category_key: this.categoryKey,
              page: this.page || queryPage,
            },
          })
          .then((res) => {
            this.allAuthorAdvertisements = res.data.data;
            this.maxPage =
              this.allAuthorAdvertisements.advertisementList.last_page;
            this.page =
              this.allAuthorAdvertisements.advertisementList.current_page;
          });
      } catch (e) {
        this.error = e.response;
      }
    },
    handlePageChange(page) {
      let userData = this.$route.params.pathMatch;
      this.page = page;
      this.$router.push({
        path: `/all-advertisement/${userData}`,
        query: { page: page },
      });
      this.getAuthorAllAdvertisements(page);
    },
    categoryKeySend(categoryKey, categoryName) {
      this.categoryKey = categoryKey;
      this.page = 1;
      this.getAuthorAllAdvertisements(1, {
        params: {
          advertisement_id: this.$route.params.pathMatch,
          category_key: this.categoryKey,
          advertisement_type: this.userType,
        },
      });
      this.categorySelected = categoryName;
      this.selectOpened = false;
      this.$router.push({
        path: `/all-advertisement/${this.$route.params.pathMatch}`,
        query: { page: 1 },
      });
    },
    searchCategoryAdvAll() {
      this.categoryKey = "";
      this.getAuthorAllAdvertisements(1, {
        params: {
          advertisement_id: this.$route.params.pathMatch,
          category_key: this.categoryKey,
        },
      });
      this.categorySelected = "Все категории";
      this.selectOpened = false;
      this.$router.push({
        path: `/all-advertisement/${this.$route.params.pathMatch}`,
        query: { page: 1 },
      });
    },
    selectOpen() {
      if (this.selectOpened === false) {
        this.selectOpened = true;
      } else this.selectOpened = false;
    },
    async complaintAdv() {
      try {
        await this.$axios
          .get("/getComplaintTypeList", {
            params: {
              complaint_type: "3",
            },
          })
          .then((res) => {
            this.complaintList = res.data.data;
          });
        this.complaintAdvData = true;
      } catch (e) {
        this.error = e.response;
      }
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
            this.complaintList = res.data.data;
          });
        this.complaintAdvData = false;
      } catch (e) {
        this.errorComplaint = e.response.data;
      }
    },
    async subscription() {
      try {
        await this.$axios.post("/storeSubscription", {
          sender_user_id: this.allAuthorAdvertisements.person.id,
        });
      } catch (e) {
        this.errorSubscription = e.response.data;
      }
    },
    openModelWriteAuthor() {
      this.openModalWriteToTheAuthor = true;
    },
    complaintAdvClose() {
      this.complaintAdvData = false;
    },
    complaintAdvOutside() {
      this.complaintAdvData = false;
    },
    async sendMessage() {
      const { formDataToSend } = this;
      let formData = new FormData();
      let files = "";
      for (var i = 0; i < this.files.length; i++) {
        files = this.files[i];
        formData.append("files[" + i + "]", files);
      }
      formData.append("text", formDataToSend.message);
      formData.append("advertisement_id", this.$route.params.pathMatch);
      try {
        await this.$axios.post("/sendMessage", formData).then(() => {});
        this.openModalWriteToTheAuthor = false;
        formDataToSend.message = "";
      } catch (e) {
        this.errorSendMessage = e.response.data;
      }
    },
    handleFilesUploads() {
      this.files = this.$refs.files.files;
    },
    async addAdvertisementFavorite(id) {
      try {
        await this.$axios.post("/addAdvertisementFavorite", {
          advertisement_id: id,
        });
        this.getAuthorAllAdvertisements();
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
        this.getAuthorAllAdvertisements();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async showContact() {
      this.$router.push(`/login`);
    },
    performerActive() {
      this.userType = "performer";
      this.page = 1;
      this.getAuthorAllAdvertisements({
        params: {
          page: this.page,
          advertisement_type: this.userType,
          search: this.searchData,
        },
      });
      this.performer = true;
      this.employer = false;
    },
    employerActive() {
      this.userType = "employer";
      this.page = 1;
      this.getAuthorAllAdvertisements({
        params: {
          page: this.page,
          advertisement_type: this.userType,
          search: this.searchData,
        },
      });
      this.performer = false;
      this.employer = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.all-advertisement-author {
  min-height: 80vh;
  &__title {
    font-size: $g-second-title-size;
    padding: 15px 0;
  }

  &__body {
    display: flex;
  }

  &__body-left {
    width: 25%;
  }

  &__body-right {
    width: 75%;
    display: flex;
    flex-wrap: wrap;
  }

  &__card {
    width: 33%;
  }

  &__select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $mainSecondColor;
    width: 264px;
    border: 1px solid $mainFourthColor;
    padding: 13px 10px 13px 10px;
    margin-bottom: 30px;

    &:hover {
      cursor: pointer;
    }
  }

  &__select-wrap {
    position: relative;
  }

  &__select-option-body {
    position: absolute;
    top: 43px;
    background: $mainSecondColor;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    z-index: 1;
    width: 264px;
    padding: 10px;
    z-index: 10;

    div {
      padding-bottom: 5px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  &__token-error {
    position: absolute;
    width: 476px;
    z-index: 2;
    background: white;
  }

  &__top-section {
    display: flex;
    justify-content: space-between;
    width: 73%;
  }

  &__author {
    background: #d4e3f6;
    padding: 10px 30px;
    height: 43px;
  }

  &__decore-line {
    border: 1px solid $mainFourthColor;
    margin: 20px 0;
  }

  &__author-info {
    display: flex;
    align-items: center;
    color: black;

    &:hover {
      color: $mainColor;
      text-decoration: underline;

      .all-advertisement-author__author-create-at {
        color: $mainColor;
      }
    }

    img {
      width: 68px;
      height: 68px;
      margin-right: 30px;
      object-fit: cover;
    }
  }

  &__author-create-at {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
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
  &__message-block {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
  }

  &__message-section {
    width: 754px;
  }
  &__title-message {
    line-height: 21px;
    font-size: $g-font-third-size;
    padding-bottom: 30px;
  }

  &__authir-block {
    display: flex;
    align-items: center;

    img {
      margin-right: 10px;
      max-width: 70px;
      max-height: 70px;
    }
  }

  &__message-button {
    background: $buttonColor;
    width: 166px;
  }

  &__complain-error {
    width: 265px;
  }

  &__message-bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
    color: $mainFifthColor;
    font-size: $g-mobile-size;
  }

  &__message-text-block {
    position: relative;

    svg {
      top: 50px;
      right: 5px;
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

  &__user-nav-block {
    display: flex;
    margin-bottom: 20px;
  }

  &__employer,
  &__performer {
    color: $mainColor;
    padding: 15px 15px;

    &:hover {
      cursor: pointer;
    }
  }

  .performer,
  .employer {
    background: #d4e3f6;
    padding: 10px 15px;
    color: $mainThirdColor;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 44px;

    &:hover {
      cursor: pointer;
    }
  }
}

@media (max-width: $break-xlg) {
  .all-advertisement-author {
    padding: 0 5px;

    &__select {
      margin-bottom: 20px;
    }

    &__select-option-body {
      z-index: 10;
    }

    &__body-right {
      width: 67%;
    }

    &__body-left {
      width: 33%;
    }

    &__card {
      width: 50%;
      margin-bottom: 10px;
    }

    &__complain-list {
      z-index: 10;
      right: 0;
    }

    &__message-section {
      width: 100%;
    }
    /deep/.modal-container {
      width: 100%;
    }
  }
}

@media (max-width: $break-sm) {
  .all-advertisement-author {
    padding: 0 7px;

    &__body {
      flex-direction: column;
    }

    &__body-right {
      width: 100%;
    }

    &__body-left {
      width: 100%;
      order: -1;
      padding-bottom: 20px;
    }

    &__top-section {
      flex-wrap: wrap;
      width: 100%;
    }

    &__author-info {
      img {
        margin-right: 7px;
      }
    }

    &__complain-list {
      width: 100%;
    }

    &__message-block {
      flex-direction: column;
    }

    &__phone-block-modal {
      width: 200px;
    }

    /deep/.small-card__image-conatiner {
      height: 117px;
      margin: 0;
    }

    /deep/.small-card {
      width: 95%;
      height: auto;
    }
  }
}
</style>
