<template>
  <div class="nav-menu">
<!--    <div-->
<!--      v-if="$device.isDesktop"-->
<!--      class="nav-menu__item nav-menu__item-location"-->
<!--    >-->
<!--      <div @click="getLocation">-->
<!--        <span-->
<!--          v-if="-->
<!--            !this.countrySelected || !this.regionsSelected || !this.citySelected-->
<!--          "-->
<!--        >-->
<!--          <span v-if="!this.citySelected && !this.countrySelected">-->
<!--            {{ this.translate.location }}-->
<!--          </span>-->
<!--        </span>-->
<!--        {{ this.countrySelected }}-->
<!--        {{ this.citySelected }}-->
<!--        <SelectArrow />-->
<!--      </div>-->
<!--      <div-->
<!--        v-if="locationData && this.locationBody"-->
<!--        v-click-outside="locationOutside"-->
<!--      >-->
<!--        <div-->
<!--          class="nav-menu__location-block"-->
<!--          v-if="this.locCountry || this.locRegions || this.locCity"-->
<!--        >-->
<!--          <div v-if="this.locCountry">-->
<!--            <div class="nav-menu__location-title">Ваше местоположение</div>-->
<!--            <div class="nav-menu__location-body-country">-->
<!--              <div-->
<!--                v-for="loc in this.locationData"-->
<!--                :key="loc.id"-->
<!--                class="nav-menu__location-item"-->
<!--                @click="getRegions(loc.code, loc.name)"-->
<!--              >-->
<!--                <div>-->
<!--                  <img :src="loc.flag" alt="" />-->
<!--                </div>-->
<!--                <div class="nav-menu__location-name">-->
<!--                  {{ loc.name }}-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="nav-menu__location-body-country" v-if="this.locRegions">-->
<!--            <div class="nav-menu__location-body-country-top-container">-->
<!--              <div class="nav-menu__location-title">-->
<!--                {{ this.countrySelected }}-->

<!--                <span @click="this.setCountrySelected"-->
<!--                  >Искать по всей стране</span-->
<!--                >-->
<!--              </div>-->
<!--              <div class="nav-menu__location-back" @click="getLocation">-->
<!--                Изменить страну-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="nav-menu__regions-group">-->
<!--              <div-->
<!--                v-for="region in this.regionsData"-->
<!--                :key="region.id"-->
<!--                class="nav-menu__regions"-->
<!--              >-->
<!--                <div class="nav-menu__region-letter">-->
<!--                  {{ region.letter }}-->
<!--                </div>-->
<!--                <div-->
<!--                  class="nav-menu__city-name"-->
<!--                  v-for="reg in region.group"-->
<!--                  :key="reg.id"-->
<!--                  @click="getCitys(reg.code, reg.name)"-->
<!--                >-->
<!--                  {{ reg.name }}-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="nav-menu__location-body-country" v-if="this.locCity">-->
<!--            <div class="nav-menu__location-body-country-top-container">-->
<!--              <div class="nav-menu__location-title">-->
<!--                {{ this.regionsSelected }}-->
<!--              </div>-->
<!--              <div class="nav-menu__location-back" @click="getLocation">-->
<!--                Изменить страну-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="nav-menu__regions-group">-->
<!--              <div v-for="city in this.citysData" :key="city.id">-->
<!--                <div class="nav-menu__region-letter">-->
<!--                  {{ city.letter }}-->
<!--                </div>-->
<!--                <div-->
<!--                  v-for="item in city.group"-->
<!--                  :key="item.id"-->
<!--                  @click="getCity(item.name, item.id)"-->
<!--                  class="nav-menu__city-name"-->
<!--                >-->
<!--                  {{ item.name }}-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div-->
<!--      v-if="!$device.isMobile"-->
<!--      class="nav-menu__item blue"-->
<!--      @click="setUserType"-->
<!--      v-click-outside="userTypeOutside"-->
<!--    >-->
<!--      {{ this.userType }}-->
<!--      <SelectArrow />-->
<!--      <div class="nav-menu__type-user-body" v-if="setUserTypeOpen">-->
<!--        <div v-for="user in userTypeSelect" :key="user.name">-->
<!--          <div-->
<!--            class="nav-menu__type-user"-->
<!--            @click="getUserType(user.name, user.key)"-->
<!--          >-->
<!--            {{ user.name }}-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div v-if="$device.isDesktop" class="nav-menu__item">-->
<!--      {{ this.translate.advertising_on_the_site }}-->
<!--    </div>-->
<!--    <div v-if="$device.isDesktop" class="nav-menu__item">-->
<!--      {{ this.translate.blog }}-->
<!--    </div>-->
<!--    <div v-if="$device.isDesktop" class="nav-menu__item" @click="getTranslate">-->
<!--      {{ this.translate.legal_notice }}-->
<!--    </div>-->
    <div class="nav-menu__item">О нас</div>
    <div class="nav-menu__item">Карта</div>
    <div class="nav-menu__item" @click="goCompanies">Компании</div>
    <div class="nav-menu__item">Юрликбез</div>
    <div class="nav-menu__item">Реклама на сайте</div>
    <div class="nav-menu__item" @click="goFaq">FAQ</div>
    <div
      v-if="isAuthenticated === true && !$device.isMobile"
      class="nav-menu__item login_reg user_name"
    >
      <div @click="HeaderMenuOpen">
        {{ loggedInUser.name }}
