<template>
  <div
    class="home"
    v-if="
      this.mainAds.carousel_city &&
      this.mainAds.carousel_country &&
      this.mainAds.carousel_performer &&
      this.mainAds.carousel_employer &&
      this.mainTopAdvs &&
      this.popularHashtags &&
      this.mainCategory
    "
  >
    <!-- <div class="home__ip-location-block">
      <div class="home__ip-location-title">
        Пожалуйста разрешите определение вашей геолокации для отображения
        объявлений в вашем регионе
      </div>
      <div class="home__ip-location-button-block">
        <div>Блокировать</div>
        <div @click="getCountryAndCity">Разрешить</div>
      </div>
    </div> -->
    <div class="home__banner">
      <div class="home__banner-main">
        <h1>Общемаркетинговый портал для рекламодателей, инвесторов и исполнителей рекламных кампаний</h1>
        <Search />
      </div>
    </div>
    <AboutUs />
    <div class="home__title-block">
      <DefaultButton
        class="home__performers"
        @click.native="advPerformers"
        :class="{ activePerformers: activePerformers }"
      >
        <div class="home__main-title">Исполнители</div>
        <div>Где разместить</div>
      </DefaultButton>
      <DefaultButton
        class="home__advertisers"
        @click.native="advAdvertisers"
        :class="{ activeAdvertisers: activeAdvertisers }"
      >
        <div class="home__main-title">Рекламодатели</div>
        <div>Что разместить</div>
      </DefaultButton>
    </div>
<!--    <div v-if="this.popularHashtags.length != 0">-->
<!--      <div class="home__section-title">Популярные хештеги</div>-->
<!--      <div v-swiper:hashtags="optionHashtags" class="home__slick-hashtags">-->
<!--        <div class="swiper-wrapper">-->
<!--          <div-->
<!--            class="swiper-slide"-->
<!--            v-for="hashtags in this.popularHashtags"-->
<!--            :key="hashtags.id"-->
<!--          >-->
<!--            <NuxtLink-->
<!--              class="home__hashtag"-->
<!--              :to="`/searching-results/${hashtags}`"-->
<!--            >-->
<!--              {{ hashtags }}-->
<!--            </NuxtLink>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--        <div class="swiper-button-next" slot="button-next"></div>-->
<!--      </div>-->
<!--    </div>-->
    <div v-if="this.mainCategory.length != 0" class="home__section-category">
      <div class="home__section-title">Категории</div>
      <div class="home__slick-category">
        <div>
          <div
            class="category-item"
            v-for="category in mainCategory.slice(0, 9)"
            :key="category.id"
          >
            <div
              class="home__main-category"
              @click="goToCategory(category.category_key)"
            >
              <img :src="category.photo_url" :alt="category.photo_url" />
              <span class="home__main-category_text">{{
                category.category_name
              }}</span>
            </div>
          </div>
        </div>
<!--        <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--        <div class="swiper-button-next" slot="button-next"></div>-->
      </div>
    </div>
    <div v-if="this.mainAds.carousel_city.length != 0" class="new_world">
      <div class="home__section-title home__title-link">
        Новое по городу<span @click="goToLocationPageCity">
          {{ this.cityName }}</span
        >
        <TokenNotProvided
          class="home__token-error"
          :error-comment="errorAddtoFavorite"
        />
      </div>
      <div v-swiper:city="optionAds" class="home__slick-advs">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="ads in this.mainAds.carousel_city"
            :key="ads.id"
          >
            <SmallCard
              :ads-data="ads"
              :class="{ isAllocate: ads.is_allocate }"
              :add-advertisement-favorite="addAdvertisementFavorite"
              :delete-advertisements-favorite="deleteAdvertisementsFavorite"
            />
          </div>
        </div>
