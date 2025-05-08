<template>
  <form
    @submit.prevent="getAdvertisementsByLocation"
    class="category-sections"
  >
    <Search />
    <BreadCrumbs
      v-if="renderBreadCrumbs"
      :lastItemName="this.$route.params.pathMatch === 'world'
      ? 'Мир' : this.$route.params.pathMatch.includes('country-')
      ? countryName : this.$route.params.pathMatch.includes('city-') ? cityName : '' "
    />
    <div
      class="category-sections__title home__section-title"
      v-if="this.locationData.advertisementList"
    >
      Обьявление по
      <span v-if="this.$route.params.pathMatch === 'world'">Миру</span>
      <span
        v-if="
          this.$route.params.pathMatch ===
          'country-' + this.countryCode
        "
        ><span class="category-sections__sub-title">стране </span
        >{{ this.countryName }}</span
      >
      <span v-if="this.$route.params.pathMatch === 'city-' + this.cityCode"
        ><span class="category-sections__sub-title">городу </span>
        {{ this.cityName }}</span
      >
      {{ this.locationData.advertisementList.total }}
    </div>
    <div
      v-if="this.locationData.categories"
      class="category-sections__child-category"
    >
      <div
        v-for="category in !this.allCategory
          ? this.locationData.categories.slice(0, 9)
          : this.locationData.categories"
        :key="category.id"
        @click="goToCategory(category.category_key)"
      >
        {{ category.category_name }}
        <span class="category-sections__child-category-count">
          {{ category.count }}
        </span>
      </div>
      <div
        v-if="this.locationData.categories.length > 9"
        class="category-sections__child-category_item"
      >
        <span
          @click="allCategory = !allCategory"
          v-if="!allCategory"
          class="category-sections__add-category"
        >
          Показать еще {{ this.locationData.categories.length - 9 }} категорий
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
        class="category-sections__child-category_item"
      />
    </div>
    <div
      class="category-sections__body new_world"
      v-if="this.locationData.advertisementList && this.gridBody"
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
            <label for="all">
              <input
                type="radio"
                value=""
                id="all"
                v-model="formDataToSend.person_type"
              />
              Все
            </label>
            <label for="private_person" class="create-ad-form__radio">
              <input
                type="radio"
                value="private_person"
                id="private_person"
                v-model="formDataToSend.person_type"
              />
              Частные
            </label>
            <label for="company" class="create-ad-form__radio">
              <input
                type="radio"
                value="company"
                id="company"
                v-model="formDataToSend.person_type"
              />
              Компании
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
        <div
          class="category-sections__small-card"
          v-for="allAdv in this.locationData.advertisementList.data"
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
        <div
          class="category-sections__card-vertical"
          v-for="allAdv in this.locationData.advertisementList.data"
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
            v-for="allAdv in this.locationData.advertisementList.data"
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
              v-for="(item, key) in this.locationData.advertisementList.data"
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
import InputText from "@/components/atoms/inputs/InputText.vue";
import InputCheckbox from "@/components/atoms/inputs/InputCheckboxMain.vue";
import BreadCrumbs from "@/components/molecules/BreadCrumbs.vue";
import Pagination from "@/components/molecules/Pagination.vue";
import { DEFAULT_RESULTS_PER_PAGE } from "@/constants/pagination";
import Search from "@/components/molecules/Search.vue";
import Sorting from "@/components/molecules/Sorting.vue";
import Location from "@/assets/images/icons/location.svg?inline";
import SmallCardHorizontal from "@/components/molecules/SmallCardHorizontal.vue";
import SelectArrow from "@/assets/images/arrow/select-arrow.svg?inline";
import CloseFilter from "@/assets/images/icons/close-modal.svg?inline";
import FilterIcon from "@/assets/images/icons/filter.svg?inline";
import MainButton from "@/components/atoms/buttons/MainButton.vue";
import Star from "@/assets/images/icons/star.svg?inline";