<!--        <SelectArrow />-->
      </div>
      <transition name="fade">
        <div
          v-if="HeaderMenu"
          class="nav-menu__overlay"
          @click.self="HeaderMenuOpen"
        >
          <HeaderMenu />
        </div>
      </transition>
    </div>
    <div
      v-if="isAuthenticated === true && $device.isMobile"
      class="nav-menu__item login_reg"
    >
      <UserIcon @click="HeaderMenuOpen" />
      <div
        v-if="HeaderMenu"
        class="nav-menu__overlay"
        @click.self="HeaderMenuOpen"
      >
        <HeaderMenu />
      </div>
    </div>
    <NuxtLink
      v-if="isAuthenticated === false && $device.isMobile"
      class="nav-menu__item"
      to="/login"
    >
      <UserIcon />
    </NuxtLink>
    <div class="login_reg" v-if="isAuthenticated === false && !$device.isMobile">
      <NuxtLink
        to="/login"
        class="nav-menu__login nav-menu__item"
      >
        {{ this.translate.entrance }}
      </NuxtLink>
      <div
        v-if="isAuthenticated === false && !$device.isMobile"
        class="nav-menu__delimiter"
      >
        /
      </div>
      <NuxtLink
        v-if="isAuthenticated === false && !$device.isMobile"
        to="/registration"
        class="nav-menu__registration nav-menu__item"
        >
        {{ this.translate.register }}
      </NuxtLink>
    </div>
    <div v-if="$device.isDesktop" class="nav-menu__item">
      <div @click="changlanguage">
        <span v-if="this.selectLangNew === ''">RU
<!--          {{ this.translate.language }}-->
        </span>
        <span v-if="this.selectLangNew !== ''">
          {{ this.selectLangNew.toUpperCase() }}
        </span>
        <span>
          <SelectArrow />
        </span>
      </div>
      <div
          v-for="language in this.lang"
          :key="language.id"
          class="nav-menu__item-lang"
          @click="selectLang(language.key)"
          v-click-outside="langOutside"
      >
        <div class="nav-menu__select-lang-body" v-if="langSelectContainer">
          <div class="nav-menu__select-lang-title">Выбрать язык</div>
          {{ language.key.toUpperCase() }}
        </div>
      </div>
    </div>
<!--    <NuxtLink-->
<!--      v-if="!$device.isMobile"-->
<!--      to="/dashboard/create-ad"-->
<!--      class="nav-menu__create-ad"-->
<!--    >-->
<!--      {{ this.translate.сreate_ad }}-->
<!--    </NuxtLink>-->
    <NuxtLink
      v-if="$device.isMobile"
      to="/dashboard/create-ad"
      class="nav-menu__create-ad plus"
    />
    <transition name="fade">
      <div
        v-if="!$device.isDesktop && sideMenu"
        @click.self="handleCloseSideMenu"
        class="nav-menu__overlay"
      >
        <div class="nav-menu__side-menu">
