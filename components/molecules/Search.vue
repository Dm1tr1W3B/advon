<template>
  <div class="search">
    <InputText
      :set-value="formDataToSend"
      :id="'textSearch'"
      :label="'textSearch'"
      :placeholder="'Поиск по объявлениям и по хештегам'"
      class="search__text"
    />
    <SearchIcon class="search__search-icon" />
    <div class="search__params">
      <div class="search__params-category" @click="openModalCategory">
        <span><div class="search__params-category-name"> {{ categoryName }}</div>
          <SelectArrow />
        </span>
      </div>
      <div @click="getLocation" class="search__params-location-title">
        <span
          v-if="
            !this.countrySelected || !this.regionsSelected || !this.citySelected
          "
        >
          <span v-if="!this.citySelected"> {{ this.citySelected }} </span>
        </span>
        <span v-else></span>
        {{ this.citySelected }}
        <SelectArrow />
      </div>
      <div class="search__params-countries">
        <div
          v-if="locationData && this.locationBody"
          v-click-outside="locationOutside"
        >
          <div
            class="search__location-block"
            v-if="this.locCountry || this.locRegions || this.locCity"
          >
            <div v-if="this.locCountry">
              <div class="search__location-title">Ваше местоположение</div>
              <div class="search__location-body-country">
                <div
                  v-for="loc in this.locationData"
                  :key="loc.id"
                  class="search__location-item"
                  @click="getRegions(loc.code, loc.name)"
                >
                  <div>
                    <img :src="loc.flag" alt="" />
                  </div>
                  <div class="search__location-name">
                    {{ loc.name }}
                  </div>
                </div>
              </div>
            </div>
            <div class="search__location-body-country" v-if="this.locRegions">
              <div class="search__location-body-country-top-container">
                <div class="search__location-title">
                  {{ this.countrySelected }}
                  <span @click="this.setCountrySelected"
                    >Искать по всей стране</span
                  >
                </div>
                <div class="search__location-back" @click="getLocation">
                  Изменить страну
                </div>
              </div>
              <div class="search__regions-group">
                <div
                  v-for="region in this.regionsData"
                  :key="region.id"
                  class="search__regions"
                >
                  <div class="search__region-letter">
                    {{ region.letter }}
                  </div>
                  <div
                    class="search__city-name"
                    v-for="reg in region.group"
                    :key="reg.id"
                    @click="getCitys(reg.code, reg.name)"
                  >
                    {{ reg.name }}
                  </div>
                </div>
              </div>
            </div>
            <div class="search__location-body-country" v-if="this.locCity">
              <div class="search__location-body-country-top-container">
                <div class="search__location-title">
                  {{ this.regionsSelected }}
                </div>
                <div class="search__location-back" @click="getLocation">
                  Изменить страну
                </div>
              </div>
              <div class="search__regions-group">
                <div v-for="city in this.citysData" :key="city.id">
                  <div class="search__region-letter">
                    {{ city.letter }}
                  </div>
                  <div
                    v-for="item in city.group"
                    :key="item.id"
                    @click="getCity(item.name, item.id)"
                    class="search__city-name"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DefaultButton @click.native="goToSearchingResults" class="search__button">
      Искать
    </DefaultButton>
    <DefaultModal
      v-if="openModal"
      :on-close="() => (openModal = !openModal)"
      class="search__modal-category"
    >
      <p class="search__modal-category-title">Выбрать категорию</p>
      <div class="search__modal-category-body">
        <div
          v-for="category in this.category.data"
          :key="category.id"
          @click="setCategory(category.category_key, category.category_name)"
          class="search__modal-category-item"
        >
          <img :src="category.photo_url" :alt="category.photo_url" />
          {{ category.category_name }}
        </div>
      </div>
    </DefaultModal>
  </div>
</template>

<script>
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import DefaultModal from "@/components/molecules/DefaultModal.vue";
import InputText from "@/components/atoms/inputs/InputText.vue";
import SearchIcon from "@/assets/images/icons/search.svg?inline";
import SelectArrow from "@/assets/images/arrow/Alt_Arrow_Down.svg?inline";
import ClickOutside from "vue-click-outside";

