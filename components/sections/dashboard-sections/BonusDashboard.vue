<template>
  <div class="bonus-dashboard">
    <div class="bonus-dashboard__title-block">
      <div class="bonus-dashboard__title">Бонусы</div>
      <div class="bonus-dashboard__text">
        Вы можете пригласить друзей и получить бонусы, которые можно обменять на деньги.
      </div>
      <div class="bonus-dashboard__text">
        За каждого приглашенного человека вы получаете 200 бонусов
      </div>
    </div>
    <div class="bonus-dashboard__register-ref">
      По вашей ссылке зарегистрировалось: {{ this.link.referrals_count }} человек
      <!-- В наличии <span>{{this.link.bonus_balance}}</span> бонусов -->
    </div>
    <div class="bonus-dashboard__title">Открытка</div>
    <div class="bonus-dashboard__text">
      Выберите открытку, скопируйте Вашу ссылку и отправьте друзьям:
    </div>
    <div class="bonus-dashboard__wrap">
      <div
        class="bonus-dashboard__container"
        v-for="category in this.mainCategory"
        :key="category.id"
      >
        <div
          class="bonus-dashboard__main-categiry"
          :class="{ categoryRef: categorySelected }"
        >
          <img :src="category.photo_url" :alt="category.photo_url" />
          <span class="bonus-dashboard__main-categiry_text home__main-category_text">{{
            category.category_name
          }}</span>
        </div>
      </div>
    </div>
    <!-- <div>Ваша открытка</div> -->
    <div>
      <div class="bonus-dashboard__ref-title">Реферальная ссылка</div>
      <div class="copy_section">
        <input
          type="text"
          :value="`https://advon.test.ut.in.ua/registration/?ref=${this.link.ref_code}`"
          id="myInput"
          class="bonus-dashboard__input-ref"
        />
        <DefaultButton @click.native="copyRef" class="bonus-dashboard__button">
          <Copy />
        </DefaultButton>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import InputText from "@/components/atoms/inputs/InputText.vue";
import Copy from "@/assets/images/icons/Copy.svg?inline";

export default {
  name: "BonusDashboard",
  data() {
    return {
      mainCategory: {},
      link: "",
      categorySelected: false,
    };
  },
  components: {
    DefaultButton,
    InputText,
    Copy,
  },
  mounted() {
    this.getCategory();
    this.getRef();
  },
  methods: {
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
    async getRef() {
      try {
        await this.$axios.get("/getRef").then((res) => {
          this.link = res.data.data;
        });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    copyRef() {
      var copyText = document.getElementById("myInput");
      copyText.select();
      document.execCommand("copy");
    },
  },
};
</script>

<style lang="scss" scoped>
.bonus-dashboard {
  padding: 30px 0 0 30px;
  width: 80%;

  &__title {
    font-size: $g-second-title-size;
    padding-bottom: 25px;
  }

  &__text {
    line-height: 16px;
    padding: 0 0 15px 0;
  }

  &__category-title {
    padding: 30px 0 25px 0;
  }

  &__wrap {
    display: flex;
    flex-wrap: wrap;
  }

  &__main-categiry {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__container {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px 40px 0;
  }

  &__main-categiry_text {
    text-align: center;
    padding-top: 10px;
  }

  &__button {
    background: $mainColor;
    margin-top: 20px;
    width: 166px;
    margin-bottom: 150px;
  }

  &__input-ref {
    background: $mainSecondColor;
    border: 1px solid $mainFourthColor;
    box-sizing: border-box;
    width: 362px;
    height: 44px;
    padding-left: 10px;
    color: $mainFifthColor;
  }

  &__ref-title {
    font-size: $g-font-third-size;
    padding-bottom: 20px;
    padding-top: 30px;
  }

  &__register-ref {
    padding-bottom: 20px;
    span {
      color: #50b889;
    }
  }
}

@media (max-width: $break-xlg) {
  .bonus-dashboard {
    width: 100%;
    padding: 25px 5px;
  }
}

@media (max-width: $break-sm) {
  .bonus-dashboard {
    &__wrap {
      justify-content: space-between;
    }

    &__container {
      width: 32%;
      padding-right: 0;
      padding-bottom: 15px;
    }

    &__main-categiry {
      width: 100%;

      img {
        width: 100%;
        object-fit: contain;
      }
    }

    &__ref-title {
      padding-top: 25px;
    }

    &__button {
      margin-bottom: 40px;
    }

    &__category-title {
      padding-top: 28px;
    }
  }
}
</style>