<!--          <div class="nav-menu__item nav-menu__item-location">-->
<!--            <div-->
<!--              @click="handleCloseSideMenu"-->
<!--              v-if="$device.isMobile"-->
<!--              class="nav-menu__close"-->
<!--            ></div>-->
<!--            <div @click="getLocation">-->
<!--              <span-->
<!--                v-if="-->
<!--                  !this.countrySelected ||-->
<!--                  !this.regionsSelected ||-->
<!--                  !this.citySelected-->
<!--                "-->
<!--              >-->
<!--                <span v-if="!this.citySelected">-->
<!--                  {{ this.translate.location }}-->
<!--                </span>-->
<!--              </span>-->
<!--              {{ this.citySelected }}-->
<!--              <SelectArrow />-->
<!--            </div>-->
<!--            <div v-if="locationData && this.locationBody" v-click-outside="locationOutside">-->
<!--              <div-->
<!--                class="nav-menu__location-block"-->
<!--                v-if="this.locCountry || this.locRegions || this.locCity"-->
<!--              >-->
<!--                <div v-if="this.locCountry">-->
<!--                  <div class="nav-menu__location-title">-->
<!--                    Ваше местоположение-->
<!--                  </div>-->
<!--                  <div class="nav-menu__location-body-country">-->
<!--                    <div-->
<!--                      v-for="loc in this.locationData"-->
<!--                      :key="loc.id"-->
<!--                      class="nav-menu__location-item"-->
<!--                      @click="getRegions(loc.code, loc.name)"-->
<!--                    >-->
<!--                      <div>-->
<!--                        <img :src="loc.flag" alt="" />-->
<!--                      </div>-->
<!--                      <div class="nav-menu__location-name">-->
<!--                        {{ loc.name }}-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div-->
<!--                  class="nav-menu__location-body-country"-->
<!--                  v-if="this.locRegions"-->
<!--                >-->
<!--                  <div class="nav-menu__location-body-country-top-container">-->
<!--                    <div class="nav-menu__location-title">-->
<!--                      {{ this.countrySelected }}-->

<!--                      <span @click="this.setCountrySelected"-->
<!--                        >Искать по всей стране</span-->
<!--                      >-->
<!--                    </div>-->
<!--                    <div class="nav-menu__location-back" @click="getLocation">-->
<!--                      Изменить страну-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="nav-menu__regions-group">-->
<!--                    <div-->
<!--                      v-for="region in this.regionsData"-->
<!--                      :key="region.id"-->
<!--                      class="nav-menu__regions"-->
<!--                    >-->
<!--                      <div class="nav-menu__region-letter">-->
<!--                        {{ region.letter }}-->
<!--                      </div>-->
<!--                      <div-->
<!--                        v-for="reg in region.group"-->
<!--                        :key="reg.id"-->
<!--                        @click="getCitys(reg.code, reg.name)"-->
<!--                      >-->
<!--                        {{ reg.name }}-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div-->
<!--                  class="nav-menu__location-body-country"-->
<!--                  v-if="this.locCity"-->
<!--                >-->
<!--                  <div class="nav-menu__location-title">-->
<!--                    {{ this.regionsSelected }}-->
<!--                  </div>-->
<!--                  <div class="nav-menu__regions-group">-->
<!--                    <div v-for="city in this.citysData" :key="city.id">-->
<!--                      <div class="nav-menu__region-letter">-->
<!--                        {{ city.letter }}-->
<!--                      </div>-->
<!--                      <div-->
<!--                        v-for="item in city.group"-->
<!--                        :key="item.id"-->
<!--                        @click="getCity(item.name, item.id)"-->
<!--                      >-->
<!--                        {{ item.name }}-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div-->
<!--              v-if="$device.isMobile"-->
<!--              class="nav-menu__login-container"-->
<!--              @click="handleCloseSideMenu"-->
<!--            >-->
<!--              <div v-if="isAuthenticated === true && $device.isMobile" class="">-->
<!--                <div @click="HeaderMenuOpen">-->
<!--                  {{ loggedInUser.name }}-->
<!--                  <SelectArrow />-->
<!--                </div>-->
<!--                <div-->
<!--                  v-if="HeaderMenu"-->
<!--                  class="nav-menu__overlay"-->
<!--                  @click.self="HeaderMenuOpen"-->
<!--                >-->
<!--                  <HeaderMenu />-->
<!--                </div>-->
<!--              </div>-->
<!--              <NuxtLink-->
<!--                v-if="isAuthenticated === false"-->
<!--                to="/login"-->
<!--                class="nav-menu__login"-->
<!--              >-->
<!--                {{ this.translate.entrance }}-->
<!--              </NuxtLink>-->
<!--              <div v-if="isAuthenticated === false" class="nav-menu__delimiter">-->
<!--                |-->
<!--              </div>-->
<!--              <NuxtLink-->
<!--                v-if="isAuthenticated === false"-->
<!--                to="/registration"-->
<!--                class="nav-menu__registration"-->
<!--              >-->
<!--                {{ this.translate.register }}-->
<!--              </NuxtLink>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div-->
<!--            v-if="$device.isMobile"-->
<!--            class="nav-menu__item"-->
<!--            @click="setUserType()"-->
<!--          >-->
<!--            {{ this.userType }}-->
<!--            <SelectArrow />-->
<!--            <div class="nav-menu__type-user-body" v-if="setUserTypeOpen">-->
<!--              <div v-for="user in userTypeSelect" :key="user.name">-->
<!--                <div-->
<!--                  class="nav-menu__type-user"-->
<!--                  @click="getUserType(user.name, user.key)"-->
<!--                >-->
<!--                  {{ user.name }}-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="nav-menu__item">-->
<!--            {{ this.translate.advertising_on_the_site }}-->
<!--          </div>-->
<!--          <div class="nav-menu__item">-->
<!--            {{ this.translate.blog }}-->
<!--          </div>-->
<!--          <div class="nav-menu__item" @click="getTranslate">-->
<!--            {{ this.translate.legal_notice }}-->
<!--          </div>-->
          <div class="nav-menu__item">
            <span v-if="this.selectLangNew === ''">
              {{ this.translate.language }}
            </span>
            <span v-if="this.selectLangNew !== ''">
              {{ this.selectLangNew }}
            </span>
            <div
              v-for="language in this.lang"
              :key="language.id"
              class="nav-menu__item-lang"
              @click="selectLang(language.name)"
            >
              {{ language.name }}
            </div>
            <span @click="changlanguage">
              <SelectArrow />
            </span>
          </div>