<!--        <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--        <div class="swiper-button-next" slot="button-next"></div>-->
      </div>
    </div>
    <div v-if="this.mainAds.carousel_country.length != 0">
      <div class="home__section-title home__title-link">
        Новое по стране<span @click="goToLocationPageCountry">{{
          this.countryName
        }}</span>
        <TokenNotProvided
          class="home__token-error"
          :error-comment="errorAddtoFavorite"
        />
      </div>
      <div v-swiper:country="optionAds" class="home__slick-advs new_world">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="ads in this.mainAds.carousel_country"
            :key="ads.id"
          >
            <SmallCard
              :ads-data="ads"
              :class="{ isAllocate: ads.is_allocate }"
              :add-advertisement-favorite="addAdvertisementFavorite"
              :delete-advertisements-favorite="deleteAdvertisementsFavorite"
            />
          </div>
        </div>
<!--        <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--        <div class="swiper-button-next" slot="button-next"></div>-->
      </div>
    </div>
    <div v-if="this.typeUser === 'performer'">
      <div v-if="this.mainAds.carousel_performer.length != 0">
        <div class="home__section-title home__title-link">
          Новое по<span @click="goToLocationPage">миру</span>
          <TokenNotProvided
            class="home__token-error"
            :error-comment="errorAddtoFavorite"
          />
        </div>
        <div v-swiper:performerWorld="optionAds" class="home__slick-advs new_world">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="ads in this.mainAds.carousel_performer"
              :key="ads.id"
            >
              <SmallCard
                :ads-data="ads"
                :class="{ isAllocate: ads.is_allocate }"
                :add-advertisement-favorite="addAdvertisementFavorite"
                :delete-advertisements-favorite="deleteAdvertisementsFavorite"
              />
            </div>
          </div>
<!--          <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--          <div class="swiper-button-next" slot="button-next"></div>-->
        </div>
      </div>
    </div>
    <div v-if="this.typeUser === 'employer'">
      <div v-if="this.mainAds.carousel_employer.length != 0">
        <div class="home__section-title home__title-link">
          Новое по<span @click="goToLocationPage">миру</span>
          <TokenNotProvided
            class="home__token-error"
            :error-comment="errorAddtoFavorite"
          />
        </div>
        <div v-swiper:employerWorld="optionAds" class="home__slick-advs new_world">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="ads in this.mainAds.carousel_employer"
              :key="ads.id"
            >
              <SmallCard
                :ads-data="ads"
                :class="{ isAllocate: ads.is_allocate }"
                :add-advertisement-favorite="addAdvertisementFavorite"
                :delete-advertisements-favorite="deleteAdvertisementsFavorite"
              />
            </div>
          </div>
<!--          <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--          <div class="swiper-button-next" slot="button-next"></div>-->
        </div>
      </div>
    </div>
    <div v-if="this.typeUser === 'performer'">
      <div v-if="this.mainAds.carousel_employer.length != 0">
        <div class="home__section-title home__title-link">
          Новое от рекламодателей по<span @click="goToLocationPageEmployer"
            >миру</span
          >
          <TokenNotProvided
            class="home__token-error"
            :error-comment="errorAddtoFavorite"
          />
        </div>
        <div v-swiper:performerNew="optionAds" class="home__slick-advs new_world">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="ads in this.mainAds.carousel_employer"
              :key="ads.id"
            >
              <SmallCard
                :ads-data="ads"
                :class="{ isAllocate: ads.is_allocate }"
              />
            </div>
          </div>
<!--          <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--          <div class="swiper-button-next" slot="button-next"></div>-->
        </div>
      </div>
    </div>
    <div v-if="this.typeUser === 'employer'">
      <div v-if="this.mainAds.carousel_performer.length != 0">
        <div class="home__section-title home__title-link">
          Новое от исполнителей по<span @click="goToLocationPagePerformer"
            >миру</span
          >
          <TokenNotProvided
            class="home__token-error"
            :error-comment="errorAddtoFavorite"
          />
        </div>
        <div v-swiper:employerNew="optionAds" class="home__slick-advs new_world">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="ads in this.mainAds.carousel_performer"
              :key="ads.id"
            >
              <SmallCard
                :ads-data="ads"
                :class="{ isAllocate: ads.is_allocate }"
                :add-advertisement-favorite="addAdvertisementFavorite"
                :delete-advertisements-favorite="deleteAdvertisementsFavorite"
              />
            </div>
          </div>
