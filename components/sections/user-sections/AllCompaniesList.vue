<template>
  <div class="all-companies-list container">
    <BreadCrumbs
        lastItemName="Компании"
    />
    <Search />
    <div class="all-companies-list__title home__section-title">Все компании в городе {{ this.cityName }}</div>
    <div class="all-companies-list__companys-nav_container">
      <Sorting
        :goToMapAdvs="openMapAdvs"
        :goToListAdvs="openListAdvs"
        :class="{ isActive: activeGrid }"
      />
    </div>
    <div class="all-companies-list__body-wrap" v-if="this.openListTemplate">
      <div class="all-companies-list__body-left-section">
        <div
          v-for="company in this.allCompanies.data"
          :key="company.id"
          :class="[
            'all-companies-list__body',
            company.is_allocate ? 'allocate' : '',
          ]"
        >
          <div class="all-companies-list__top" v-if="company.is_top">Топ</div>
          <div
            class="all-companies-list__body-right"
            @click="companyDetail(company.company_id)"
          >
            <div>
              <img
                :src="company.company_logo"
                alt=""
                class="all-companies-list__company-logo"
              />
              <div class="all-companies-list__company-name-block">
                <div class="all-companies-list__company-name">
                  <Verification v-if="company.company_is_verification" />
                  {{ company.company_name }}
                </div>
                <div v-if="!$device.isMobile">

                </div>
                <div
                    v-if="!$device.isMobile"
                    class="all-companies-list__company-location"
                >
                  <div>
                  <Location />
                  {{ company.city }}
                  </div>
                  <div>
                    {{ company.advertisement_count }}
                    объявлений от компании
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="all-companies-list__company-contact-wrap">
            <button class="to_wishlist"><StarWishlist />В избранное</button>
            <button class="all_companies_contacts">Контакты</button>
            <button class="to_ads">К обявлениям</button>
<!--            <div-->
<!--              v-if="$device.isMobile"-->
<!--              class="all-companies-list__company-contact-left"-->
<!--            >-->
<!--              <div>-->
<!--                {{ company.advertisement_count }}-->
<!--                объявлений-->
<!--              </div>-->
<!--              <div class="all-companies-list__company-location">-->
<!--                <Location />-->
<!--                {{ company.city }}-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="all-companies-list__company-contact-right">-->
<!--              <div>-->
<!--                {{ company.company_phone }}-->
<!--              </div>-->
<!--              &lt;!&ndash; <div v-for="contact in company_contacts" :key="contact.id">-->
<!--                {{ contact }}-->
<!--              </div> &ndash;&gt;-->
<!--            </div>-->
          </div>
        </div>
      </div>
