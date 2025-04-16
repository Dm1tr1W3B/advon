<template>
  <form
    @submit.prevent="getAdvertisementsByCategory"
    class="searching-results-section l-wrap"
  >
    <Search />
    <BreadCrumbs :lastItemName="this.$route.params.pathMatch.split('&')[0]" />
    <div
      class="searching-results-section__title"
      v-if="this.searchingData.advertisementList"
    >
      По запросу "{{ this.$route.params.pathMatch.split("&")[0] }}" найдено
      {{ this.searchingData.advertisementList.total }}
      обьявлений
    </div>
    <div class="searching-results-section__main-sort">
      <label for="allSearch" class="custom-radio">
        <input
          type="radio"
          name="All"
          value=""
          id="allSearch"
          v-model="formDataToSend.typeSearch"
        />
        <span> Все </span>
      </label>
      <label for="advertisement" class="custom-radio">
        <input
          type="radio"
          name="advertisement"
          value="advertisement"
          id="advertisement"
          v-model="formDataToSend.typeSearch"
        />
        <span> По объявлениям </span>
      </label>
      <label for="hashtags" class="custom-radio">
        <input
          type="radio"
          name="hashtags"
          value="hashtags"
          id="hashtags"
          v-model="formDataToSend.typeSearch"
        />
        <span> По хештегам </span>
      </label>
    </div>
    <div
      v-if="this.searchingData.categories"
      class="searching-results-section__child-category"
    >
      <div
        v-for="category in !this.allCategory
          ? this.searchingData.categories.slice(0, 9)
          : this.searchingData.categories"
        :key="category.id"
        @click="goToCategory(category.category_key)"
        class="searching-results-section__child-category_item"
      >
        {{ category.category_name }}
        <span class="searching-results-section__child-category-count">
          {{ category.count }}
        </span>
      </div>
      <div
        v-if="this.searchingData.categories.length > 9"
        class="searching-results-section__child-category_item"
      >
        <span
          @click="allCategory = !allCategory"
          v-if="!allCategory"
          class="searching-results-section__add-category"
        >
          Показать еще {{ this.searchingData.categories.length - 9 }} категорий
        </span>
        <span
          @click="allCategory = !allCategory"
          v-if="allCategory"
          class="searching-results-section__add-category"
        >
          Скрыть категории
        </span>
      </div>
    </div>
    <div class="searching-results-section__search-block">
      <div
        v-if="!$device.isDesktop"
        @click="openFilter"
        class="searching-results-section__filter-button"
      >
        <MainButton :isSearchStyleType="true">
          <FilterIcon class="searching-results-section__filter-icon" />
          <span>Фильтровать</span>
        </MainButton>
      </div>
      <div class="searching-results-section__block-sort" @click="openSort">
        <div class="searching-results-section__sort">
          {{ this.sortDefault }}
          <SelectArrow />
        </div>
        <div v-if="sortBody" class="searching-results-section__body-sorting">
          <div
            v-for="sort in this.sortParams"
            :key="sort.id"
            class="searching-results-section__body-sort"
            @click="sortingSend(sort.key, sort.title)"
            :id="sort.key"
          >
            <div>{{ sort.title }}</div>
          </div>
        </div>
      </div>
      <Sorting
        :sendSort="sortingSend"
        :goToListAdvs="openListAdvs"
        :goToGaleryAdvs="openGaleryAdvs"
        :class="{ isActive: activeGrid }"
      />
    </div>
    <div class="searching-results-section__body-wrap">
      <div
        class="searching-results-section__body"
        v-if="this.searchingData.advertisementList"
      >
        <div
          v-if="$device.isDesktop ? true : triggerFilter"
          class="searching-results-section__filter"
        >
          <CloseFilter
            v-if="!$device.isDesktop"
            @click="closeFilter"
            class="searching-results-section__filter-close"
          />
          <div class="searching-results-section__field-title-first">Цена</div>
          <div class="searching-results-section__inputs-range">
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
            <div class="searching-results-section__field-title">
              Тип объявления
            </div>
            <div class="searching-results-section__filter-person">
              <label for="all" class="custom-radio">
                <input
                  type="radio"
                  value=""
                  id="all"
                  v-model="formDataToSend.person_type"
                />
                <span> Все </span>
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
                <span> Частные </span>
              </label>
              <label for="company" class="create-ad-form__radio custom-radio">
                <input
                  type="radio"
                  value="company"
                  id="company"
                  v-model="formDataToSend.person_type"
                />
                <span> Компании </span>
              </label>
            </div>
          </div>
          <div class="searching-results-section__field-title">Оплата</div>
          <div
            v-for="period in periodicityArray"
            :key="period.id"
            class="searching-results-section__field-checkbox"
          >
            <InputCheckbox
              :set-value="dataCheckbox.period"
              :id="period.id"
              :label="period.name"
              @click.native="checkPayment"
            />
          </div>
          <div class="searching-results-section__field-title">
            Охват аудитории, чел.
          </div>
          <div class="searching-results-section__inputs-range">
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
          <div class="searching-results-section__field-title">Ширина, см</div>
          <div class="searching-results-section__inputs-range">
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
          <div class="searching-results-section__field-title">Длина, см</div>
          <div class="searching-results-section__inputs-range">
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
          <div class="searching-results-section__field-title">
            Количество, шт
          </div>
          <div class="searching-results-section__inputs-range">
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
              searching-results-section__field-checkbox
              searching-results-section__field-checkbox-bottom
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

          <div class="searching-results-section__body-right-section">
            <div v-if="this.banners">
              <div v-for="banner in this.banners" :key="banner.id">
                <a :href="banner.url">
                  <img
                    :src="banner.file.download_link"
                    :alt="banner.alt"
                    :title="banner.alt"
                    class="searching-results-section__banner-img"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="searching-results-section__cards"
        v-if="this.openGaleryTemplate && this.searchingData.advertisementList"
      >
        <TokenNotProvided
          class="searching-results-section__token-error"
          :error-comment="errorAddtoFavorite"
        />
        <div
          class="searching-results-section__small-card"
          v-for="allAdv in this.searchingData.advertisementList.data"
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
        class="
          searching-results-section__cards
          searching-results-section__small-card-vertical
        "
        v-if="this.openListTemplate"
      >
        <TokenNotProvided
          class="searching-results-section__token-error"
          :error-comment="errorAddtoFavorite"
        />
        <div
          class="searching-results-section__card-vertical"
          v-for="allAdv in this.searchingData.advertisementList.data"
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
import Sorting from "@/components/molecules/Sorting.vue";
import { DEFAULT_RESULTS_PER_PAGE } from "@/constants/pagination";
import Search from "@/components/molecules/Search.vue";
import SmallCardHorizontal from "@/components/molecules/SmallCardHorizontal.vue";
import CloseFilter from "@/assets/images/icons/close-modal.svg?inline";
import FilterIcon from "@/assets/images/icons/filter.svg?inline";
import MainButton from "@/components/atoms/buttons/MainButton.vue";
import SelectArrow from "@/assets/images/arrow/select-arrow.svg?inline";
import TokenNotProvided from "@/components/errors/TokenNotProvided";

