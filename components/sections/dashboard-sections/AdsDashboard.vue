<template>
  <div class="ads-dashboard">
    <div v-if="this.advListUser.advertisementList != null">
      <div v-if="this.advListUser.is_advertisement_user === false">
        <div class="ads-dashboard__title">Объявления</div>
        <div class="ads-dashboard__text">
          У вас еще нет объявлений. Хотите создать объявление?
        </div>
        <div class="ads-dashboard__button-create-adv" @click="createAdv">
          Создать объявление
        </div>
      </div>
    </div>
    <div v-if="this.advListUser.advertisementList != null">
      <div
        v-if="this.advListUser.is_advertisement_user"
        class="ads-dashboard__title-block"
      >
        <div class="ads-dashboard__title">Объявления</div>
        <div class="ads-dashboard__button-group">
          <DefaultButton
            class="ads-dashboard__private"
            @click.native="adsListUser"
            :class="{ activePerformers: activePerformers }"
          >
            Частные
          </DefaultButton>
          <DefaultButton
            class="ads-dashboard__company"
            @click.native="adsListCompany"
            :class="{ activeAdvertisers: activeAdvertisers }"
          >
            Компании
          </DefaultButton>
        </div>
        <div class="ads-dashboard__limited" v-if="this.advListUser.is_limit">
          <div class="ads-dashboard__limited-text">
            Вы достигли лимита активных объявлений
          </div>
          <div class="ads-dashboard__detel" @click="openLimitedModal">
            Детально
          </div>
        </div>
        <div class="ads-dashboard__search-group">
          <div
            @click="getCategoryList"
            class="ads-dashboard__category-list-block"
          >
            {{ categoryName }}
            <SelectArrow />
          </div>
          <div
            v-if="this.categoryList"
            class="ads-dashboard__category-section-list"
          >
            <div
              v-for="category in this.advListUser.categories"
              :key="category.id"
              class="ads-dashboard__category-list"
            >
              <div
                v-if="categoryName !== 'Все категории'"
                @click="searchCategoryAdvAll()"
              >
                Все категории
              </div>
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
            class="ads-dashboard__active"
            @click="activeAdv"
            :class="{ activateAdv: activateAdv }"
          >
            Активные
            <span>{{ this.advListUser.number_active }}</span>
          </div>
          <div
            class="ads-dashboard__inactive"
            @click="inactiveAdv"
            :class="{ inactivateAdv: inactivateAdv }"
          >
            Неактивные
            <span>{{ this.advListUser.number_passive }}</span>
          </div>
          <div class="ads-dashboard__search">
            <div class="ads-dashboard__search-block">
              <input type="text" placeholder="Поиск" v-model="searchData" />
              <Search />
            </div>
            <DefaultButton
              class="ads-dashboard__search-button"
              @click.native="searchAdv"
            >
              Искать
            </DefaultButton>
          </div>
        </div>
        <div class="ads-dashboard__selection-block">
          <div class="checkbox">
            <input
              type="checkbox"
              id="all"
              v-model="all"
              @click="chekedAll"
              class="custom-checkbox"
            />
            <label for="all"> Выбрать все </label>
          </div>
          <div class="ads-dashboard__selection-block-nav">
            <div @click="setPublished">Активировать</div>
            <div @click="setDeactivate">Деактивировать</div>
            <div @click="deleteAdvertisement">Удалить</div>
          </div>
        </div>
        <div v-if="this.advListUser.advertisementList != null">
          <div
            class="ads-dashboard__checbox-wrap"
            v-for="adv in this.advListUser.advertisementList.data"
            :key="adv.id"
          >
            <div class="checkbox">
              <input
                class="custom-checkbox"
                type="checkbox"
                :id="adv.advertisement_id"
                :value="adv.advertisement_id"
                v-model="checkedNames"
              />
              <label :for="adv.advertisement_id" class="ads-dashboard__section">
              </label>
            </div>
            <div class="ads-dashboard__mkt-block">
              <div class="ads-dashboard__mkt">
                <div
                  :class="{ hideAdv: adv.is_hide }"
                  class="ads-dashboard__mkt-hide-block"
                >
                  <div
                    class="ads-dashboard__mkt-hide"
                    :class="{ hideAdv: adv.is_hide }"
                  >
                    <Visibility />
                  </div>
                  <img :src="adv.image" alt="image" />
                </div>
                <div class="ads-dashboard__mkt-main-block">
                  <div class="ads-dashboard__mkt-title">
                    {{ adv.title }}
                  </div>
                  <div v-if="$device.isMobile" class="ads-dashboard__price">
                    <span v-if="adv.price != 0">
                      {{ adv.price | price-break }}
                    </span>
                    <span v-if="adv.price == 0">
                      {{ adv.price_type }}
                    </span>
                    <span v-if="adv.price != 0">
                      {{ adv.translation_currency_code }} /
                    </span>
                    {{ adv.payment_name }}
                  </div>
                  <div v-if="$device.isMobile" class="ads-dashboard__boosts">
                    <div v-if="adv.is_allocate">
                      <img
                      src="@/assets/images/promotion/raising-all-over-the-country.png"
                      alt=""
                    />
                      Выделение до
                      <span>
                        {{adv.is_allocate_at}}
                      </span>
                    </div>
                    <div v-if="adv.is_top_country">
                      <img
                      src="@/assets/images/promotion/highlighting.png"
                      alt=""
                    />
                      Топ до
                      <span>
                        {{adv.is_top_country_at}}
                      </span>
                      </div>
                    <div v-if="adv.is_urgent">
                      <img src="@/assets/images/promotion/urgently.png" alt="" />
                      Срочно до
                      <span>
                        {{adv.is_urgent_at}}
                      </span>
                    </div>
                  </div>
                  <div class="ads-dashboard__mkt-category">
                    {{ adv.category_name }}
                  </div>
                  <div class="ads-dashboard__mkt-date" v-if="adv.date_start">
                    С {{ adv.date_start }} по {{ adv.date_finish }}
                  </div>
                  <div v-if="!$device.isMobile" class="ads-dashboard__mkt-nav">
                    <div @click="goToAdv(adv.advertisement_id)">
                      Просмотреть
                    </div>
                    <div @click="handleClick(adv.advertisement_id)">
                      Редактировать
                    </div>
                    <div
                      @click="setDeactivateOne(adv.advertisement_id)"
                      v-if="adv.is_published === true"
                    >
                      Деактивировать
                    </div>
                    <div
                      @click="setPublishedOne(adv.advertisement_id)"
                      v-if="adv.is_published === false"
                    >
                      Активировать
                    </div>
                    <div
                      v-if="adv.is_hide === false"
                      class="ads-dashboard__mkt-nav_hide"
                    >
                      <span @click="setHide(adv.advertisement_id)">Скрыть</span>
                      <span
                        title="Вы можете скрыть это объявление, нажав сюда. В этом случае объявление не будет отображаться в поиске. Вы не сможете его рекламировать. Но у вас останется возможность предоставить непосредственный доступ к объявлению-по ссылке."
                        class="ads-dashboard__question"
                      >
                        <Question />
                      </span>
                    </div>
                    <div
                      class="ads-dashboard__mkt-nav_hide"
                      v-if="adv.is_hide === true"
                    >
                      <span @click="setShow(adv.advertisement_id)">Сделать видимым</span>
                      <span
                        title="Нажмите “Копировать ссылку” и она будет сохранена в буфере обмена"
                        class="ads-dashboard__question"
                      >
                        <Question />
                      </span>
                    </div>
                  </div>
                  <div
                    v-if="!$device.isMobile"
                    class="ads-dashboard__down-block"
                  >
                    <div>
                      <Eye />
                      {{ adv.number_views }}
                    </div>
                    <div>
                      <Phone />
                      {{ adv.number_contacts }}
                    </div>
                    <div>
                      <NumberMessage />
                      {{ adv.number_messages }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="$device.isMobile" class="ads-dashboard__mkt-nav">
                <div @click="goToAdv(adv.advertisement_id)">Просмотреть</div>
                <div @click="handleClick(adv.advertisement_id)">
                  Редактировать
                </div>
                <div
                  @click="setDeactivateOne(adv.advertisement_id)"
                  v-if="adv.is_published === true"
                >
                  Деактивировать
                </div>
                <div
                  @click="setPublishedOne(adv.advertisement_id)"
                  v-if="adv.is_published === false"
                >
                  Активировать
                </div>
                <div class="ads-dashboard__mkt-nav_hide"
                  v-if="adv.is_hide === false">
                    <span @click="setHide(adv.advertisement_id)">Скрыть</span>
                    <span
                      title="Вы можете скрыть это объявление, нажав сюда. В этом случае объявление не будет отображаться в поиске. Вы не сможете его рекламировать. Но у вас останется возможность предоставить непосредственный доступ к объявлению-по ссылке."
                      class="ads-dashboard__question"
                    >
                      <Question />
                      <div class="ads-dashboard__question-mobile">
                          Вы можете скрыть это объявление, нажав сюда. В этом случае объявление не будет отображаться в поиске. Вы не сможете его рекламировать. Но у вас останется возможность предоставить непосредственный доступ к объявлению-по ссылке.
                      </div>
                    </span>
                </div>
                <div class="ads-dashboard__mkt-nav_hide"
                  v-if="adv.is_hide === true"
                >
                  <span @click="setShow(adv.advertisement_id)">Сделать видимым</span>
                  <span
                    title="Нажмите “Копировать ссылку” и она будет сохранена в буфере обмена"
                    class="ads-dashboard__question"
                  >
                    <Question />
                    <div class="ads-dashboard__question-mobile">
                        Нажмите “Копировать ссылку” и она будет сохранена в буфере обмена
                    </div>
                  </span>
                </div>
              </div>
              <div class="ads-dashboard__mkt-last-block">
                <div v-if="!$device.isMobile" class="ads-dashboard__price">
                  <span v-if="adv.price != 0">
                    {{ adv.price | price-break }}
                  </span>
                  <span v-if="adv.price == 0">
                    {{ adv.price_type }} /
                  </span>
                  <span v-if="adv.price != 0">
                    {{ adv.translation_currency_code }} /
                  </span>
                  {{ adv.payment_name }}
                </div>
                <div v-if="!$device.isMobile" class="ads-dashboard__boosts">
                  <div v-if="adv.is_allocate">
                    <img
                    src="@/assets/images/promotion/raising-all-over-the-country.png"
                    alt=""
                  />
                    Выделение до
                    <span>
                      {{adv.is_allocate_at}}
                    </span>
                  </div>
                  <div v-if="adv.is_top_country">
                    <img
                    src="@/assets/images/promotion/highlighting.png"
                    alt=""
                  />
                    Топ до
                    <span>
                      {{adv.is_top_country_at}}
                    </span>
                    </div>
                  <div v-if="adv.is_urgent">
                    <img src="@/assets/images/promotion/urgently.png" alt="" />
                    Срочно до
                    <span>
                      {{adv.is_urgent_at}}
                    </span>
                  </div>
                </div>
                <div v-if="$device.isMobile" class="ads-dashboard__down-block">
                  <div>
                    <Eye />
                    {{ adv.number_views }}
                  </div>
                  <div>
                    <Phone />
                    {{ adv.number_contacts }}
                  </div>
                  <div>
                    <NumberMessage />
                    {{ adv.number_messages }}
                  </div>
                </div>
                <DefaultButton
                  v-if="!adv.is_hide"
                  class="ads-dashboard__mkt-advertise"
                  @click.native="promotionAdv(adv.advertisement_id)"
                  :class="{ disableButton: adv.is_hide }"
                  :disabled="adv.is_hide"
                >
                  Рекламировать
                </DefaultButton>
                <DefaultButton class="ads-dashboard__copy-link" v-else @click.native="handleCopyLink(adv.advertisement_id)">Копировать ссылку</DefaultButton>
              </div>
            </div>
          </div>
          <Notification
            :message="errorPublished['non_field_error']"
            v-if="errorPublished"
          />
        </div>
      </div>
      <Pagination
        v-if="maxPage > 1"
        :max-page="maxPage"
        :page="page"
        :handle-page-change="handlePageChange"
      />
    </div>

    <DefaultModal
      v-if="lImitedModal"
      :on-close="() => (lImitedModal = !lImitedModal)"
      class="ads-dashboard__modal"
    >
      <div class="ads-dashboard__limited-title">
        Вы достигли лимита в следующих разделах:
      </div>
      <div
        v-for="limit in limited"
        :key="limit.id"
        class="ads-dashboard__limit-group"
      >
        <div class="ads-dashboard__category-name-limit">
          {{ limit.category_name }}
        </div>
        <div>
          Активных объявлений
          <span>
            {{ limit.advertisement_active }}
          </span>
        </div>
        <div>|</div>
        <div>
          Лимит
          <span>
            {{ limit.limit }}
          </span>
        </div>
        <DefaultButton
          class="ads-dashboard__button-limit"
          @click.native="goToPageIncreaseLimit(limit.category_key)"
        >
          Расширить лимит
        </DefaultButton>
      </div>
    </DefaultModal>
  </div>
</template>

<script>
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import SelectArrow from "@/assets/images/arrow/select-arrow.svg?inline";
import Eye from "@/assets/images/adv/eye.svg?inline";
import Phone from "@/assets/images/adv/phone.svg?inline";
import NumberMessage from "@/assets/images/adv/number-message.svg?inline";
import Search from "@/assets/images/icons/search.svg?inline";
import Visibility from "@/assets/images/icons/visibility.svg?inline";
import DefaultModal from "@/components/molecules/DefaultModal.vue";
import Notification from "@/components/errors/Notification";
import Pagination from "@/components/molecules/Pagination.vue";
import Question from "@/assets/images/icons/question.svg?inline";

export default {
  name: "AdsDashboard",
  data() {
    return {
      activeAdvertisers: false,
      activePerformers: true,
      inactivateAdv: false,
      activateAdv: true,
      advListUser: {},
      categoryList: false,
      categoryName: "Все категории",
      categoryId: "",
      checkedNames: [],
      all: [],
      isPublishe: 1,
      searchData: "",
      privatePerson: "private_person",
      limited: "",
      lImitedModal: false,
      hideAdv: false,
      disableButton: false,
      errorPublished: null,
      allCheck: [],
      maxPage: null,
      page: 1,
    };
  },
  components: {
    DefaultButton,
    SelectArrow,
    Eye,
    Phone,
    Search,
    NumberMessage,
    DefaultModal,
    Notification,
    Visibility,
    Pagination,
    Question,
  },
  mounted() {
    this.adsListUser();
    this.getAdvertisementLimit();
  },
  methods: {
    handleClick(advId) {
      this.$router.push(`edit-ad/${advId}`);
    },
    async adsList() {
      try {
        await this.$axios
          .get("/getAdvertisementListForUser", {
            params: {
              is_published: this.isPublishe,
              person_type: this.privatePerson,
              search: this.searchData,
              category_id: this.categoryId,
            },
          })
          .then((res) => {
            this.advListUser = res.data.data;
            this.maxPage = this.advListUser.advertisementList.last_page;
            this.page = 1;
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async adsListUser() {
      this.privatePerson = "private_person";
      try {
        await this.$axios
          .get("/getAdvertisementListForUser", {
            params: {
              is_published: this.isPublishe,
              person_type: this.privatePerson,
              search: this.searchData,
              category_id: this.categoryId,
            },
          })
          .then((res) => {
            this.advListUser = res.data.data;
            this.maxPage = this.advListUser.advertisementList.last_page;
          });
        this.activePerformers = true;
        this.activeAdvertisers = false;
        this.page = 1;
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async handlePageChange(page) {
      this.page = page;
      this.$router.push({
        path: `/dashboard/ads/?${("page", page)}`,
      });
      try {
        await this.$axios
          .get("/getAdvertisementListForUser", {
            params: {
              is_published: this.isPublishe,
              person_type: this.privatePerson,
              search: this.searchData,
              category_id: this.categoryId,
              page: this.page,
            },
          })
          .then((res) => {
            this.advListUser = res.data.data;
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async adsListCompany() {
      this.privatePerson = "company";
      try {
        await this.$axios
          .get("/getAdvertisementListForUser", {
            params: {
              is_published: this.isPublishe,
              person_type: this.privatePerson,
              search: this.searchData,
              category_id: this.categoryId,
            },
          })
          .then((res) => {
            this.advListUser = res.data.data;
            this.page = 1;
            this.maxPage = this.advListUser.advertisementList.last_page;
          });
        this.activePerformers = false;
        this.activeAdvertisers = true;
      } catch (e) {
        this.error = e.response.data;
      }
    },
    getCategoryList() {
      if (this.categoryList === true) {
        this.categoryList = false;
      } else this.categoryList = true;
    },
    async searchCategoryAdv(categoryKey, categoryName) {
      this.categoryKey = categoryKey;
      try {
        await this.$axios
          .get("/getAdvertisementListForUser", {
            params: {
              is_published: this.isPublishe,
              person_type: this.privatePerson,
              category_key: this.categoryKey,
              search: this.searchData,
            },
          })
          .then((res) => {
            this.advListUser = res.data.data;
            this.categoryName = categoryName;
            this.maxPage = this.advListUser.advertisementList.last_page;
            this.page = 1;
          });
        this.categoryList = false;
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async searchCategoryAdvAll(categoryKey, categoryName) {
      this.categoryKey = categoryKey;
      try {
        await this.$axios
          .get("/getAdvertisementListForUser", {
            params: {
              is_published: this.isPublishe,
              person_type: this.privatePerson,
              category_key: "",
              search: this.searchData,
            },
          })
          .then((res) => {
            this.advListUser = res.data.data;
            this.maxPage = this.advListUser.advertisementList.last_page;
            this.page = 1;
            this.categoryName = categoryName;
          });
        this.categoryList = false;
        this.categoryName = "Все категории";
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getAdvertisementLimit() {
      try {
        await this.$axios.get("/getAdvertisementLimit").then((res) => {
          this.limited = res.data.data;
        });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    promotionAdv(id) {
      this.$router.push(`/dashboard/ad-promotion/${id}`);
    },
    createAdv() {
      this.$router.push("/dashboard/create-ad");
    },
    deleteAdvertisement() {
      this.$axios
        .delete("/deleteAdvertisement", {
          params: {
            advertisement_ids: this.checkedNames,
          },
        })
        .then((res) => {
          this.adsListUser();
          this.checkedNames = [];
        });
    },
    setHide(id) {
      if (id !== "") {
        this.checkedNames.push(id);
      }
      this.$axios
        .patch("/setHide", {
          advertisement_ids: this.checkedNames,
          is_hide: true,
        })
        .then((res) => {
          this.adsListUser();
          this.checkedNames = [];
        });
    },
    setShow(id) {
      if (id !== "") {
        this.checkedNames.push(id);
      }
      this.$axios
        .patch("/setHide", {
          advertisement_ids: this.checkedNames,
          is_hide: false,
        })
        .then((res) => {
          this.adsListUser();
          this.checkedNames = [];
        });
    },
    async setPublished() {
      try {
        await this.$axios
          .patch("/setPublished", {
            advertisement_ids: this.checkedNames,
            is_published: true,
          })
          .then((res) => {
            this.adsListUser();
            this.checkedNames = [];
          });
        this.allCheck.checked = false;
      } catch (e) {
        this.errorPublished = e.response.data;
      }
    },
    async setPublishedOne(id) {
      let ids = [];
      ids.push(id);
      try {
        await this.$axios
          .patch("/setPublished", {
            advertisement_ids: ids,
            is_published: true,
          })
          .then((res) => {
            this.adsListUser();
            this.checkedNames = [];
          });
      } catch (e) {
        this.errorPublished = e.response.data;
      }
    },
    setDeactivate() {
      this.$axios
        .patch("/setPublished", {
          advertisement_ids: this.checkedNames,
          is_published: false,
        })
        .then((res) => {
          this.adsListUser();
          this.checkedNames = [];
        });
      this.allCheck.checked = false;
    },
    setDeactivateOne(id) {
      let ids = [];
      ids.push(id);
      this.$axios
        .patch("/setPublished", {
          advertisement_ids: ids,
          is_published: false,
        })
        .then((res) => {
          this.adsListUser();
          this.checkedNames = [];
        });
    },
    activeAdv() {
      this.isPublishe = "1";
      this.adsList({
        params: {
          is_published: this.isPublishe,
          person_type: this.privatePerson,
          category_id: this.categoryId,
          search: this.searchData,
        },
      });
      this.activateAdv = true;
      this.inactivateAdv = false;
      this.allCheck.checked = false;
      this.checkedNames = [];
    },
    inactiveAdv() {
      this.isPublishe = "0";
      this.adsList({
        params: {
          is_published: this.isPublishe,
          person_type: this.privatePerson,
          category_id: this.categoryId,
          search: this.searchData,
        },
      });
      this.activateAdv = false;
      this.inactivateAdv = true;
      this.allCheck.checked = false;
      this.checkedNames = [];
    },
    searchAdv() {
      this.adsListUser({
        params: {
          is_published: this.isPublishe,
          person_type: this.privatePerson,
          category_id: this.categoryId,
          search: this.searchData,
        },
      });
    },
    goToAdv(advId) {
      this.$router.push(`/product/${advId}`);
    },
    openLimitedModal() {
      this.lImitedModal = true;
    },
    goToPageIncreaseLimit(key) {
      this.$router.push(`/dashboard/increase-limit/${key}`);
    },
    chekedAll() {
      this.allCheck = document.getElementById("all");
      if (this.allCheck.checked) {
        for (
          var i = 0;
          i < this.advListUser.advertisementList.data.length;
          i++
        ) {
          this.checkedNames.push(
            this.advListUser.advertisementList.data[i].advertisement_id
          );
        }
      } else this.checkedNames = [];
    },
    handleCopyLink(id) {
      const copyLink = `${window.location.protocol}//${window.location.host}/product/${id}`;
      let textarea = document.createElement("textarea");
      textarea.value = copyLink;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    },
  },
};
</script>

<style lang="scss" scoped>
.ads-dashboard {
  padding: 30px 0 30px 30px;
  width: 80%;

  &__title {
    font-size: $g-second-title-size;
    padding-bottom: 25px;
  }

  &__private {
    background: $buttonSecondColor;
    width: 50%;

    /deep/button {
      color: $mainThirdColor;
    }
  }

  .activePerformers {
    background: $buttonColor;
    /deep/button {
      color: $mainSecondColor;
    }
  }

  .activeAdvertisers {
    background: $buttonColor;
    /deep/button {
      color: $mainSecondColor;
    }
  }

  .activateAdv {
    background: #d4e3f6;
    padding: 0 15px;
    color: $mainThirdColor;
  }

  .inactivateAdv {
    background: #d4e3f6;
    padding: 0 15px;
    color: $mainThirdColor;
  }

  &__company {
    background: $buttonSecondColor;
    width: 50%;

    /deep/button {
      color: $mainThirdColor;
    }
  }

  &__boosts {
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-bottom: 10px;

    img {
      width: 24px !important;
      height: 24px !important;
      object-fit: cover;
      margin-right: 5px;
    }

    div {
      display: flex;
      align-items: center;
    }

    span {
      padding-left: 10px;
      color: #9E9E9E;
    }
  }

  &__button-group {
    display: flex;
    width: 100%;
    margin-bottom: 20px;

    /deep/.main-button {
      max-width: 100%;
    }
  }

  &__mkt-block {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    background: $mainSecondColor;
    padding: 0 20px 0 0;
    width: 100%;

    img {
      width: 190px;
      height: 160px;
    }
  }

  &__active,
  &__inactive {
    display: flex;
    align-items: center;
    color: $mainColor;
    padding: 0 15px;

    span {
      display: inline-block;
      margin-left: 8px;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .disableButton {
    background: $mainFourthColor;
    color: $mainFifthColor;

    &:hover {
      cursor: not-allowed;
      background: $mainFourthColor;
      color: $mainFifthColor;
    }

    /deep/button:hover {
      cursor: not-allowed;
    }
  }

  &__mkt-title {
    line-height: 16px;
    padding-bottom: 10px;
  }

  &__search-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    position: relative;
  }

  &__search {
    width: 265px;
    display: flex;
    justify-content: flex-end;
  }

  &__category-list-block {
    border: 1px solid #dadada;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 265px;
    padding: 11px 10px;
    margin-right: 7px;

    &:hover {
      cursor: pointer;
    }
  }

  &__mkt-category {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
    padding-bottom: 10px;
  }

  &__mkt-date {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
    padding-bottom: 10px;
  }

  &__mkt-nav {
    display: flex;
    align-items: center;
    font-size: $g-mobile-size;
    padding-bottom: 10px;
    div {
      margin-right: 15px;

      &:hover {
        cursor: pointer;
        color: $mainColor;
      }
    }
    a {
      margin-right: 15px;
      color: $mainThirdColor;
    }
  }

  &__mkt-nav_hide {
    display: flex;
    align-items: center;
  }

  &__question {
    padding-left: 5px;
    cursor: help;
  }

  &__question-mobile {
    display: none;
  }

  &__copy-link {
    border: 1px solid $mainColor;
    /deep/button {
      color: $mainColor;
    }
  }

  &__mkt-advertise {
    background: $mainColor;
    width: 146px;

    &:hover {
      @include hover-main-color;
    }

    &:active {
      @include active-main-color;
    }
  }

  &__mkt {
    display: flex;
  }

  &__mkt-main-block {
    padding: 15px 0;
    margin-left: 30px;
  }

  &__mkt-last-block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    padding: 15px 0;
  }

  &__price {
    font-weight: bold;
  }

  &__down-block {
    display: flex;

    div {
      display: flex;
      align-items: center;
      margin-right: 30px;

      svg {
        margin-right: 7px;
      }
    }
  }

  &__selection-block {
    display: flex;
    justify-content: space-between;

    label {
      input {
        margin-right: 10px;
      }
    }
  }

  &__mkt-hide {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__mkt-hide-block {
    position: relative;
  }

  &__selection-block-nav {
    display: flex;

    div {
      margin-right: 15px;
      color: $mainFifthColor;

      &:hover {
        cursor: pointer;
        color: $mainColor;
      }
    }
  }

  &__text {
    line-height: 16px;
  }

  &__button-create-adv {
    display: flex;
    justify-content: center;
    align-content: center;
    background: $buttonColor;
    color: $mainSecondColor;
    width: 264px;
    margin-top: 20px;
    padding: 14px 0;

    &:hover {
      @include hover-button;
    }

    &:active {
      @include active-button;
    }
  }

  &__section {
    display: flex;
    align-items: center;

    input {
      margin-right: 10px;
    }
  }

  &__category-section-list {
    position: absolute;
    top: 44px;
    padding: 10px;
    background: white;
    width: 264px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    z-index: 10;

    div {
      padding-bottom: 5px;
    }

    &:hover {
      cursor: pointer;
    }
  }

  &__search-button {
    background: $mainColor;
  }

  &__search-block {
    position: relative;

    input {
      height: 100%;
      padding-left: 30px;
      border: 1px solid $mainFourthColor;

      &:focus {
        outline: none !important;
      }
    }

    svg {
      position: absolute;
      left: 10px;
      top: 13px;
    }
  }

  &__limited {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background: #ffe8bb;
    opacity: 0.7;
    padding: 15px;
    margin-bottom: 20px;
  }

  &__limited-text {
    color: #a37e74;
  }

  &__detel {
    color: $mainColor;
    font-weight: 500;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  &__limited-title {
    font-size: $g-font-third-size;
    padding-bottom: 30px;
  }

  &__category-name-limit {
    font-weight: bold;
    width: 230px;
  }

  &__button-limit {
    background: $mainColor;
    width: 180px;

    &:hover {
      @include hover-main-color;
    }

    &:active {
      @include active-main-color;
    }
  }

  &__limit-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 750px;
    padding: 20px 0;
    border-bottom: 1px solid #dadada;

    div span {
      font-weight: bold;
      padding-left: 7px;
    }
  }

  &__checbox-wrap {
    display: flex;
  }
  .hideAdv {
    display: block;
  }
}

/* для элемента input c type="checkbox" */
.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

/* для элемента label, связанного с .custom-checkbox */
.custom-checkbox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
}

/* создание в label псевдоэлемента before со следующими стилями */
.custom-checkbox + label::before {
  content: "";
  display: inline-block;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  flex-grow: 0;
  background: #ffffff;
  border: 1px solid #b6b9c9;
  margin-right: 10px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;

  &:hover {
    cursor: pointer;
  }
}

/* стили для активного чекбокса (при нажатии на него) */
.custom-checkbox:not(:disabled):active + label::before {
  background-color: #b3d7ff;
  border-color: #b3d7ff;
}

/* стили для чекбокса, находящегося в состоянии checked */
.custom-checkbox:checked + label::before {
  background-image: url("@/assets/images/check.png");

  &:hover {
    cursor: pointer;
  }
}

.checkbox {
  display: flex;
  align-items: center;
}

/deep/.modal-container {
    overflow-x: auto;
    max-height: 100%;
}

@media (max-width: $break-xlg) {
  .ads-dashboard {
    width: 100%;
    padding: 25px 5px;

    &__category-list-block {
      width: 200px;
    }

    &__question {
      position: relative;
      &:hover {
        .ads-dashboard__question-mobile {
          position: absolute;
          display: block;
          background: #fff;
          bottom: 80%;
          width: 50vw;
          left: -35vw;
          color: black;
          padding: 10px;
          background: #D4E3F6;
        }
      }
    }

    &__search {
      max-width: 220px;
    }

    &__search-group {
      flex-wrap: wrap;
    }

    &__search-block {
      input {
        width: 160px;
      }
    }

    &__mkt-nav {
      flex-wrap: wrap;
      div {
        margin-bottom: 15px;
      }
    }

    &__price {
      text-align: right;
    }

    &__mkt-last-block {
      padding-left: 25px;
    }

    /deep/.modal-container {
      width: 80%;
      overflow-x: auto;
      max-height: 100%;
    }

    &__category-section-list {
      z-index: 1;
    }

    &__limit-group {
      width: auto;
    }

    &__category-name-limit {
      width: 100px;
    }

    &__button-limit {
      margin-left: 20px;
    }

    &__mkt-hide {
      height: 160px;
      top: 0;
      left: 0;
      width: 100%;
      transform: none;
    }

    /deep/.close-modal-btn {
      top: 10px !important;
      right: 10px !important;
    }
  }
}

@media (max-width: $break-sm) {
  .ads-dashboard {
    &__category-list-block {
      width: 100%;
      margin-bottom: 20px;
    }

    &__active,
    &__inactive {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      padding: 15px;
    }

    &__boosts {
      padding-bottom: 5px;
    }

    &__mkt-main-block {
      margin-left: 7px;
    }

    &__search {
      max-width: 100%;
      width: 100%;
    }

    &__search-block {
      width: 100%;
      input {
        width: 100%;
      }
    }

    &__selection-block {
      flex-direction: column;
    }

    &__selection-block-nav {
      justify-content: space-between;
      padding-top: 20px;
    }

    &__mkt-block {
      flex-direction: column;
      padding-right: 10px;

      img {
        width: 96px;
        height: 75px;
      }
    }

    &__mkt-nav {
      padding: 0 10px;
      justify-content: space-between;

      div {
        width: 50%;
        margin-right: 0;
      }
    }

    &__mkt-title {
      padding-bottom: 5px;
    }

    &__price {
      text-align: left;
      padding-bottom: 5px;
    }

    &__mkt-last-block {
      flex-direction: row;
      padding: 10px;
      align-items: center;
    }

    &__down-block {
      div {
        margin-right: 10px;
      }
    }

    &__mkt-last-block {
      flex-wrap: wrap;
    }

    &__limited-title {
      width: 80%;
      padding-bottom: 0;
    }

    &__limit-group {
      flex-wrap: wrap;
    }

    &__button-limit {
      margin-left: 0;
      margin-top: 10px;
    }

    &__mkt-hide {
      height: 75px;
    }

    /deep/.modal-container {
      width: 100%;
      padding: 10px;
    }
  }
}
</style>