export default {
  name: "Search",
  components: {
    DefaultButton,
    DefaultModal,
    InputText,
    SearchIcon,
    SelectArrow,
  },
  data() {
    return {
      openModal: false,
      openCategoryChildModal: false,
      category: {},
      categorySearch: "",
      categoryName: "Все категории",
      formDataToSend: {
        textSearch: "",
      },
      locationData: "",
      regionsData: "",
      locCountry: false,
      locRegions: false,
      locCity: false,
      countrySelected: "",
      regionsSelected: "",
      citySelected: "Выберите страну",
      citySelectedCode: "",
      citySelectedCodeCity: "",
      countryCode: "",
      citysData: {},
      locationBody: false,
    };
  },
  directives: {
    ClickOutside,
  },
  methods: {
    async goToSearchingResults() {
      const { formDataToSend } = this;
      let slashCategory = "/";
      let slagLocation = ",";
      if (
        this.categorySearch === "" ||
        this.citySelectedCode === "" ||
        this.citySelectedCodeCity === ""
      ) {
        slashCategory = "";
      }
      if (this.citySelectedCodeCity === "") {
        slagLocation = "";
      }
      this.$router.push(
        `/searching-results/${formDataToSend.textSearch}&${
          "location=" +
          this.citySelectedCode +
          slagLocation +
          "city=" +
          this.citySelectedCodeCity
        }&${"category=" + this.categorySearch}`
      );
    },
    openModalCategory() {
      this.openModal = true;
      this.getCategoty();
    },
    async getCategoty() {
      try {
        await this.$axios
          .get("/getCategoryList", {
            params: {
              type: "performer",
            },
          })
          .then((response) => {
            this.category = response.data;
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    setCategory(key, name) {
      this.categorySearch = key;

      this.openModal = false;
      this.categoryName = name;
    },

    async getLocation() {
      try {
        await this.$axios.get("/getCountries").then((res) => {
          this.locationData = res.data.data;
        });
        this.locCountry = true;
        this.locationBody = true;
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
    getCity(cityName, cityId) {
      this.citySelected = cityName;
      this.citySelectedCodeCity = cityId;
      this.locRegions = false;
      this.locCountry = false;
      this.locCity = false;
    },
    setCountrySelected() {
      this.locationBody = false;
      this.citySelected = this.countrySelected;
      this.citySelectedCode = this.countryCode;
    },
    locationOutside() {
      this.locationBody = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  position: relative;
  margin: 20px 0 0 0;
  &__button {
    background: $mainColor;
    width: 181px;
    height: 44px;

    &:hover {
      @include hover-main-color;
    }

    &:active {
      @include active-main-color;
    }
  }

  &__text {
    width: 100%;
    height: 44px;
    min-height: 44px !important;

    /deep/input {
      min-height: 44px !important;
      height: 44px !important;
      border: none !important;
      padding: 12px 0 12px 40px !important;
    }
  }

  &__search-icon {
    position: absolute;
    left: 10px;
    top: 13px;
  }

  &__params {
    position: absolute;
    width: 100%;
    display: flex;
  }

  &__params-category {
    position: absolute;
    height: 45px;
    right: 445px;

    span {
      display: inline-block;
      border-left: 1px solid #dadada;
      padding: 0 0 0 10px;
      height: 25px;
      position: relative;
      top: 7px;
    }

    svg {
      position: relative;
      left: 50px;
      position: relative;
      top: 5px;
    }

    &:hover {
      cursor: pointer;
      color: $mainColor;
    }
  }

  &__params-category-name {
    display: inline-block;
    position: relative;
    top: 5px;
  }

  &__location-back {
    color: $mainColor;
    padding-bottom: 20px;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  &__params-countries {
    position: absolute;
    width: 100%;
  }

  &__city-name {
    &:hover {
      cursor: pointer;
      color: $mainColor;
    }
  }

  &__params-location-title {
    height: 45px;
    position: absolute;
    right: 225px;

    span {
      display: inline-block;
      border-left: 1px solid #dadada;
      padding: 0 0 0 10px;
      height: 25px;
      position: relative;
      top: 7px;
    }

    svg {
      position: relative;
      left: 50px;
    }
    &:hover {
      cursor: pointer;
      color: $mainColor;
    }
  }
  &__modal-category {
    /deep/.modal-container {
      width: 768px;
    }
  }

  /deep/.text-default-input input {
    max-width: 100% !important;
  }

  &__modal-category-title {
    line-height: 21px;
    font-size: $g-font-third-size;
    padding-bottom: 25px;
  }

  &__modal-category-child-title {
    line-height: 21px;
    font-size: $g-font-third-size;
    padding-bottom: 15px;
  }

  &__modal-category-body {
    display: flex;
    flex-wrap: wrap;
  }

  &__modal-category-item {
    width: 115px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &:hover {
      cursor: pointer;
    }

    img {
      width: 68px;
      margin-bottom: 10px;
    }
  }

  &__modal-category-back {
    color: $mainColor;
    padding-bottom: 25px;

    &:hover {
      cursor: pointer;
    }
  }

  &__location-block {
    position: absolute;
    left: 0;
    top: 32px;
    background: $mainSecondColor;
    padding: 25px 20px;
    z-index: 2;
    width: 100%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
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
        cursor: pointer;
        color: $mainColor;
      }
    }
  }

  &__location-body-country-top-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
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
}
@media (max-width: $break-xlg) {
  .search {
    &__button {
      width: 109px;
    }
    &__params-location-title {
      padding-right: 0;
      padding-top: 2px;
      right: 110px;
      font-size: 10px;
      svg {
        left: 10px;
      }
    }
    &__params-category {
      padding-right: 0;
      right: 250px;
      font-size: 10px;

      span {
        display: inline-block;
        height: 25px;
        position: relative;
        top: 15px;
      }
      svg {
        left: 10px;
      }
    }
    textarea {
      &::placeholder {
        font-size: 12px;
      }
    }
    /deep/.close-modal-btn {
      top: 15px !important;
      right: 10px !important;
    }
  }
}
@media (max-width: $break-sm) {
  .search {
    margin-bottom: 60px;
    &__params {
      top: 100%;
      width: 100%;
      padding: 0;
      border-top: 1px solid #dadada;
      background: $mainSecondColor;
    }
    &__params-category,
    &__params-location-title {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 0;
      right: 0;
      width: 50%;
      font-size: 14px;
      svg {
        left: 0;
        margin-right: 10px;
      }

      span {
        top: 0;
      }
    }
    &__params-category {
      border: none;

      span {
        top: 0;
      }
    }
    &__location-block {
      top: 48px;
    }
    &__modal-category {
      /deep/.modal-container {
        padding: 19px 7px;
        width: 100%;
        height: 100vh;
        overflow-x: scroll;
      }
      /deep/.close-modal-btn {
        top: 15px !important;
        right: 10px !important;
      }

      &-item {
        width: 100%;
        display: flex;
        flex-direction: row;
        padding: 5px;

        img {
          width: 23px;
          margin: auto 15px auto 0;
        }
      }
    }
    &__location-item {
      width: 50%;
    }
    &__regions-group div {
      width: 50%;
    }
  }
}
</style>
