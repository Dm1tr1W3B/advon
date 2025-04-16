<template>
  <form
    @submit.prevent="getAdvertisementsByCategory"
    class="category-sections l-wrap"
  >
    <Search />
    <BreadCrumbs
      v-if="this.categoryData.category && !triggerSubCategory"
      :lastItemName="this.categoryData.category.category_name"
    />
    <BreadCrumbs
      v-if="this.categoryData.category && triggerSubCategory"
      :secondItemName="this.categoryData.category.category_name"
      :secondItemLink="`/category/${this.categoryData.category.category_key}`"
      :lastItemName="getSubCategoryName"
    />
    <div class="category-sections__title" v-if="this.categoryData.category">
      <div v-if="this.categoryChildNew === ''">
        {{ this.categoryData.category.category_name }}
        {{ this.categoryData.category.count }}
      </div>
      <div v-if="this.categoryChildNew !== ''">
        <div
          v-for="category in this.categoryData.childCategories"
          :key="category.id"
        >
          <div v-if="category.count > 0">
            {{ category.child_category_name }}
            {{ category.count }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="this.categoryData.childCategories && this.categoryChildNew === ''"
      class="category-sections__child-category"
    >
      <div
        v-for="category in !this.allCategory
          ? this.categoryData.childCategories.slice(0, 9)
          : this.categoryData.childCategories"
        :key="category.id"
        @click="goToChildCategory(category.child_category_key)"
        class="category-sections__child-category_item"
      >
        <div v-if="category.count > 0">
          <span>
            {{ category.child_category_name }}
            <span class="category-sections__child-category-count">
              {{ category.count }}
            </span>
          </span>
        </div>
      </div>
      <div
        v-if="this.categoryData.childCategories.length > 9"
        class="category-sections__child-category_item"
      >
        <span
          @click="allCategory = !allCategory"
          v-if="!allCategory"
          class="category-sections__add-category"
        >
          Показать еще
          {{ this.categoryData.childCategories.length - 9 }} категорий
        </span>
        <span
          @click="allCategory = !allCategory"
          v-if="allCategory"
          class="category-sections__add-category"
        >
          Скрыть категории
        </span>
      </div>
    </div>
    <div class="category-sections__sort-wrap">
      <div
        v-if="!$device.isDesktop"
        @click="openFilter"
        class="category-sections__filter-button"
      >
        <MainButton :isSearchStyleType="true">
          <FilterIcon class="category-sectin__filter-icon" />
          <span>Фильтровать</span>
        </MainButton>
      </div>
      <div class="category-sections__block-sort" @click="openSort">
        <div class="category-sections__sort">
          {{ this.sortDefault }}
          <SelectArrow />
        </div>
        <div v-if="sortBody" class="category-sections__body-sorting">
          <div
            v-for="sort in this.sortParams"
            :key="sort.id"
            class="category-sections__body-sort"
            @click="sortingSend(sort.key, sort.title)"
            :id="sort.key"
          >
            <div>{{ sort.title }}</div>
          </div>
        </div>
      </div>
      <Sorting
        :goToMapAdvs="openMapAdvs"
        :goToListAdvs="openListAdvs"
        :goToGaleryAdvs="openGaleryAdvs"
        :class="{ isActive: activeGrid }"
      />
    </div>
    <div
      class="category-sections__body"
      v-if="this.categoryData.advertisementList && this.gridBody"
    >
      <div
        v-if="$device.isDesktop ? true : triggerFilter"
        class="category-sections__filter"
      >
        <CloseFilter
          v-if="!$device.isDesktop"
          @click="closeFilter"
          class="category-sections__filter-close"
        />
        <div class="category-sections__field-title-first">Цена</div>
        <div class="category-sections__inputs-range">
          <InputText
            :set-value="formDataToSend"
            :id="'price_from'"
            :label="'price_from'"
            :type="'number'"
            :placeholder="'От'"
          />
          <InputText
            :set-value="formDataToSend"
            :id="'price_to'"
            :label="'price_to'"
            :type="'number'"
            :placeholder="'До'"
          />
        </div>
        <div>
          <div class="category-sections__field-title">Тип объявления</div>
          <div class="category-sections__filter-person">
            <label for="all" class="custom-radio">
              <input
                type="radio"
                value=""
                id="all"
                v-model="formDataToSend.person_type"
              />
              <span>Все</span>
            </label>
            <label
              for="private_person"
              class="create-ad-form__radio custom-radio"
            >
              <input
                type="radio"
                value="private_person"
                id="private_person"
                v-model="formDataToSend.person_type"
              />
              <span>Частные</span>
            </label>
            <label for="company" class="create-ad-form__radio custom-radio">
              <input
                type="radio"
                value="company"
                id="company"
                v-model="formDataToSend.person_type"
              />
              <span>Компании</span>
            </label>
          </div>
        </div>
        <div class="category-sections__field-title">Оплата</div>
        <div
          v-for="period in periodicityArray"
          :key="period.id"
          class="category-sections__field-checkbox"
        >
          <InputCheckbox
            :set-value="dataCheckbox.period"
            :id="period.id"
            :label="period.name"
            @click.native="checkPayment"
          />
        </div>
        <div class="category-sections__field-title">Охват аудитории, чел.</div>
        <div class="category-sections__inputs-range">
          <InputText
            :set-value="formDataToSend"
            :id="'reach_audience_from'"
            :type="'number'"
            :placeholder="'От'"
          />
          <InputText
            :set-value="formDataToSend"
            :id="'reach_audience_to'"
            :type="'number'"
            :placeholder="'До'"
          />
        </div>
        <div class="category-sections__field-title">Ширина, см</div>
        <div class="category-sections__inputs-range">
          <InputText
            :set-value="formDataToSend"
            :id="'width_from'"
            :type="'number'"
            :placeholder="'От'"
          />
          <InputText
            :set-value="formDataToSend"
            :id="'width_to'"
            :type="'number'"
            :placeholder="'До'"
          />
        </div>
        <div class="category-sections__field-title">Длина, см</div>
        <div class="category-sections__inputs-range">
          <InputText
            :set-value="formDataToSend"
            :id="'length_from'"
            :type="'number'"
            :placeholder="'От'"
          />
          <InputText
            :set-value="formDataToSend"
            :id="'length_to'"
            :type="'number'"
            :placeholder="'До'"
          />
        </div>
        <div class="category-sections__field-title">Количество, шт</div>
        <div class="category-sections__inputs-range">
          <InputText
            :set-value="formDataToSend"
            :id="'amount_from'"
            :type="'number'"
            :placeholder="'От'"
          />
          <InputText
            :set-value="formDataToSend"
            :id="'amount_to'"
            :type="'number'"
            :placeholder="'До'"
          />
        </div>
        <div
          class="
            category-sections__field-checkbox
            category-sections__field-checkbox-bottom
          "
        >
          <InputCheckbox
            :set-value="formDataToSend"
            :id="'travel_abroad'"
            :label="'Выезд за границу'"
          />
          <InputCheckbox
            :set-value="formDataToSend"
            :id="'photo_report'"
            :label="'Предоставления фотоотчета'"
          />
          <InputCheckbox
            :set-value="formDataToSend"
            :id="'make_and_place_advertising'"
            :label="'Сами изготовим и разместим рекламу'"
          />
        </div>

        <div class="category-sections__body-right-section">
          <div v-if="this.banners">
            <div v-for="banner in this.banners" :key="banner.id">
              <a :href="banner.url">
                <img
                  :src="banner.file.download_link"
                  :alt="banner.alt"
                  :title="banner.alt"
                  class="category-sections__banner-img"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="category-sections__cards" v-if="this.openGaleryTemplate">
        <TokenNotProvided
          class="category-sections__token-error"
          :error-comment="errorAddtoFavorite"
        />
        <div
          class="category-sections__small-card"
          v-for="allAdv in this.categoryData.advertisementList.data"
          :key="allAdv.id"
        >
          <SmallCard
            :ads-data="allAdv"
            :add-advertisement-favorite="addAdvertisementFavorite"
            :delete-advertisements-favorite="deleteAdvertisementsFavorite"
          />
        </div>
      </div>
      <div
        class="category-sections__cards category-sections__small-card-vertical"
        v-if="this.openListTemplate"
      >
        <TokenNotProvided
          class="category-sections__token-error"
          :error-comment="errorAddtoFavorite"
        />
        <div
          class="category-sections__card-vertical"
          v-for="allAdv in this.categoryData.advertisementList.data"
          :key="allAdv.id"
        >
          <SmallCardHorizontal
            :ads-data="allAdv"
            :add-advertisement-favorite="addAdvertisementFavorite"
            :delete-advertisements-favorite="deleteAdvertisementsFavorite"
          />
        </div>
      </div>
    </div>
    <template v-if="this.openMapTemplate">
      <div class="category-sections__map-wrap">
        <div class="category-sections__map-wrap-left">
          <div
            class="
              category-sections__small-card
              category-sections__small-card-map-left
            "
            v-for="allAdv in this.categoryData.advertisementList.data"
            :key="allAdv.id"
          >
            <div
              :class="[
                'category-sections__map-section-advs',
                allAdv.is_allocate ? 'allocate' : '',
              ]"
              @click="goToAdv(allAdv.advertisement_id)"
            >
              <div class="category-sections__map-section-advs-image-container">
                <img :src="allAdv.image" alt="allAdv" />
                <div
                  class="category-sections__top"
                  v-if="allAdv.is_top_country"
                >
                  Топ
                </div>
                <div class="category-sections__urgent" v-if="allAdv.is_urgent">
                  Срочно
                </div>
              </div>
              <div class="category-sections__map-section-advs-body">
                <div class="category-sections__map-section-advs-title">
                  {{ allAdv.title }}
                </div>
                <div class="category-sections__map-section-advs-price">
                  {{ allAdv.price }}
                  <span class="category-sections__price-simbol">
                    {{ allAdv.translation_currency_code }}
                    <span v-if="allAdv.payment">/</span>
                    {{ allAdv.payment }}
                  </span>
                </div>
                <div class="category-sections__map-section-advs-caregory">
                  {{ allAdv.category_name }}
                </div>
                <div class="category-sections__map-section-advs-location">
                  <Location />
                  {{ allAdv.city }}
                </div>
              </div>
            </div>
            <div class="category-sections__add-to-favorites">
              <div
                @click="addAdvertisementFavorite(allAdv.advertisement_id)"
                v-if="!allAdv.is_favorite"
              >
                <div class="category-sections__star-wrap">
                  <Star :class="{ isFavorite: allAdv.is_favorite }" />
                </div>
              </div>
              <div
                @click="deleteAdvertisementsFavorite(allAdv.advertisement_id)"
                v-if="allAdv.is_favorite"
              >
                <div class="category-sections__star-wrap">
                  <Star :class="{ isFavorite: allAdv.is_favorite }" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="category-sections__map-container">
          <GmapMap
            ref="mymap"
            :center="startLocation"
            :zoom="14"
            style="width: 100%; height: 100%"
          >
            <GmapInfoWindow
              :options="infoOptions"
              :position="infoPosition"
              :opened="infoOpened"
              @closeclick="infoOpened = false"
            >
              <NuxtLink :to="`/product/${infoContentId}`">
                <div>
                  <img :src="infoContentImg" alt="" />
                  <div class="category-sections__gmap-content">
                    <div class="category-sections__gmap-content-title">
                      {{ infoContent }}
                    </div>
                    <div class="category-sections__gmap-content-price">
                      {{ infoContentPrice }}
                      {{ infoContentPriceCode }}
                    </div>
                    <div class="category-sections__gmap-content-category">
                      {{ infoContentCategory }}
                    </div>
                    <div class="category-sections__gmap-content-geo">
                      <Location />
                      {{ infoContentCity }}
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </GmapInfoWindow>

            <GmapMarker
              v-for="(item, key) in this.categoryData.advertisementList.data"
              :key="key"
              :position="getPosition(item)"
              :clickable="true"
              @click="toggleInfo(item, key)"
            />
          </GmapMap>
        </div>
      </div>
    </template>
    <Pagination
      v-if="maxPage > 1"
      :max-page="maxPage"
      :page="page"
      :handle-page-change="handlePageChange"
    />
  </form>