<!--      <div class="all-companies-list__body-right-section">-->
<!--        <div v-if="this.banners">-->
<!--          <div v-for="banner in this.banners" :key="banner.id">-->
<!--            <a :href="banner.url">-->
<!--              <img-->
<!--                :src="banner.file.download_link"-->
<!--                :alt="banner.alt"-->
<!--                :title="banner.alt"-->
<!--                class="all-companies-list__banner-img"-->
<!--              />-->
<!--            </a>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <template v-if="this.openMapTemplate">
      <div class="all-companies-list__map-wrap">
        <div class="all-companies-list__map-wrap-left">
          <div
            class="
              all-companies-list__small-card
              all-companies-list__small-card-map-left
            "
            v-for="company in this.allCompanies.data"
            :key="company.id"
          >
            <div
              :class="[
                'all-companies-list__map-section-advs',
                company.is_allocate ? 'allocate' : '',
              ]"
              @click="companyDetail(company.company_id)"
            >
              <div class="all-companies-list__map-section-advs-image-container">
                <img :src="company.company_logo" alt="company" />
              </div>
              <div class="all-companies-list__map-section-advs-body">
                <div class="all-companies-list__map-section-advs-title">
                  {{ company.company_name }}
                </div>
                <div
                  v-if="!$device.isMobile"
                  class="all-companies-list__map-section-advs-price"
                >
                  Компания
                </div>
                <div
                  v-if="!$device.isMobile"
                  class="all-companies-list__map-section-advs-caregory"
                >
                  {{ company.advertisement_count }} объявлений от компании
                </div>
                <div
                  v-if="!$device.isMobile"
                  class="all-companies-list__map-section-advs-location"
                >
                  <Location />
                  {{ company.city }}
                </div>
              </div>
              <div
                v-if="!$device.isDesktop"
                class="all-companies-list__company-contact-wrap"
              >
                <div
                  v-if="$device.isMobile"
                  class="all-companies-list__company-contact-left"
                >
                  <div class="all-companies-list__map-section-advs-price">
                    Компания
                  </div>
                  <div>
                    {{ company.advertisement_count }}
                    объявлений от компании
                  </div>
                  <div class="all-companies-list__company-location">
                    <Location />
                    {{ company.city }}
                  </div>
                </div>
                <div class="all-companies-list__company-contact-right">
                  <div>
                    {{ company.company_phone }}
                  </div>
                  <!-- <div v-for="contact in company_contacts" :key="contact.id">
                    {{ contact }}
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <GmapMap
            :center="{
              lat: +'56.015282',
              lng: +'92.89325',
            }"
            :zoom="5"
            style="width: 780px; height: 755px"
          >
            <GmapMarker
              v-for="mapAdv in this.allCompanies.data"
              :key="mapAdv.id"
              :position="{
                lat: +mapAdv.latitude,
                lng: +mapAdv.longitude,
              }"
            />
          </GmapMap>
        </div>
      </div>
    </template>
    <Pagination
      v-if="maxPage > 1"
      :max-page="maxPage"
      :page="+page"
      :handle-page-change="handlePageChange"
    />
  </div>
</template>

<script>
import Location from "@/assets/images/icons/Map_Point.svg?inline";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import SearchSvg from "@/assets/images/icons/search.svg?inline";
import Search from "@/components/molecules/Search.vue";
import Pagination from "@/components/molecules/Pagination.vue";
import { DEFAULT_RESULTS_PER_PAGE } from "@/constants/pagination";
import Sorting from "@/components/molecules/Sorting.vue";
import Verification from "@/assets/images/verification.svg?inline";
import StarWishlist from "@/assets/images/icons/StarWishlist.svg?inline";
import BreadCrumbs from "@/components/molecules/BreadCrumbs.vue";