<!--          <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--          <div class="swiper-button-next" slot="button-next"></div>-->
        </div>
      </div>
    </div>
    <div>
      <div class="home__companys-nav-block home__section-title">
        <div class="">Новые компании</div>
        <div class="home__companys-nav">
          <div
          v-if="this.cityName"
            class="home__companys-nav-item"
            :class="{ activeCompany: activeCompanyCity }"
            @click="getCompanyLogoCity"
          >
            В городе {{ this.cityName }}
          </div>
          <div
            class="home__companys-nav-item"
            :class="{ activeCompany: activeCompanyCountry }"
            @click="getCompanyLogoCountry"
          >
            В стране {{ this.countryName }}
          </div>
          <div
            class="home__companys-nav-item"
            :class="{ activeCompany: activeCompanyAll }"
            @click="getCompanyLogo"
          >
            В мире
          </div>
        </div>
      </div>
      <div class="home__companys-block">
        <div
          v-for="(company, index) in mainCompany"
          v-if="index < 8"
          :key="company.company_id"
          class="home__companys"
          @click="companyDetail(company.company_id)"
        >
          <img :src="company.company_logo" :alt="company.company_logo" />
        </div>
      </div>
      <div v-if="!isAuthenticated" class="registration_company">
        <div
            v-if="!$device.isMobile"
            class="home__companys-registration"
            @click="goToRegistration"
        >
          Зарегистрироваться
        </div>
      </div>
<!--      <NuxtLink to="/all-companies" class="home__all-company">-->
<!--        Смотреть все компании-->
<!--      </NuxtLink>-->
      <div
        v-if="$device.isMobile && !isAuthenticated"
        class="home__companys-registration"
        @click="goToRegistration"
      >
        Зарегистрироваться
      </div>
    </div>
    <div v-if="this.mainTopAdvs.length > 0">
      <div class="home__section-title">
        Топ предложения
        <TokenNotProvided
          class="home__token-error"
          :error-comment="errorAddtoFavorite"
        />
      </div>
      <div v-swiper:top="optionAds" class="home__slick-advs new_world">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="ads in this.mainTopAdvs"
            :key="ads.id"
          >
            <SmallCard
              :ads-data="ads"
              :class="{ isAllocate: ads.is_allocate }"
              :add-advertisement-favorite="addAdvertisementFavorite"
              :delete-advertisements-favorite="deleteAdvertisementsFavorite"
            />
          </div>
        </div>
<!--        <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--        <div class="swiper-button-next" slot="button-next"></div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import SmallCard from "@/components/molecules/SmallCard.vue";
import AboutUs from "@/components/molecules/AboutUs.vue";
import Search from "@/components/molecules/Search.vue";
import Notification from "@/components/errors/Notification";
import TokenNotProvided from "@/components/errors/TokenNotProvided";

