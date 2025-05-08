<template>
  <div class="favorites">
    <div class="favorites__title-block">
      <div class="favorites__header-block">
        <div class="favorites__title">Избранные</div>
<!--        <div @click="deleteAllModalOpen" class="favorites__delete-all">Удалить все</div>-->
      </div>
      <div class="favorites__nav-block">
        <div class="favorites__user-nav-block">
          <div
            class="favorites__performer"
            :class="{ performer: performer }"
            @click="performerActive"
          >
            Исполнители
          </div>
          <div
            class="favorites__employer"
            :class="{ employer: employer }"
            @click="employerActive"
          >
            Рекламодатели
          </div>
        </div>
<!--        <div>-->
<!--          <div class="favorites__search">-->
<!--            <div class="favorites__search-block">-->
<!--              <input type="text" placeholder="Поиск" v-model="searchData" />-->
<!--              <Search />-->
<!--            </div>-->
<!--            <DefaultButton-->
<!--              class="favorites__search-button"-->
<!--              @click.native="searchFavorites"-->
<!--            >-->
<!--              Искать-->
<!--            </DefaultButton>-->
<!--          </div>-->
<!--        </div>-->
      </div>
      <div v-if="this.favoriteList.data" class="favorites__product-block new_world">
        <div
          v-for="ads in this.favoriteList.data"
          :key="ads.id"
          class="favorites__product"
        >
          <SmallCard
            :ads-data="ads"
            :delete-advertisements-favorite="deleteAdvertisementsFavorite"
          />
        </div>
      </div>
    </div>
    <DefaultModal
      v-if="deleteFavorite"
      :on-close="() => (deleteFavorite = !deleteFavorite)"
    >
      <div class="favorites__modal-container">
        <div class="favorites__modal-text">Вы уверены, что хотите удалить все избранные объявления?</div>
        <div class="favorites__modal-group-btn">
          <div @click="() => (deleteFavorite = !deleteFavorite)" class="favorites__modal-cancel">Отмена</div>
          <DefaultButton
            class="favorites__button"
            @click.native="deleteAllAdvertisementsFavorite()"
            >Да</DefaultButton
          >
        </div>
      </div>
    </DefaultModal>
  </div>
</template>

<script>
import SmallCard from "@/components/molecules/SmallCard.vue";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import Search from "@/assets/images/icons/search.svg?inline";
import DefaultModal from "@/components/molecules/DefaultModal.vue";

export default {
  name: "Favorites",
  data() {
    return {
      favoriteList: {},
      performer: true,
      employer: false,
      userType: "performer",
      searchData: "",
      deleteFavorite: false,
    };
  },
  components: {
    SmallCard,
    DefaultButton,
    Search,
    DefaultModal,
  },
  mounted() {
    this.getAdvertisementFavoriteList();
  },
  methods: {
    async getAdvertisementFavoriteList() {
      try {
        await this.$axios
          .get("/getAdvertisementFavoriteList", {
            params: {
              advertisement_type: this.userType,
              search: this.searchData,
            },
          })
          .then((res) => {
            this.favoriteList = res.data.data;
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    performerActive() {
      this.userType = "performer";
      this.getAdvertisementFavoriteList({
        params: {
          advertisement_type: this.userType,
          search: this.searchData,
        },
      });
      this.performer = true;
      this.employer = false;
    },
    employerActive() {
      this.userType = "employer";
      this.getAdvertisementFavoriteList({
        params: {
          advertisement_type: this.userType,
          search: this.searchData,
        },
      });
      this.performer = false;
      this.employer = true;
    },
    searchFavorites() {
      this.getAdvertisementFavoriteList({
        params: {
          advertisement_type: this.userType,
          search: this.searchData,
        },
      });
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
        this.getAdvertisementFavoriteList();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    deleteAllModalOpen() {
      this.deleteFavorite = true;
    },
    async deleteAllAdvertisementsFavorite() {
      let advertisementIds = [];
      const favorites = this.favoriteList.data;
      for (let i = 0; i < favorites.length; i++) {
        advertisementIds.push(favorites[i].advertisement_id)
      }
      try {
        await this.$axios.delete("/deleteAdvertisementsFavorite", {
          params: {
            advertisement_ids: advertisementIds,
          },
        });
        this.getAdvertisementFavoriteList();
        this.deleteFavorite = false;
      } catch (e) {
        this.error = e.response.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.favorites {
  padding: 30px 0 30px 30px;
  width: 80%;

  &__title {
    font-size: $g-second-title-size;
  }

  &__delete-all {
    color: $mainColor;
    cursor: pointer;
  }

  &__header-block {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 25px;
  }

  &__modal-cancel {
    margin-right: 50px;
    color: $mainColor;
    cursor: pointer;
    font-size: 16px;
  }

  &__modal-text {
    padding-bottom: 25px;
    font-size: 16px;
  }

  &__modal-container {
    padding: 40px 10px;
  }

  &__modal-group-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__button {
    background: $mainColor;
    width: 146px;
  }

  &__product-block {
    display: flex;
    flex-wrap: wrap;
  }

  &__product {
    width: 33.3%;
  }

  .performer,
  .employer {
    background: #d4e3f6;
    padding: 10px 15px;
    color: $mainThirdColor;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      cursor: pointer;
    }
  }

  &__nav-block {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  &__user-nav-block {
    display: flex;
  }

  &__employer,
  &__performer {
    color: $mainColor;
    padding: 15px 15px;

    &:hover {
      cursor: pointer;
    }
  }

  &__search {
    width: 265px;
    display: flex;
    justify-content: flex-end;
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
  /deep/.small-card__star-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media (max-width: $break-xlg) {
  .favorites {
    width: 100%;
    padding: 25px 5px;

    /deep/.small-card {
      margin-bottom: 11px;
    }
  }
}

@media (max-width: $break-sm) {
  .favorites {
    &__adv {
      width: 50%;
      padding-bottom: 10px;
    }
    &__nav-block {
      flex-direction: column;
    }
    &__user-nav-block {
      width: 100%;
      padding-bottom: 20px;

      div {
        width: 50%;
        text-align: center;
      }
    }
    &__search {
      width: 100%;
    }
    &__search-block {
      width: 100%;

      input {
        width: 100%;
      }
    }
    /deep/.small-card {
      width: 95%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    /deep/.small-card__image-conatiner {
      height: 115px;
      margin: 0;
    }
    /deep/.small-card__star-wrap {
      height: 30px;
      width: 30px;
      top: 10px;
      right: 10px;
      padding: 0;
      display: flex;

      svg {
        margin: auto;
      }
    }
    /deep/.small-card__title {
      text-align: left;
    }
    /deep/.small-card__characteristics-container {
      display: none;
    }
    /deep/.small-card__location {
      margin-top: auto;
    }
    /deep/.small-card__body-block {
      flex-grow: 1;
      padding-bottom: 10px;
    }
  }
}
</style>