export default {
  name: "SearchingResultsSection",
  data() {
    return {
      triggerFilter: false,
      allCategory: false,
      searchingData: {},
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
        typeSearch: "",
      },
      banners: "",
      maxPage: null,
      errorAddtoFavorite: null,
      page: 1,
      resultsPerPage: DEFAULT_RESULTS_PER_PAGE,
      sortBody: false,
      sortDefault: "Сортировка",
      orderParam: "",
      openGaleryTemplate: true,
      openListTemplate: false,
      activeGrid: false,
      gridBody: true,
      limitCategoryShow: true,
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
      sortDefault: "Сортировка",
    };
  },
  components: {
    SmallCard,
    SmallCardHorizontal,
    InputText,
    InputCheckbox,
    BreadCrumbs,
    Pagination,
    Search,
    Sorting,
    MainButton,
    FilterIcon,
    CloseFilter,
    SelectArrow,
    TokenNotProvided,
  },
  watch: {
    formDataToSend: {
      deep: true,
      immediate: true,
      handler() {
        this.page = 1;
        this.$router.push({
          path: `/searching-results/${this.$route.params.pathMatch}`,
          query: { page: 1 },
        });
        setTimeout(
          function () {
            this.getAdvertisementsBySearch();
          }.bind(this),
          1000
        );
      },
    },
    page: {
      handler() {
        this.getAdvertisementsBySearch();
      },
    },
  },
  created() {
    this.getPages();
  },
  mounted() {
    // this.handleSetBreadCrambs();
  },
  methods: {
    async getAdvertisementsBySearch() {
      const { formDataToSend } = this;
      let locationParam = "";
      let locationCity = "";
      let searchParam = this.$route.params.pathMatch.split("&")[0];
      let categoryParam = this.$route.params.pathMatch.split("category=")[1];
      let locationPartParam = this.$route.params.pathMatch.split("city=")[0];
      let locationPartParamCity =
        this.$route.params.pathMatch.split("&category=")[0];
      locationCity = locationPartParamCity.split("city=")[1];
      if (locationCity === "") {
        locationParam = locationPartParam.split("&location=")[1];
      }
      let queryPage = null;
      if (this.$route.query.page) {
        queryPage = +this.$route.query.page;
      }
      try {
        await this.$axios
          .get("/getAdvertisementsBySearch", {
            params: {
              order: this.orderParam,
              search: searchParam,
              category_key: categoryParam,
              city_code: locationCity,
              country_code: locationParam,
              page: queryPage || this.page,
              number_items_page: this.resultsPerPage,
              person_type: formDataToSend.person_type,
              search_type: formDataToSend.typeSearch,
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
            this.searchingData = res.data.data;
            this.maxPage = this.searchingData.advertisementList.last_page;
            this.page = this.categoryData.advertisementList.current_page;
          });
      } catch (e) {
        this.error = e.response;
      }
    },
    async addAdvertisementFavorite(id) {
      try {
        await this.$axios.post("/addAdvertisementFavorite", {
          advertisement_id: id,
        });
        this.getAdvertisementsBySearch();
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
        this.getAdvertisementsBySearch();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getPages() {
      try {
        await this.$axios.get("/getPages").then((res) => {
          this.pageBanner = res.data.data;
        });
        for (let i = 0; i < this.pageBanner.length; i++) {
          this.pageId = this.pageBanner[3];
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
    handlePageChange(page) {
      let searchData = this.$route.params.pathMatch;
      this.page = page;
      this.$router.push({
        path: `/searching-results/${searchData}`,
        query: { page: page },
      });
      window.scrollTo(0, 0);
      setTimeout(() => {
        this.getAdvertisementsBySearch();
      }, 0);
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
    sortingSend(key, name) {
      this.orderParam = key;
      this.getAdvertisementsBySearch({
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
    openGaleryAdvs() {
      if (this.openGaleryTemplate === false) {
        this.openGaleryTemplate = true;
        this.openListTemplate = false;
        this.gridBody = true;
        this.activeGrid = false;
      } else {
        this.openGaleryTemplate = true;
        this.openListTemplate = false;
        this.gridBody = true;
        this.activeGrid = false;
      }
    },
    openListAdvs() {
      if (this.openListTemplate === false) {
        this.openGaleryTemplate = false;
        this.openListTemplate = true;
        this.gridBody = true;
        this.activeGrid = false;
      } else {
        this.openGaleryTemplate = false;
        this.openListTemplate = true;
        this.gridBody = true;
        this.activeGrid = false;
      }
    },
    goToCategory(key) {
      this.$router.push(`/category/${"category-" + key}`);
    },
    // handleSetBreadCrambs() {
    //   localStorage.setItem("BreadCrumbsTitle", this.$route.params.pathMatch.split('&')[0]);
    //   localStorage.setItem(
    //     "BreadCrumbsLink",
    //     `/searching-result/${this.$route.params.pathMatch}`
    //   );
    // },
  },
};
</script>

<style lang="scss" scoped>
.searching-results-section {
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

  &__token-error {
    position: absolute;
    width: 476px;
    z-index: 2;
    background: white;
  }

  &__body {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 25%;
  }

  &__filter {
    padding-right: 20px;
  }

  &__cards {
    width: 75%;
    display: flex;
    flex-wrap: wrap;
  }

  &__small-card {
    width: 33%;
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

  &__body-wrap {
    display: flex;
    padding-top: 30px;
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

  &__main-sort {
    margin-bottom: 30px;
    label {
      margin-right: 30px;
    }
  }

  &__card-vertical {
    width: 100%;
  }

  &__search-section {
    display: flex;
    justify-content: flex-end;
    align-items: center;
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

  &__search-block {
    display: flex;
    justify-content: flex-end;
  }

  /deep/.sorting__display-map {
    display: none;
  }
}

@media (max-width: $break-xlg) {
  .searching-results-section {
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
  .searching-results-section {
    padding: 20px 7px;

    .bread-crumbs {
      padding: 18px 0 0;
    }

    &__child-category {
      padding: 0;
      flex-wrap: wrap;
    }

    &__child-category {
      margin-top: 10px;

      div {
        padding-right: 17px;
        padding-bottom: 13px;
        width: auto;
        span {
          padding: 0;
        }
      }
    }

    &__sort-wrap {
      flex-wrap: wrap;
    }

    .sorting {
      width: 100%;
      justify-content: flex-end;

      /deep/.sorting__display {
        margin: 0;
      }

      /deep/.sorting__display:first-child {
        padding-right: 10px;
      }
    }

    &__body {
      display: none;
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

    &__main-sort {
      margin-bottom: 0;

      /deep/.custom-radio {
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }

    /deep/.small-card {
      width: 95%;
      height: auto;
    }
    /deep/.small-card__image-conatiner {
      height: 110px;
      margin: 0;
    }
    /deep/.small-card__image {
      object-fit: contain;
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