</template>

<script>
import SmallCard from "@/components/molecules/SmallCard.vue";
import SmallCardHorizontal from "@/components/molecules/SmallCardHorizontal.vue";
import InputText from "@/components/atoms/inputs/InputText.vue";
import InputCheckbox from "@/components/atoms/inputs/InputCheckboxMain.vue";
import BreadCrumbs from "@/components/molecules/BreadCrumbs.vue";
import Pagination from "@/components/molecules/Pagination.vue";
import { DEFAULT_RESULTS_PER_PAGE } from "@/constants/pagination";
import Sorting from "@/components/molecules/Sorting.vue";
import Search from "@/components/molecules/Search.vue";
import Location from "@/assets/images/icons/location.svg?inline";
import SelectArrow from "@/assets/images/arrow/select-arrow.svg?inline";
import CloseFilter from "@/assets/images/icons/close-modal.svg?inline";
import FilterIcon from "@/assets/images/icons/filter.svg?inline";
import MainButton from "@/components/atoms/buttons/MainButton.vue";
import TokenNotProvided from "@/components/errors/TokenNotProvided";
import Star from "@/assets/images/icons/star.svg?inline";

export default {
  name: "CategorySections",
  data() {
    return {
      categoryData: {},
      triggerLoad: false,
      allCategory: false,
      activeGrid: false,
      openMapTemplate: false,
      openGaleryTemplate: true,
      openListTemplate: false,
      payment: [],
      dataCheckbox: {
        period: {
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
        },
      },
      triggerFilter: false,
      formDataToSend: {
        person_type: "",
        child_category_key: "",
        price_from: "",
        price_to: "",
        amount_from: "",
        amount_to: "",
        length_from: "",
        length_to: "",
        period: [],
        width_from: "",
        width_to: "",
        reach_audience_from: "",
        reach_audience_to: "",
        travel_abroad: "",
        ready_for_political_advertising: "",
        photo_report: "",
        make_and_place_advertising: "",
      },
      errorAddtoFavorite: null,
      banners: "",
      maxPage: null,
      page: 1,
      resultsPerPage: DEFAULT_RESULTS_PER_PAGE,
      orderParam: "",
      gridBody: true,
      typeUser: "",
      periodicityArray: [
        {
          id: "1",
          name: "в день",
        },
        {
          id: "2",
          name: "в неделю",
        },
        {
          id: "3",
          name: "в месяц",
        },
        {
          id: "4",
          name: "в год",
        },
        {
          id: "5",
          name: "на 20 лет",
        },
        {
          id: "6",
          name: "навсегда",
        },
      ],
      sortParams: [
        {
          title: "Сначала популярные",
          key: "popular_asc",
        },
        {
          title: "Сначала дешевые",
          key: "price_asc",
        },
        {
          title: "Сначала дорогие",
          key: "price_desc",
        },
      ],
      sortBody: false,
      sortDefault: "Сортировка",
      startLocation: {
        lat: 0,
        lng: 0,
      },
      infoPosition: null,
      infoContent: null,
      infoContentImg: null,
      infoContentPrice: null,
      infoContentPriceCode: null,
      infoContentCategory: null,
      infoContentCity: null,
      infoOpened: false,
      infoCurrentKey: null,
      infoContentId: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      categoryChildNew: "",
    };
  },
  components: {
    SmallCard,
    SmallCardHorizontal,
    InputText,
    InputCheckbox,
    BreadCrumbs,
    Pagination,
    Sorting,
    Search,
    Location,
    SelectArrow,
    MainButton,
    FilterIcon,
    CloseFilter,
    TokenNotProvided,
    Star,
  },
  computed: {
    categoryWithoutZero() {
      return this.items.filter((item) => this.visible.includes(item));
    },
    triggerSubCategory() {
      return this.$route.params.pathMatch.includes('child-category');
    },
    getSubCategoryName() {
      if (this.triggerSubCategory) {
        let name = '';
        const id = this.$route.params.pathMatch.split('child-category-')[1];
        name = this.categoryData.childCategories.find(x => x.child_category_key === id).child_category_name;
        return name
      }
      return ""
    }
  },
  watch: {
    formDataToSend: {
      deep: true,
      immediate: true,
      handler() {
        if (this.triggerLoad) {
          this.page = 1;
          this.$router.push({
            path: `/category/${this.$route.params.pathMatch}`,
            query: { page: 1, user: this.typeUser },
          });
          setTimeout(
            function () {
              this.getAdvertisementsByCategory();
            }.bind(this),
            1000
          );
        } else {
          this.triggerLoad = true;
        }
      },
      page: {
        handler() {
          this.getAdvertisementsByCategory();
        },
      },
    },
  },
  mounted() {
    this.typeUser = JSON.parse(localStorage.getItem("user-key"));
    this.getPages();
    this.getAdvertisementsByCategory();
  },
  // async fetch() {
  //   this.categoryData = await this.$http
  //     .$get(
  //       `https://api.advon.test.ut.in.ua/api/v1/getAdvertisementsByCategory?${
  //         "category_key" + "=" + this.$route.params.pathMatch
  //       }${
  //         "advertisement_type" + "=" + this.$route.query.user
  //       }`
  //     )
  //     .then((res) => res.data);
  // },
  methods: {
    async getAdvertisementsByCategory() {
      const { formDataToSend } = this;
      let categoryChildKey = "";
      let categoryKey = "";
      let queryPage = null;
      if (this.$route.query.page) {
        queryPage = +this.$route.query.page;
      }
      if (
        this.$route.params.pathMatch.indexOf("child-category-") == 0 ||
        this.$route.params.pathMatch.indexOf("category-") == 0
      ) {
        let categoryChild = this.$route.params.pathMatch.replace(
          /child-category-/g,
          ""
        );
        this.categoryChildNew = categoryChild.replace(/category-/g, "");
        categoryChildKey = this.categoryChildNew.replace(/^[\s\S]*\//g, "", "");
        let category = this.$route.params.pathMatch.replace(
          /\/child-category-[\s\S]*/g,
          "",
          ""
        );
        categoryKey = category.replace(/category-/g, "");
      } else categoryKey = this.$route.params.pathMatch;
      let typeUser = this.$route.query.user;
      try {
        await this.$axios
          .get("/getAdvertisementsByCategory", {
            params: {
              advertisement_type: typeUser,
              order: this.orderParam,
              page: queryPage || this.page,
              category_key: categoryKey,
              child_category_key: categoryChildKey,
              number_items_page: this.resultsPerPage,
              person_type: formDataToSend.person_type,
              payment_ids: formDataToSend.period,
              price_from: formDataToSend.price_from,
              price_to: formDataToSend.price_to,
              amount_from: formDataToSend.amount_from,
              amount_to: formDataToSend.amount_to,
              length_from: formDataToSend.length_from,
              length_to: formDataToSend.length_to,
              width_from: formDataToSend.width_from,
              width_to: formDataToSend.width_to,
              reach_audience_from: formDataToSend.reach_audience_from,
              reach_audience_to: formDataToSend.reach_audience_to,
              travel_abroad: formDataToSend.travel_abroad,
              photo_report: formDataToSend.photo_report,
              make_and_place_advertising:
                formDataToSend.make_and_place_advertising,
            },
          })
          .then((res) => {
            this.categoryData = res.data.data;
            this.maxPage = this.categoryData.advertisementList.last_page;
            this.page = this.categoryData.advertisementList.current_page;
            this.handleSetBreadCrambs();
          });
      } catch (e) {
        this.error = e.response;
      }
    },
    async getPages() {
      try {
        await this.$axios.get("/getPages").then((res) => {
          this.pageBanner = res.data.data;
        });
        for (let i = 0; i < this.pageBanner.length; i++) {
          this.pageId = this.pageBanner[2];
        }
        this.pageIdNew = this.pageId.id;
        this.getBanners();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getBanners() {
      try {
        await this.$axios
          .get("/getBanners", {
            params: {
              page_id: this.pageIdNew,
            },
          })
          .then((res) => {
            this.banners = res.data.data;
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async addAdvertisementFavorite(id) {
      try {
        await this.$axios.post("/addAdvertisementFavorite", {
          advertisement_id: id,
        });
        this.getAdvertisementsByCategory();
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
        this.getAdvertisementsByCategory();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    handlePageChange(page) {
      this.page = page;
      this.$router.push({
        path: `/category/${this.$route.params.pathMatch}`,
        query: { page: page },
      });
      window.scrollTo(0, 0);
      setTimeout(() => {
        this.getAdvertisementsByCategory();
      }, 0);
    },
    sortingSend(key, name) {
      this.orderParam = key;
      this.getAdvertisementsByCategory({
        params: {
          order: this.orderParam,
        },
      });
      this.sortDefault = name;
    },
    openFilter() {
      this.triggerFilter = true;
    },
    closeFilter() {
      this.triggerFilter = false;
    },
    openMapAdvs() {
      if (this.openMapTemplate === false) {
        this.openMapTemplate = true;
        this.gridBody = false;
        this.activeGrid = true;
        this.openGaleryTemplate = false;
        this.openListTemplate = false;
      } else {
        this.openMapTemplate = true;
        this.gridBody = false;
        this.activeGrid = false;
        this.openGaleryTemplate = false;
        this.openListTemplate = false;
      }
    },
    openGaleryAdvs() {
      if (this.openGaleryTemplate === false) {
        this.openMapTemplate = false;
        this.openMapTemplate = false;
        this.openGaleryTemplate = true;
        this.openListTemplate = false;
        this.gridBody = true;
        this.activeGrid = false;
      } else {
        this.openMapTemplate = false;
        this.openMapTemplate = false;
        this.openGaleryTemplate = true;
        this.openListTemplate = false;
        this.gridBody = true;
        this.activeGrid = false;
      }
    },
    openListAdvs() {
      if (this.openListTemplate === false) {
        this.openMapTemplate = false;
        this.openMapTemplate = false;
        this.openGaleryTemplate = false;
        this.openListTemplate = true;
        this.gridBody = true;
        this.activeGrid = false;
      } else {
        this.openMapTemplate = false;
        this.openMapTemplate = false;
        this.openGaleryTemplate = false;
        this.openListTemplate = true;
        this.gridBody = true;
        this.activeGrid = false;
      }
    },
    checkPayment() {
      const period = Object.keys(this.dataCheckbox.period);
      const periodArray = [];
      for (let i = 0; i < period.length; i++) {
        if (this.dataCheckbox.period[i + 1] != false) {
          periodArray.push(i + 1);
        }
      }
      if (periodArray.length) {
        this.formDataToSend.period = periodArray;
      } else {
        this.formDataToSend.period = [];
      }
    },
    openSort() {
      if (this.sortBody === false) {
        this.sortBody = true;
      } else this.sortBody = false;
    },
    goToChildCategory(key) {
      this.$router.push(
        `/category/${"category-" + this.$route.params.pathMatch}/${
          "child-category-" + key
        }`
      );
    },
    goToAdv(advId) {
      this.$router.push(`/product/${advId}`);
    },
    getPosition: function (marker) {
      this.startLocation.lat = +marker.latitude;
      this.startLocation.lng = +marker.longitude;
      return {
        lat: parseFloat(marker.latitude),
        lng: parseFloat(marker.longitude),
      };
    },
    handleSetBreadCrambs() {
      localStorage.setItem(
        "BreadCrumbsTitle",
        this.categoryData.category.category_name
      );
      localStorage.setItem(
        "BreadCrumbsLink",
        `/category/${this.$route.params.pathMatch}`
      );
    },
    toggleInfo: function (marker, key) {
      this.infoPosition = this.getPosition(marker);
      this.infoContent = marker.title;
      this.infoContentImg = marker.image;
      this.infoContentPrice = marker.price;
      this.infoContentPriceCode = marker.translation_currency_code;
      this.infoContentCategory = marker.category_name;
      this.infoContentCity = marker.city;
      this.infoContentId = marker.advertisement_id;
      if (this.infoCurrentKey == key) {
        this.infoOpened = !this.infoOpened;
      } else {
        this.infoOpened = true;
        this.infoCurrentKey = key;
      }
    },
    async addAdvertisementFavorite(id) {
      try {
        await this.$axios.post("/addAdvertisementFavorite", {
          advertisement_id: id,
        });
        this.getAdvertisementsByCategory();
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
        this.getAdvertisementsByCategory();
      } catch (e) {
        this.error = e.response.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.category-sections {
  &__title {
    font-size: $g-second-title-size;
    padding: 10px 0 20px 0;
  }

  &__add-category {
    color: $mainColor;
  }

  &__token-error {
    position: absolute;
    width: 486px;
    z-index: 2;
    background: white;
  }

  &__child-category {
    display: flex;
    padding-bottom: 25px;

    span {
      display: inline-block;
      padding-right: 30px;

      &:hover {
        cursor: pointer;
        color: $mainColor;
      }
    }
  }

  .allocate {
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    border-image: linear-gradient(91.41deg, #2575ed 0%, #50b987 100%);
    border-image-slice: 1;
  }

  &__body {
    display: flex;
    flex-wrap: wrap;
    padding-top: 30px;
  }

  &__filter {
    width: 25%;
    padding-right: 20px;
  }

  &__cards {
    width: 75%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    height: 100%;
  }

  &__small-card {
    width: 33%;
    position: relative;
  }

  &__inputs-range {
    display: flex;

    /deep/.text-default-input {
      margin-right: 10px;
    }
  }

  &__filter-person {
    display: flex;
    flex-direction: column;

    label {
      padding-bottom: 10px;
    }
  }

  &__field-title {
    padding: 20px 0 10px 0;
  }

  &__field-title-first {
    padding-bottom: 10px;
  }

  &__field-checkbox-bottom {
    padding-top: 25px;
  }

  &__field-checkbox {
    div {
      padding-bottom: 10px;
    }
  }

  &__field-title-checkbox {
    padding: 15px 0 0 0;
  }

  &__inputs-range {
    margin-bottom: 5px;
  }

  &__child-category-count {
    color: $mainFifthColor;
  }

  &__body-right-section {
    margin: 25px 0 100px 0;
  }

  &__banner-img {
    width: 100%;
    height: 100%;
  }

  &__small-card-map-left {
    width: 100%;
  }

  &__map-section-advs {
    background: $mainSecondColor;
    margin-bottom: 10px;
    height: 140px;
    display: flex;
    align-items: center;

    img {
      max-height: 140px;
      max-width: 175px;
    }

    &:hover {
      cursor: pointer;
      box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.15);
    }
  }

  &__map-section-advs-body {
    padding: 10px;
    width: 43%;
  }

  &__map-wrap {
    display: flex;
    margin-top: 30px;
  }

  &__map-wrap-left {
    width: 30%;
    margin-right: 20px;
    padding-right: 5px;
    max-height: 755px;
    overflow-y: scroll;
  }

  &__map-section-advs-title {
    font-size: 13px;
    line-height: 15px;
    padding-bottom: 10px;
    height: 48px;
    overflow: hidden;
  }

  &__map-section-advs-price {
    font-weight: bold;
    padding-bottom: 10px;
  }

  &__map-section-advs-caregory {
    font-size: $g-mobile-size;
    color: $mainFifthColor;
    padding-bottom: 10px;
  }

  &__top {
    position: absolute;
    top: 15px;
    left: 0;
    background: linear-gradient(91.41deg, #2575ed 0%, #50b987 100%);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    font-weight: bold;
    color: $mainSecondColor;
    padding: 5px 23px;
  }
  &__urgent {
    position: absolute;
    top: 15px;
    left: 0;
    background: #50b987;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    font-weight: bold;
    color: $mainSecondColor;
    padding: 5px 23px;
  }

  &__map-section-advs-location {
    font-size: $g-mobile-size;
    color: $mainFifthColor;
    display: flex;
    align-items: center;

    svg {
      margin-right: 7px;
      position: relative;
      bottom: 2px;
    }
  }

  &__sort-wrap {
    display: flex;
    justify-content: flex-end;
  }

  &__map-section-advs-image-container {
    width: 57%;
    height: 100%;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .isActive {
    /deep/path {
      fill: $mainColor;
    }
  }

  &__card-vertical {
    width: 100%;
  }

  &__block-sort {
    background: $mainSecondColor;
    border: 1px solid $mainFourthColor;
    width: 264px;
    padding: 10px;
    margin-right: 10px;
    position: relative;

    &:hover {
      cursor: pointer;
    }
  }

  &__sort {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__body-sorting {
    position: absolute;
    left: 0;
    z-index: 2;
    top: 37px;
  }

  &__map-container {
    width: 70%;
    height: 740px;
  }

  &__body-sort {
    width: 264px;
    background: $mainSecondColor;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    z-index: 2;
    top: 47px;
    left: 0;
    div {
      padding: 10px;
      &:hover {
        cursor: pointer;
      }
    }
  }

  &__star-wrap {
    background: $mainSecondColor;
    position: absolute;
    bottom: 10px;
    right: 10px;
    border-radius: 100%;
    padding: 8px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      cursor: pointer;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    }
  }

  &__price-simbol {
    font-size: $g-font-base-size;
    padding-right: 5px;
  }

  .isFavorite {
    path {
      fill: $mainColor;
      stroke: $mainColor;
    }
  }

  /deep/.small-card-horizontal__image-conatiner {
    margin: 0;
  }
  /deep/.gm-style-iw-d div {
    display: flex;
  }
  /deep/.gm-style-iw-c {
    &:hover {
      box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
    }
  }
  /deep/.category-sections__gmap-content {
    display: flex;
    flex-direction: column;
    padding: 10px 30px 5px 0;
  }
  /deep/.category-sections__gmap-content-title {
    font-size: $g-mobile-size;
    padding-bottom: 10px;
    color: $mainThirdColor;
  }
  /deep/.gm-style-iw-d img {
    width: 140px;
    height: 110px;
    padding-right: 10px;
    object-fit: cover !important;
  }
  /deep/.gm-style .gm-style-iw-c {
    padding: 0 !important;
    border-radius: 0 !important;
  }
  /deep/.gm-style-iw-d {
    overflow: hidden !important;
  }
  /deep/.category-sections__gmap-content-price {
    font-weight: bold;
    font-size: $g-mobile-size;
    padding-bottom: 10px;
    color: $mainThirdColor;
  }
  /deep/.category-sections__gmap-content-category {
    color: $mainFifthColor;
    font-size: 11px;
    padding-bottom: 10px;
  }
  /deep/.category-sections__gmap-content-geo {
    color: $mainFifthColor;
    font-size: 11px;
    align-items: flex-end;

    svg {
      margin-right: 5px;
    }
  }
}

@media (max-width: $break-xlg) {
  .category-sections {
    padding: 0 5px;

    &__filter-button {
      background: $mainColor;

      /deep/button {
        padding: 0 10px;
        height: 44px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 200px;
        span {
          padding-left: 10px;
        }
      }
    }

    &__child-category {
      padding: 0;
      flex-wrap: wrap;

      div {
        width: auto;
      }
    }

    &__map-wrap {
      flex-direction: column;
    }

    &__map-wrap-left {
      width: 100%;
      max-height: none;
      overflow-y: auto;
      order: 1;
      margin: 40px 0 0;
    }

    &__map-container {
      width: 100%;
      height: 710px;
    }

    &__sort-wrap {
      padding-top: 10px;
      justify-content: space-between;
    }

    &__filter {
      position: fixed;
      inset: 0;
      z-index: 30;
      background: #fff;
      width: 100%;
      padding: 26px 20px;
      overflow-x: auto;
    }

    &__cards {
      width: 100%;
    }

    &__filter-close {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    &__body-right-section {
      width: 70%;
    }

    &__block-sort {
      display: flex;
      align-items: center;
      width: 171px;
    }

    &__sort {
      width: 100%;
    }

    &__body-sort {
      width: 169px;
    }

    &__small-card {
      margin-bottom: 10px;
    }

    &__map-section-advs-image-container {
      width: 171px;

      img {
        width: 100%;
        object-fit: contain;
      }
    }

    &__map-section-advs-title {
      height: auto;
      padding-bottom: 10px;
      height: 47px;
      overflow: hidden;
    }

    .pagination {
      padding: 30px 0 50px;
    }
    /deep/.small-card__image-conatiner {
      margin: 0;
      max-width: none;
    }

    /deep/.small-card__image {
      object-fit: cover;
    }
  }
}

@media (max-width: $break-sm) {
  .category-sections {
    padding: 20px 7px;

    .bread-crumbs {
      padding: 18px 0 0;
    }

    &__child-category_item {
      padding-right: 17px;
      padding-bottom: 13px;
      span {
        padding: 0;
      }
    }

    &__sort-wrap {
      flex-wrap: wrap;
    }

    .sorting {
      width: 100%;
      justify-content: space-between;
      padding-top: 18px;

      /deep/.sorting__display {
        margin: 0;
      }
    }

    &__filter-button {
      span {
        display: none;
      }
      /deep/button {
        width: 44px;
      }
    }

    &__block-sort {
      display: flex;
      align-items: center;
      margin: 0;
    }

    &__sort {
      width: 100%;
    }

    &__small-card {
      width: 50%;
    }

    &__map-wrap-left {
      margin-top: 5px;
    }

    &__small-card-map-left {
      width: 100%;
    }

    &__map-section-advs-image-container {
      width: 96px;
    }

    &__map-container {
      height: 320px;
    }

    /deep/.small-card {
      width: 95%;
      height: auto;
    }
    /deep/.small-card__image-conatiner {
      height: 110px;
      margin: 0;
    }
    /deep/.small-card__title {
      height: auto;
      margin: 0;
    }
    /deep/.small-card__characteristics-container {
      min-height: auto;
    }
  }
}
</style>