export default {
  name: "AllCompaniesList",
  data() {
    return {
      performer: true,
      employer: false,
      userType: "performer",
      searchData: "",
      allCompanies: {},
      activeCompanyAll: true,
      activeCompanyCountry: false,
      activeCompanyCity: false,
      countryCode: "",
      cityCode: "",
      banners: {},
      maxPage: null,
      page: 1,
      resultsPerPage: DEFAULT_RESULTS_PER_PAGE,
      activeGrid: false,
      openMapTemplate: false,
      openListTemplate: true,
      cityName: "Днепр",
      countryName: "Украина",
    };
  },
  components: {
    Location,
    DefaultButton,
    SearchSvg,
    Search,
    Pagination,
    Sorting,
    Verification,
    StarWishlist,
    BreadCrumbs,
  },
  watch: {
    formDataToSend: {
      deep: true,
      immediate: true,
      handler() {
        this.page = 1;
        setTimeout(
          function () {
            this.getCompanyListForGuest();
          }.bind(this),
          1000
        );
      },
      page: {
        handler() {
          this.getCompanyListForGuest();
        },
      },
    },
  },
  mounted() {
    if (JSON.parse(localStorage.getItem("localCityCode")) != null) {
      this.cityCode = JSON.parse(localStorage.getItem("localCityCode"));
    }
    if (JSON.parse(localStorage.getItem("localCityName")) != null) {
      this.cityName = JSON.parse(localStorage.getItem("localCityName"));
    }
    if (JSON.parse(localStorage.getItem("localCountryCode")) != null) {
      this.countryCode = JSON.parse(localStorage.getItem("localCountryCode"));
    }
    if (JSON.parse(localStorage.getItem("localCountryName")) != null) {
      this.countryName = JSON.parse(localStorage.getItem("localCountryName"));
    }
    this.getCompany();
    this.getPages();
  },
  methods: {
    async getCompanyListForGuest() {
      try {
        await this.$axios
          .get("/getCompanyListForGuest", {
            params: {
              page: this.page,
              advertisement_type: this.userType,
              search: this.searchData,
              country_code: this.countryCode,
              city_code: this.cityCode,
            },
          })
          .then((res) => {
            this.allCompanies = res.data.data;
            this.maxPage = this.allCompanies.last_page;
          });
      } catch (e) {
        this.error = e.response;
      }
    },
    performerActive() {
      this.userType = "performer";
      this.page = 1;
      this.getCompanyListForGuest({
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
      this.getCompanyListForGuest({
        params: {
          page: this.page,
          advertisement_type: this.userType,
          search: this.searchData,
        },
      });
      this.performer = false;
      this.employer = true;
    },
    searchFavorites() {
      this.page = "1";
      this.getCompanyListForGuest({
        params: {
          advertisement_type: this.userType,
          search: this.searchData,
          page: this.page,
        },
      });
    },
    getCompanyCountry() {
      this.cityCode = "";
      this.countryCode = "RU";
      this.getCompanyListForGuest({
        params: {
          country_code: this.countryCode,
          city_code: this.cityCode,
        },
      });
      this.activeCompanyCity = false;
      this.activeCompanyCountry = true;
      this.activeCompanyAll = false;
    },
    getCompany() {
      this.countryCode = "";
      this.cityCode = "";
      this.getCompanyListForGuest({
        params: {
          country_code: this.countryCode,
          city_code: this.cityCode,
        },
      });
      this.activeCompanyCity = false;
      this.activeCompanyCountry = false;
      this.activeCompanyAll = true;
    },
    getCompanyCity() {
      this.countryCode = "";
      this.cityCode = this.cityCode = JSON.parse(
        localStorage.getItem("localCityCode")
      );
      this.getCompanyListForGuest({
        params: {
          country_code: this.countryCode,
          city_code: this.cityCode,
        },
      });
      this.activeCompanyCity = true;
      this.activeCompanyCountry = false;
      this.activeCompanyAll = false;
    },
    async getPages() {
      try {
        await this.$axios.get("/getPages").then((res) => {
          this.pageBanner = res.data.data;
        });
        for (let i = 0; i < this.pageBanner.length; i++) {
          this.pageId = this.pageBanner[1];
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
    companyDetail(companyId) {
      this.$router.push(`/company-detail/${companyId}`);
    },
    handlePageChange(page) {
      this.page = page;
      this.$router.push({
        path: `/all-companies?${("page", page)}`,
      });
      this.getCompanyListForGuest({
        params: {
          page: this.page,
        },
      });
    },
    openListAdvs() {
      if (this.openListTemplate === false) {
        this.openMapTemplate = false;
        this.openMapTemplate = false;
        this.openListTemplate = true;
        this.gridBody = true;
        this.activeGrid = false;
      } else {
        this.openMapTemplate = false;
        this.openMapTemplate = false;
        this.openListTemplate = true;
        this.gridBody = true;
        this.activeGrid = false;
      }
    },
    openMapAdvs() {
      if (this.openMapTemplate === false) {
        this.openMapTemplate = true;
        this.gridBody = false;
        this.activeGrid = false;
        this.openListTemplate = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.all-companies-list {
  min-height: 80vh;
  &__title {
    font-size: $g-second-title-size;
    margin: 15px 0;
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

  &__body {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $mainSecondColor;
    padding: 30px 50px 30px 20px;
    margin-bottom: 20px;

    &.allocate {
      border-width: 2px;
      border-style: solid;
      border-color: transparent;
      border-image: linear-gradient(91.41deg, #2575ed 0%, #50b987 100%);
      border-image-slice: 1;
    }
  }

  &__body-left-section {
    width: 68%;
  }

  &__body-right-section {
    width: 32%;
    margin-left: 30px;
  }

  &__body-right {
    display: flex;
    align-items: center;

    &:hover {
      cursor: pointer;
    }
  }

  &__company-name-block {
    color: $mainFifthColor;
    font-size: $g-mobile-size;

    div {
      padding-bottom: 10px;
    }
  }

  &__company-logo {
    margin-right: 30px;
    width: 146px;
    height: 60px;
  }

  &__company-name {
    display: flex;
    align-items: center;
    color: $mainThirdColor;
    font-size: $g-font-base-size;

    svg {
      margin-right: 10px;
    }
  }

  &__company-location {
    display: flex;
    align-items: center;

    svg {
      margin-right: 5px;
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

  &__search {
    width: 265px;
    display: flex;
    justify-content: flex-end;
    max-height: 44px;
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
  &__search-button {
    background: $mainColor;
  }

  &__nav-block-top {
    display: flex;
    justify-content: space-between;
  }

  &__companys-nav-block {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }

  &__companys-nav {
    display: flex;
    margin-bottom: 10px;
  }

  &__companys-nav-item {
    display: flex;
    align-items: center;
    margin-right: 30px;
    color: $mainColor;
    padding: 15px 20px;

    &:hover {
      cursor: pointer;
    }
  }

  .activeCompany {
    background: #d4e3f6;
    color: $mainThirdColor;
  }

  &__body-wrap {
    display: flex;
    padding-top: 30px;
  }

  &__banner-img {
    width: 362px;
    height: 362px;
  }

  &__map-section-advs {
    background: $mainSecondColor;
    margin-bottom: 10px;
    height: 140px;
    display: flex;
    align-items: center;

    &.allocate {
      border-width: 2px;
      border-style: solid;
      border-color: transparent;
      border-image: linear-gradient(91.41deg, #2575ed 0%, #50b987 100%);
      border-image-slice: 1;
    }

    &:hover {
      cursor: pointer;
      box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
    }

    img {
      max-height: 140px;
      max-width: 175px;
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

  /deep/.sorting__display-galery {
    display: none;
  }
}

@media (max-width: $break-xlg) {
  .all-companies-list {
    padding: 0 5px;

    &__body-wrap {
      flex-direction: column;
    }

    &__body-left-section {
      width: 100%;
    }

    &__body-right-section {
      width: 100%;
      margin: 0;
    }

    &__companys-nav-item {
      margin-right: 0;
      padding: 15px 10px;
    }

    &__companys-nav_container {
      display: flex;
      flex-wrap: wrap;
    }

    &__body {
      margin-bottom: 10px;
    }

    &__map-wrap {
      flex-direction: column;
    }

    &__map-wrap-left {
      width: 100%;
      max-height: none;
      margin-top: 30px;
      order: 1;
      overflow-y: auto;
    }

    /deep/.sorting {
      margin-left: auto;
    }

    /deep/.vue-map-container {
      width: 100% !important;
      height: 600px !important;
    }
  }
}

@media (max-width: $break-sm) {
  .all-companies-list {
    padding: 0 7px;

    &__title {
      margin-top: 50px;
    }

    &__nav-block-top {
      flex-direction: column;
    }

    &__performer {
      width: 50%;
    }

    &__employer {
      width: 50%;
      text-align: center;
    }

    &__search {
      width: 100%;
      margin-bottom: 18px;
    }

    &__search-block {
      flex-grow: 1;

      input {
        width: 100%;
      }
    }

    &__companys-nav {
      overflow-x: auto;
      width: 100%;

      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }

    &__companys-nav-item {
      white-space: nowrap;
    }

    &__body {
      flex-direction: column;
      padding: 10px;
    }

    &__body {
      align-items: flex-start;
    }

    &__company-logo {
      margin-right: 8px;
    }

    &__company-contact-wrap {
      padding-top: 18px;
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    &__company-contact-left,
    &__company-contact-right {
      width: 49%;
    }

    &__company-location {
      padding: 5px 0;
    }

    &__body-right {
      align-items: flex-start;
    }

    &__map-section-advs {
      flex-wrap: wrap;
      height: auto;
      align-items: flex-start;
      padding: 10px;
    }

    &__map-section-advs-body {
      padding: 0 0 0 8px;
    }

    /deep/.sorting {
      margin: 0;
    }

    /deep/.sorting__display {
      &:first-child {
        margin-left: 0;
      }
    }

    /deep/.vue-map-container {
      height: 320px !important;
    }
  }
}
</style>