export default {
  name: "Home",
  data() {
    return {
      activeCompanyAll: true,
      term: {},
      ip: "",
      ipLat: "",
      ipLng: "",
      mainTopAdvs: {},
      isAllocate: false,
      activeCompanyCountry: false,
      activeCompanyCity: false,
      activeAdvertisers: false,
      activePerformers: true,
      typeUser: "performer",
      cityName: "",
      countryName: "",
      mainCompany: {},
      popularHashtags: {},
      mainCategory: {},
      mainAds: {},
      countryCode: "-",
      errorAddtoFavorite: null,
      cityCode: "-",
      optionHashtags: {
        slidesPerView: "auto",
        spaceBetween: 10,
        loop: true,
        loopFillGroupWithBlank: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      positionLatLng: null,
      optionCategory: {
        slidesPerView: 6,
        loop: true,
        loopFillGroupWithBlank: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 4,
          },
          640: {
            slidesPerView: 5,
          },
          1200: {
            slidesPerView: 8,
          },
        },
      },
      optionAds: {
        slidesPerView: 6,
        loop: true,
        loopFillGroupWithBlank: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        },
      },
    };
  },
  components: {
    DefaultButton,
    SmallCard,
    AboutUs,
    Search,
    Notification,
    TokenNotProvided,
  },
  computed: {
    ...mapGetters(["loggedInUser", "isAuthenticated"]),
  },
  mounted() {
    this.handleSetBreadCrambs();
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
    if (this.countryName == "") {
      this.countryName = JSON.parse(localStorage.getItem("countryNameIp"));
    }
    if (
      (this.typeUser = JSON.parse(localStorage.getItem("user-key")) !== null)
    ) {
      this.typeUser = JSON.parse(localStorage.getItem("user-key"));
    } else this.typeUser = "performer";
    if (this.typeUser === "employer") {
      this.advAdvertisers();
    }
    if (this.typeUser === "performer") {
      this.advPerformers();
    }
    this.getCompanyForGuest();
    this.getAdvertisementsTop();
    this.getServerIp();
    this.getGeo();
  },
  async fetch() {
    const data = [
      this.$axios.get("/getPopularHashtags"),
      this.$axios.get("/getCategoryList", {
        params: {
          type: "performer",
        },
      }),
      this.$axios.get("/getAdvertisementListForGuest", {
        params: {
          advertisement_type: "performer",
          country_code: "ua",
          city_code: this.cityCode,
        },
      }),
    ];
    const [popularHashtags, mainCategory, mainAds] = await Promise.all(data);
    this.popularHashtags = popularHashtags.data.data;
    this.mainCategory = mainCategory.data.data;
    this.mainAds = mainAds.data.data;
  },
  methods: {
    getServerIp() {
      fetch("https://api.ipify.org?format=json")
        .then((x) => x.json())
        .then(({ ip }) => {
          this.term = ip;
          localStorage.setItem("ip", JSON.stringify(this.term));
        });
      this.ip = JSON.parse(localStorage.getItem("ip"));
    },
    advPerformers() {
      this.getAdvertisementListForGuestAllUser();
      this.getCategory();
      this.activePerformers = true;
      this.activeAdvertisers = false;
      this.typeUser = "performer";
    },
    advAdvertisers() {
      this.getCategoryAdvertisers();
      this.getAdvertisementListForGuestAllCompany();
      this.activePerformers = false;
      this.activeAdvertisers = true;
      this.typeUser = "employer";
    },
    async getCategory() {
      try {
        await this.$axios
          .get("/getCategoryList", {
            params: {
              type: "performer",
            },
          })
          .then((res) => {
            this.mainCategory = res.data.data;
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getAdvertisementsTop() {
      this.countryCode = JSON.parse(localStorage.getItem("localCountryCode"));
      try {
        await this.$axios
          .get("/getAdvertisementsTop", {
            params: {
              country_code: this.countryCode,
            },
          })
          .then((res) => {
            this.mainTopAdvs = res.data.data;
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getCategoryAdvertisers() {
      try {
        await this.$axios
          .get("/getCategoryList", {
            params: {
              type: "employer",
            },
          })
          .then((res) => {
            this.mainCategory = res.data.data;
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },

    async getAdvertisementListForGuestAllUser() {
      try {
        await this.$axios
          .get("/getAdvertisementListForGuest", {
            params: {
              advertisement_type: "performer",
              country_code: this.countryCode,
              city_code: this.cityCode,
            },
          })
          .then((res) => {
            this.mainAds = res.data.data;
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getAdvertisementListForGuestAllCompany() {
      try {
        await this.$axios
          .get("/getAdvertisementListForGuest", {
            params: {
              advertisement_type: "employer",
              country_code: this.countryCode,
              city_code: this.cityCode,
            },
          })
          .then((res) => {
            this.mainAds = res.data.data;
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },

    async getCompanyForGuest() {
      this.countryCode = "";
      this.cityCode = "";
      try {
        await this.$axios
          .get("/getCompanyLogoListForGuest", {
            params: {
              country_code: this.countryCode,
              city_code: this.cityCode,
            },
          })
          .then((res) => {
            this.mainCompany = res.data.data;
          });
        this.countryCode = JSON.parse(localStorage.getItem("localCountryCode"));
        this.cityCode = JSON.parse(localStorage.getItem("localCityCode"));
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getCompanyLogoCity() {
      this.countryCode = JSON.parse(localStorage.getItem("localCountryCode"));
      this.cityCode = JSON.parse(localStorage.getItem("localCityCode"));
      try {
        await this.$axios
          .get("/getCompanyLogoListForGuest", {
            params: {
              country_code: this.countryCode,
              city_code: this.cityCode,
            },
          })
          .then((res) => {
            this.mainCompany = res.data.data;
          });
        this.activeCompanyCity = true;
        this.activeCompanyCountry = false;
        this.activeCompanyAll = false;
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getCompanyLogoCountry() {
      this.countryCode = this.countryCode;
      try {
        await this.$axios
          .get("/getCompanyLogoListForGuest", {
            params: {
              country_code: this.countryCode,
            },
          })
          .then((res) => {
            this.mainCompany = res.data.data;
          });
        this.activeCompanyCity = false;
        this.activeCompanyCountry = true;
        this.activeCompanyAll = false;
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getCompanyLogo() {
      let city = "";
      let country = "";
      try {
        await this.$axios
          .get("/getCompanyLogoListForGuest", {
            params: {
              country_code: country,
              city_code: city,
            },
          })
          .then((res) => {
            this.mainCompany = res.data.data;
          });
        this.activeCompanyCity = false;
        this.activeCompanyCountry = false;
        this.activeCompanyAll = true;
      } catch (e) {
        this.error = e.response.data;
      }
    },
    goToRegistration() {
      this.$router.push("/registration");
    },
    companyDetail(companyId) {
      this.$router.push(`/company-detail/${companyId}`);
    },
    goToCategory(categoryKey) {
      this.$router.push(`/category/${categoryKey}?user=${this.typeUser}`);
    },
    goToLocationPage() {
      this.$router.push(`/location/${"world"}`);
    },
    goToLocationPageEmployer() {
      this.$router.push(`/location/${"employer-world"}`);
    },
    goToLocationPagePerformer() {
      this.$router.push(`/location/${"performer-world"}`);
    },
    goToLocationPageCountry() {
      this.$router.push(
        `/location/country-${this.countryCode}?user=${this.typeUser}`
      );
    },
    goToLocationPageCity() {
      this.$router.push(
        `/location/city-${this.cityCode}?user=${this.typeUser}`
      );
    },
    searchHashtags(hashtag) {
      this.$router.push(`/searching-results/${hashtag}`);
    },
    async addAdvertisementFavorite(id) {
      try {
        await this.$axios.post("/addAdvertisementFavorite", {
          advertisement_id: id,
        });
        this.getAdvertisementsTop();
        if (this.typeUser === "employer") {
          this.getAdvertisementListForGuestAllCompany();
        }
        if (this.typeUser === "performer") {
          this.getAdvertisementListForGuestAllUser();
        }
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
        this.getAdvertisementsTop();
        if (this.typeUser === "employer") {
          this.getAdvertisementListForGuestAllCompany();
        }
        if (this.typeUser === "performer") {
          this.getAdvertisementListForGuestAllUser();
        }
      } catch (e) {
        this.error = e.response.data;
      }
    },
    handleSetBreadCrambs() {
      localStorage.removeItem("BreadCrumbsTitle");
      localStorage.removeItem("BreadCrumbsLink");
    },
    getGeo() {
      if (JSON.parse(localStorage.getItem("localCountryName")) === null) {
        navigator.geolocation.getCurrentPosition(
          successFunction,
          // errorFunction
        );
        function successFunction(position) {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          fetch(
            `https://api.advon.test.ut.in.ua/api/v1/getCountryAndCity?latitude=${lat}&longitude=${lng}`
          )
            .then(function (response) {
              return response.text();
            })
            .then((res) => {
              localStorage.setItem(
                "localCountryName",
                JSON.stringify(JSON.parse(res).data.country),
              );
              localStorage.setItem(
                "localCountryCode",
                JSON.stringify(JSON.parse(res).data.country_code)
              );
              localStorage.setItem(
                "localCityName",
                JSON.stringify(JSON.parse(res).data.city)
              );
              localStorage.setItem(
                "localCityCode",
                JSON.stringify(JSON.parse(res).data.city_code)
              );
            });
            setTimeout(() =>
              window.location.reload()
            ,2000)
        }
      }
      function errorFunction() {
        alert("Geocoder failed");
      }
    },
    async getCountryAndCity() {
      this.ipLat = JSON.parse(localStorage.getItem("ipLat"));
      this.ipLng = JSON.parse(localStorage.getItem("ipLng"));
      try {
        await this.$axios.get("/getCountryAndCity", {
          params: {
            latitude: this.ipLat,
            longitude: this.ipLng,
          },
        });
      } catch (e) {
        this.error = e.response.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  padding-top: 20px;
  &__performers {
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

  &__advertisers {
    background: $buttonSecondColor;
    width: 50%;

    /deep/button {
      color: $mainThirdColor;
    }
  }

  &__title-block {
    display: flex;

    /deep/.main-button {
      max-width: 100%;
      height: 60px;
    }

    /deep/button {
      padding: 9px 9px;
    }
  }

  &__main-title {
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
  }

  &__section-title {
    font-weight: 500;
    font-size: $g-second-title-size;
    line-height: 28px;
    padding: 35px 0 25px 0;

    span {
      color: $mainColor;
    }
  }

  &__ip-location-block {
    position: absolute;
    top: 60px;
    width: 300px;
    padding: 20px 10px;
    background: $mainSecondColor;
    z-index: 10;
  }

  &__ip-location-title {
    line-height: 16px;
    text-align: center;
    padding-bottom: 15px;
  }

  &__ip-location-button-block {
    display: flex;
  }

  &__main-categiry {
    display: flex !important;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: fit-content;

    &:hover {
      cursor: pointer;
    }

    img {
      margin-bottom: 15px;

      &:hover {
        cursor: pointer;
        box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
        border-radius: 100%;
      }
    }
  }

  &__hashtag {
    width: fit-content !important;
    padding: 6px 10px;
    background: #d4e3f6;
    display: block;
    color: black;

    &:hover {
      cursor: pointer;
      color: $mainColor;
    }
  }

  /deep/.slick-slide div {
    display: flex;
    justify-content: center;
    text-align: center;
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
  &__slick-categiry {
    width: 97%;
    margin: auto;
    /deep/button {
      top: 35%;
    }
    /deep/.swiper-button-prev {
      top: 40%;
      display: none;
    }
    /deep/.swiper-button-next {
      top: 40%;
      display: none;
    }
  }
  &__slick-categiry:hover {
    /deep/.swiper-button-prev {
      display: flex;
    }
    /deep/.swiper-button-next {
      display: flex;
    }
  }
  &__slick-hashtags {
    width: 100%;
    margin: 0 20px;

    .swiper-slide {
      width: auto;
    }
  }
  &__slick-advs {
    width: 101.5%;
    margin: auto;
    position: relative;

    /deep/.slick-next {
      right: 2px !important;
    }
    /deep/.slick-prev {
      left: -18px !important;
      z-index: 1;
    }
  }

  &__token-error {
    position: relative;
    top: 10px;
    font-size: $g-font-base-size;
    line-height: 18px;
  }

  &__slick-hashtags {
    width: 97%;

    /deep/.swiper-button-prev {
      left: 0;
      top: 21px;
      display: none;
    }
    /deep/.swiper-button-next {
      right: 10px;
      top: 21px;
      display: none;
    }
  }

  &__slick-hashtags:hover {
    /deep/.swiper-button-prev {
      display: flex;
    }
    /deep/.swiper-button-next {
      display: flex;
    }
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

  &__companys {
    margin: 30px 12px 10px 12px;

    img {
      width: 166px;
      height: 60px;

      &:hover {
        cursor: pointer;
        box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
      }
    }
  }

  &__companys-block {
    display: flex;
    flex-wrap: wrap;
  }

  &__companys-nav-block {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
  }

  &__companys-nav {
    display: flex;
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
  &__companys-registration {
    display: flex;
    align-items: center;
    justify-content: center;
    background: $mainColor;
    color: $mainSecondColor;
    height: 44px;
    width: 166px;
    font-weight: bold;

    &:hover {
      cursor: pointer;
    }
  }

  &__all-company {
    display: block;
    color: $mainColor;
    text-align: right;
    padding-top: 30px;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .activeCompany {
    background: #d4e3f6;
    color: $mainThirdColor;
  }

  &__title-link {
    span {
      display: inline-block;
      padding-left: 7px;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
  .isAllocate {
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    border-image: linear-gradient(
      91.41deg,
      rgb(37, 117, 237) 0%,
      rgb(80, 185, 135) 100%
    );
    border-image-slice: 1;

    /deep/img {
      max-width: 266px;
    }
  }
  /deep/.swiper-button-prev,
  /deep/.swiper-button-next {
    width: 30px;
    height: 30px;
  }
  /deep/.swiper-button-prev::after,
  /deep/.swiper-button-next::after {
    display: none;
  }
  /deep/.swiper-button-prev {
    left: 0;
  }
  /deep/.swiper-button-next {
    right: 10px;
  }
  /deep/.swiper-button-prev::before {
    content: "";
    background-image: url("@/assets/images/slick/slick-prev.png");
    background-size: 100%;
    background-repeat: no-repeat;
    color: transparent;
    width: 30px;
    height: 30px;
  }
  /deep/.swiper-button-next::before {
    content: "";
    background-image: url("@/assets/images/slick/slick-next.png");
    background-size: 100%;
    background-repeat: no-repeat;
    color: transparent;
    width: 30px;
    height: 30px;
  }
}
@media (max-width: $break-xlg) {
  .home {
    .isTop {
      /deep/img {
        max-width: 100%;
      }
    }
    &__hashtag {
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__slick-advs {
      /deep/.slick-prev {
        left: -12px !important;
      }
      /deep/.slick-next {
        right: -12px !important;
      }
    }
    &__companys-nav-item {
      padding: 15px 10px;
      margin-right: 20px;
    }
    &__companys-registration {
      padding: 0 10px;
    }
    &__companys-block {
      padding-top: 25px;
    }
    &__all-company {
      padding-top: 7px;
      text-align: center;
    }
    &__companys {
      width: 20%;
      margin: 0;
      padding: 10px;

      img {
        width: 100%;
        object-fit: cover;
      }
    }
  }
}
@media (max-width: $break-sm) {
  .home {
    &__main-categiry img {
      width: 100%;
      padding: 5px;
      margin: 0;
    }
    &__slick-hashtags {
      margin: 0;
      padding: 0 10px 0 10px;
    }
    &__main-categiry_text {
      display: none;
    }
    &__section-title {
      padding: 10px 0 15px 6px;
      font-size: 18px;
    }
    /deep/.slick-arrow {
      display: none !important;
    }
    &__companys-registration {
      margin: 15px auto 0;
      width: 250px;
    }
    &__companys {
      width: 33%;
    }
    &__companys-nav {
      padding: 0 7px;
    }
    &__companys-nav-item {
      margin: 0;
    }
    /deep/.slick-slide {
      .small-card {
        width: 95%;
      }
    }
    /deep/.swiper-button-prev {
      display: none;
    }
    /deep/.swiper-button-next {
      display: none;
    }
  }
}
</style>