<!--          <NuxtLink-->
<!--            v-if="$device.isMobile"-->
<!--            to="/dashboard/create-ad"-->
<!--            class="nav-menu__create-ad"-->
<!--          >-->
<!--            {{ this.translate.сreate_ad }}-->
<!--          </NuxtLink>-->
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderMenu from "@/components/sections/HeaderMenu.vue";
import SelectArrow from "@/assets/images/arrow/Alt_Arrow_Down.svg?inline";;
import UserIcon from "@/assets/images/icons/user.svg?inline";
import DefaultModal from "@/components/molecules/DefaultModal.vue";
import ClickOutside from "vue-click-outside";

export default {
  name: "NavMenu",
  data() {
    return {
      HeaderMenu: false,
      lang: null,
      translate: {},
      userType: "Исполнители",
      userTypeSelect: [
        {
          name: "Исполнители",
          key: "performer",
        },
        {
          name: "Рекламодатели",
          key: "employer",
        },
      ],
      selectLangNew: "",
      locationData: "",
      regionsData: "",
      locCountry: false,
      locRegions: false,
      locCity: false,
      countrySelected: "",
      regionsSelected: "",
      citySelected: "",
      countrySelectedSearch: "",
      countryCode: "",
      citysData: {},
      setUserTypeOpen: false,
      langSelectContainer: false,
      locationBody: true,
    };
  },
  props: {
    sideMenu: {
      type: Boolean,
      default: false,
    },
    handleCloseSideMenu: {
      type: [Function, Boolean],
      default: null,
    },
  },
  components: {
    SelectArrow,
    HeaderMenu,
    DefaultModal,
    UserIcon,
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
  directives: {
    ClickOutside,
  },
  watch: {
    $route(to, from) {
      this.HeaderMenu = false;
      document.querySelector("html").classList.remove("overflow-block");
    },
  },
  mounted() {
    this.citySelected = JSON.parse(localStorage.getItem("localCityName"));
    this.countrySelected = JSON.parse(localStorage.getItem("localCountryName"));
    if (JSON.parse(localStorage.getItem("user-type")) !== null) {
      this.userType = JSON.parse(localStorage.getItem("user-type"));
    }
    this.getTranslate();
  },
  methods: {
    HeaderMenuOpen() {
      if (this.HeaderMenu === true) {
        this.HeaderMenu = false;
        document.querySelector("html").classList.remove("overflow-block");
      } else {
        this.HeaderMenu = true;
        document.querySelector("html").classList.add("overflow-block");
      }
    },
    goFaq () {
      location.href = '/faq';
    },
    goCompanies () {
      location.href = '/all-companies';
    },
    async changlanguage() {
      try {
        await this.$axios.get("/getLanguages").then((response) => {
          this.lang = response.data.data;
        });
        if (this.langSelectContainer === false) {
          this.langSelectContainer = true;
        } else this.langSelectContainer = false;
      } catch (e) {
        this.error = e.response.data;
      }
    },
    selectLang(languageName) {
      this.selectLangNew = languageName;
      this.lang = "";
    },
    async getTranslate() {
      try {
        await this.$axios
          .get("/getTranslations", {
            params: {
              language_key: "ru",
              keys: [
                "price",
                "location",
                "performers",
                "advertising_on_the_site",
                "blog",
                "legal_notice",
                "language",
                "entrance",
                "register",
                "сreate_ad ",
              ],
            },
          })
          .then((response) => {
            this.translate = response.data.data;
            // this.userType = this.translate.performers;
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getLocation() {
      try {
        await this.$axios.get("/getCountries").then((res) => {
          this.locationData = res.data.data;
        });
        if (this.locCountry === false) {
          this.locCountry = true;
          this.locRegions = false;
          this.locationBody = true;
        } else this.locCountry = false;
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getRegions(countryCode, countryName) {
      try {
        await this.$axios
          .get("/getRegionsGrouped", {
            params: {
              country_code: countryCode,
            },
          })
          .then((res) => {
            this.regionsData = res.data;
          });
        this.countrySelectedSearch = countryCode;
        this.locRegions = true;
        this.locCountry = false;
        this.countrySelected = countryName;
        this.countryCode = countryCode;
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getCitys(regionCode, regionName) {
      try {
        await this.$axios
          .get("/getCitiesGrouped", {
            params: {
              country_code: this.countryCode,
              region_code: regionCode,
            },
          })
          .then((res) => {
            this.citysData = res.data;
          });
        this.locRegions = false;
        this.locCountry = false;
        this.locCity = true;
        this.regionsSelected = regionName;
      } catch (e) {
        this.error = e.response.data;
      }
    },
    getCity(cityName, cityCode) {
      this.citySelected = cityName;
      this.locRegions = false;
      this.locCountry = false;
      this.locCity = false;
      localStorage.setItem(
        "localCountryName",
        JSON.stringify(this.countrySelected)
      );
      localStorage.setItem(
        "localCountryCode",
        JSON.stringify(this.countrySelectedSearch)
      );
      localStorage.setItem("localCityName", JSON.stringify(cityName));
      localStorage.setItem("localCityCode", JSON.stringify(cityCode));
      window.location.reload();
    },
    setUserType() {
      if (this.setUserTypeOpen === false) {
        this.setUserTypeOpen = true;
      } else this.setUserTypeOpen = false;
    },
    getUserType(name, key) {
      this.userType = name;
      localStorage.setItem("user-type", JSON.stringify(this.userType));
      localStorage.setItem("user-key", JSON.stringify(key));
      this.$router.push("/");
      if (this.$route.path == "/") {
        window.location.reload();
      }
    },
    setCountrySelected() {
      localStorage.setItem(
        "localCountryName",
        JSON.stringify(this.countrySelected)
      );
      localStorage.setItem(
        "localCountryCode",
        JSON.stringify(this.countrySelectedSearch)
      );
      localStorage.setItem("localCityName", JSON.stringify(""));
      localStorage.setItem("localCityCode", JSON.stringify("false"));
      this.$router.push("/");
      this.locationBody = false;
      if (this.$route.path == "/") {
        window.location.reload();
      }
    },
    locationOutside() {
      this.locationBody = false;
    },
    userTypeOutside() {
      this.setUserTypeOpen = false;
    },
    langOutside() {
     this.langSelectContainer = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-menu {
  display: flex;
  align-items: center;

  &__item {
    position: relative;
    padding-left: 25px;
    font-size: $g-mobile-size;

    &.blue {
      color: $mainColor;
    }

    svg {
      margin-left: 5px;
    }

    &:hover {
      cursor: pointer;

      .nav-menu__type-user-body {
        color: $mainThirdColor;
      }
    }
  }

  &__item-location {
    position: static;
  }

  &__create-ad {
    background: $buttonColor;
    margin-left: 30px;
    padding: 12px 10px;
    color: $mainSecondColor;

    &:hover {
      @include hover-button;
    }

    &:active {
      @include active-button;
    }
  }

  &__login {
    padding-right: 10px;
    color: $mainThirdColor;
  }

  &__registration {
    padding-left: 10px;
    color: $mainThirdColor;
  }

  &__item-lang {
    position: absolute;
  }

  &__location-block {
    position: absolute;
    left: 0;
    top: 61px;
    background: $mainSecondColor;
    padding: 25px 20px;
    z-index: 2;
    width: 100%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  }

  &__city-name {
    &:hover {
      cursor: pointer;
      color: $mainColor;
    }
  }

  &__location-title {
    font-size: 20px;
    line-height: 23px;
    padding-bottom: 20px;

    span {
      font-size: $g-font-second-size;
      text-decoration: underline;
      display: inline-block;
      padding-left: 15px;

      &:hover {
        color: $mainColor;
      }
    }
  }

  &__location-body-country {
    display: flex;
    flex-wrap: wrap;
  }

  &__location-item {
    display: flex;
    align-items: center;
    width: 25%;
    padding-bottom: 10px;

    img {
      width: 25px;
      margin-right: 20px;
    }
  }

  &__regions-group {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    div {
      width: 25%;
      padding-bottom: 5px;
    }
  }

  &__regions {
    width: 25%;
    padding-bottom: 15px;
  }

  &__region-letter {
    color: $mainFifthColor;
    padding-bottom: 5px;
  }

  &__location-name {
    font-size: $g-font-second-size;
    position: relative;
    bottom: 4px;

    &:hover {
      color: $mainColor;
      cursor: pointer;
    }
  }
  &__type-user-body {
    position: absolute;
    z-index: 1;
    top: 40px;
    background: $mainSecondColor;
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
    padding: 0 20px;

    &:hover {
      color: $mainThirdColor;
    }
  }

  &__location-body-country-top-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  &__location-back {
    color: $mainColor;
    padding-bottom: 20px;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  &__type-user {
    padding: 5px 0;
    color: black;
  }

  &__select-lang-title {
    font-size: 20px;
    padding-bottom: 15px;
  }

  &__select-lang-body {
    background: $mainSecondColor;
    width: 200px;
    padding: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  }
}
@media (max-width: $break-xlg) {
  .nav-menu {
    &__overlay {
      position: fixed;
      inset: 0;
      background: rgba(#000000, 0.4);
      z-index: 100;
    }
    &__overlay {
      position: fixed;
      inset: 0;
      background: rgba(#000000, 0.4);
      z-index: 100;
    }
    &__side-menu {
      height: 100%;
      width: 253px;
      background: $mainSecondColor;
      display: flex;
      flex-direction: column;
      padding-top: 20px;

      .nav-menu__item {
        font-size: 14px;
        margin-bottom: 25px;
      }

      .nav-menu__item-location {
        position: relative;
        height: 80px;
        background: #f8f8f8;
        border-bottom: 1px solid #dadada;
      }
      .nav-menu__location-item {
        width: 100%;
      }
      .nav-menu__regions-group div {
        width: 100%;
      }
    }
  }
}
@media (max-width: $break-sm) {
  .nav-menu {
    &__create-ad.plus {
      width: 30px;
      height: 30px;
      position: relative;

      &:before {
        content: "";
        background: $mainSecondColor;
        height: 20px;
        width: 2px;
        position: absolute;
        left: 14px;
        top: 5px;
      }
      &:after {
        content: "";
        height: 2px;
        width: 20px;
        background: $mainSecondColor;
        position: absolute;
        left: 5px;
        top: 14px;
      }
    }
    &__side-menu {
      width: 260px;
      padding-top: 15px;
      height: 100%;

      .nav-menu__login-container {
        display: flex;
      }
      .nav-menu__item {
        padding-left: 6px;

        svg {
          transform: rotate(-90deg);
        }
      }
      .nav-menu__item-location {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 128px;
        padding-bottom: 12px;
      }
      .nav-menu__close {
        position: relative;
        width: 24px;
        height: 24px;
        &:before,
        &:after {
          position: absolute;
          left: 10px;
          content: " ";
          height: 24px;
          width: 4px;
          background-color: #2575ed;
        }
        &:before {
          transform: rotate(45deg);
        }
        &:after {
          transform: rotate(-45deg);
        }
      }
      .nav-menu__create-ad {
        margin: auto auto 20px 8px;
      }
      .nav-menu__location-body-country-top-container {
        flex-direction: column;
        align-items: flex-start;
      }
      .nav-menu__location-title span {
        padding: 0;
      }
    }
  }
}
</style>