export default {
  name: "CategorySections",
  data() {
    return {
      renderBreadCrumbs: false,
      locationData: {},
      triggerFilter: false,
      triggerLoad: false,
      allCategory: false,
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
      formDataToSend: {
        person_type: "",
        advertisement_type: "",
        child_category_key: "",
        payment: "",
        period: [],
        price_from: "",
        price_to: "",
        amount_from: "",
        amount_to: "",
        length_from: "",
        length_to: "",
        width_from: "",
        width_to: "",
        reach_audience_from: "",
        reach_audience_to: "",
        travel_abroad: "",
        ready_for_political_advertising: "",
        photo_report: "",
        make_and_place_advertising: "",
      },
      banners: "",
      maxPage: null,
      page: 1,
      resultsPerPage: DEFAULT_RESULTS_PER_PAGE,
      activeGrid: false,
      openMapTemplate: false,
      openGaleryTemplate: true,
      openListTemplate: false,
      gridBody: true,
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
      typeUser: "performer",
      cityCode: "",
      cityName: "",
      countryCode: "",
      countryName: "",
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
    };
  },
  components: {
    SmallCard,
    InputText,
    InputCheckbox,
    BreadCrumbs,
    Pagination,
    Search,
    Sorting,
    Location,
    SmallCardHorizontal,
    SelectArrow,
    MainButton,
    FilterIcon,
    CloseFilter,
    Star,
  },
  watch: {
    formDataToSend: {
      deep: true,
      immediate: true,
      handler() {
        this.page = 1;
        this.$router.push({
          path: `/location/${this.$route.params.pathMatch}`,
          query: { page: 1, user: this.$route.query.user },
        });
        setTimeout(
          function () {
            this.getAdvertisementsByLocation();
          }.bind(this),
          1000
        );
      },
    },
    page: {
      handler() {
        this.getAdvertisementsByLocation();
      },
    },
  },
  mounted() {
    this.typeUser = JSON.parse(localStorage.getItem("user-key"));
    this.cityCode = JSON.parse(localStorage.getItem("localCityCode"));
    this.cityName = JSON.parse(localStorage.getItem("localCityName"));
    this.countryCode = JSON.parse(localStorage.getItem("localCountryCode"));
    this.countryName = JSON.parse(localStorage.getItem("localCountryName"));
    this.renderBreadCrumbs = true;
    this.handleSetBreadCrambs();
    this.getPages();
  },
  async fetch() {
    let data;
    if (this.$route.params.pathMatch.indexOf("country-") == 0) {
      data = [
        this.$axios.get("/getAdvertisementsByLocation", {
          params: {
            country_code: this.$route.params.pathMatch.replace(/country-/g, ""),
            advertisement_type: this.$route.query.user,
          },
        }),
      ];
    } else if (this.$route.params.pathMatch.indexOf("city-") == 0) {
      data = [
        this.$axios.get("/getAdvertisementsByLocation", {
          params: {
            city_code: this.$route.params.pathMatch.replace(/city-/g, ""),
            advertisement_type: this.$route.query.user,
          },
        }),
      ];
    } else {
      data = [this.$axios.get("/getAdvertisementsByLocation")];
    }
    const [locationData] = await Promise.all(data);
    this.locationData = locationData.data.data;
  },
  methods: {
    async getAdvertisementsByLocation() {
      let country = "";
      let city = "";
      let queryPage = null;
      if (this.$route.query.page) {
        queryPage = +this.$route.query.page;
      }
      if (this.$route.params.pathMatch.indexOf("country-") == 0) {
        country = this.$route.params.pathMatch.replace(/country-/g, "");
      }
      if (this.$route.params.pathMatch.indexOf("city-") == 0) {
        city = this.$route.params.pathMatch.replace(/city-/g, "");
      }
      if (this.$route.params.pathMatch === "performer-world") {
        this.typeUser = "performer";
      }
      if (this.$route.params.pathMatch === "employer-world") {
        this.typeUser = "employer";
      }
      const { formDataToSend } = this;
      try {
        await this.$axios
          .get("/getAdvertisementsByLocation", {
            params: {
              advertisement_type: this.$route.query.user || this.typeUser,
              page: queryPage || this.page,
              order: this.orderParam,
              country_code: country,
              city_code: city,
              number_items_page: this.resultsPerPage,
              category_key: this.$route.params.pathMatch,
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
            this.locationData = res.data.data;
            this.maxPage = this.locationData.advertisementList.last_page;
            this.page = this.categoryData.advertisementList.current_page;
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
          this.pageId = this.pageBanner[4];
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
        this.getAdvertisementsByLocation();
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
        this.getAdvertisementsByLocation();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    handlePageChange(page) {
      let locationData = this.$route.params.pathMatch;
      this.page = page;
      this.$router.push({
        path: `/location/${locationData}`,
        query: { page: page, user: this.$route.query.user },
      });
      window.scrollTo(0, 0);
      setTimeout(() => {
        this.getAdvertisementsByLocation();
      }, 0);
    },
    sortingSend(key, name) {
      this.orderParam = key;
      this.getAdvertisementsByLocation({
        params: {
          order: this.orderParam,
        },
      });
      this.sortDefault = name;
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
    goToCategory(key) {
      this.$router.push(`/category/${"category-" + key}`);
    },
    handleSetBreadCrambs() {
      localStorage.setItem("BreadCrumbsTitle",
        this.$route.params.pathMatch === 'world'
        ? 'Мир' : this.$route.params.pathMatch.includes('country-')
        ? this.countryName : this.$route.params.pathMatch.includes('city-') ? this.cityName : ''
      );
      localStorage.setItem(
        "BreadCrumbsLink",
        `/location/${this.$route.params.pathMatch}`
      );
      console.log(this.$route.params.pathMatch)
    },
    async addAdvertisementFavorite(id) {
      try {
        await this.$axios.post("/addAdvertisementFavorite", {
          advertisement_id: id,
        });
        this.getAdvertisementsByLocation();
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
        this.getAdvertisementsByLocation();
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

    span {
      color: $mainColor;
    }
  }

  &__add-category {
    color: $mainColor;
  }

  &__child-category {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 25px;

    div {
      padding-right: 30px;
      width: 20%;
      padding-bottom: 15px;

      &:hover {
        cursor: pointer;
        color: $mainColor;
      }
    }
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
    height: 100%;
  }

  &__small-card {
    width: 33%;
    position: relative;
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

  &__small-card-map-left {
    width: 100%;
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
    height: 47px;
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

  &__map-container {
    width: 70%;
    height: 740px;
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

  .isActive {
    /deep/path {
      fill: $mainColor;
    }
  }

  &__sub-title {
    color: $mainThirdColor !important;
  }

  &__card-vertical {
    width: 100%;
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
    min-width: 120px;
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

  &__sort-wrap {
    display: flex;
    justify-content: flex-end;
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
  .allocate {
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    border-image: linear-gradient(91.41deg, #2575ed 0%, #50b987 100%);
    border-image-slice: 1;
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
      width: 171px;
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

    &__child-category {
      padding: 0;
      flex-wrap: wrap;
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
