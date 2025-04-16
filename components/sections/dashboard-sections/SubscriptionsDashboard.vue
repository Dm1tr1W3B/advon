<template>
  <div class="subscriptions-dashboard">
    <div class="subscriptions-dashboard__title-block">
      <div class="subscriptions-dashboard__title-header">
        <div class="subscriptions-dashboard__title">Подписки</div>
        <div
          v-if="$device.isMobile"
          class="subscriptions-dashboard__unsubscribe-all"
          @click="deleteAllSubscription"
        >
          Отписаться от всех
        </div>
      </div>
      <div class="subscriptions-dashboard__nav-menu-wrap">
        <div class="subscriptions-dashboard__nav-menu">
          <div
            class="subscriptions-dashboard__nav-item"
            :class="{ activePerson: activePrivate }"
            @click="getSubscriptionListPrivetePerson"
          >
            Частные лица
          </div>
          <div
            class="subscriptions-dashboard__nav-item"
            :class="{ activePerson: activeCompany }"
            @click="getSubscriptionListCompany"
          >
            Компании
          </div>
        </div>
        <div
          v-if="!$device.isMobile"
          class="subscriptions-dashboard__unsubscribe-all"
          @click="deleteAllModalOpen"
        >
          Отписаться от всех
        </div>
      </div>
      <div
        class="subscriptions-dashboard__subscription-block"
        v-for="subscription in this.subscriptionList"
        :key="subscription.id"
      >
        <div
          v-if="$device.isMobile"
          class="subscriptions-dashboard__image-block"
        >
          <img :src="subscription.avatar" alt="" />
          <div class="subscriptions-dashboard__image-block_name">
            {{ subscription.name }}
          </div>
        </div>
        <div
          class="subscriptions-dashboard__subscription-title-block"
          @click="goToUser(subscription.id)"
        >
          <img
            v-if="!$device.isMobile"
            :src="subscription.avatar"
            :alt="subscription.avatar"
          />
          <div>
            <div v-if="!$device.isMobile">
              {{ subscription.name }}
            </div>
            <div class="subscriptions-dashboard__text">
              {{ subscription.number_advertisement }}
              обьявлений
            </div>
            <div class="subscriptions-dashboard__text">
              <Location />
              Москва
            </div>
          </div>
          <div class="subscriptions-dashboard__social">
            <div>
              {{ subscription.phone }}
            </div>
            <div>
              <div
                class="subscriptions-dashboard__social-block"
                v-for="contact in subscription.contacts"
                :key="contact.id"
              >
                <img :src="contact.photo_url" alt="" />
                {{ contact.values }}
              </div>
            </div>
          </div>
        </div>
        <DefaultButton
          class="subscriptions-dashboard__button"
          @click.native="deleteSubscription(subscription.subscription_id)"
          >Отписаться</DefaultButton
        >
      </div>
    </div>
    <DefaultModal
      v-if="deleteSubscription"
      :on-close="() => (deleteSubscription = !deleteSubscription)"
    >
      <div class="subscriptions-dashboard__modal-container">
        <div class="subscriptions-dashboard__modal-text">Вы уверены, что хотите отписаться от всех?</div>
        <div class="subscriptions-dashboard__modal-group-btn">
          <div @click="() => (deleteSubscription = !deleteSubscription)" class="subscriptions-dashboard__modal-cancel">Отмена</div>
          <DefaultButton
            class="subscriptions-dashboard__button"
            @click.native="deleteAllSubscription()"
            >Да</DefaultButton
          >
        </div>
      </div>
    </DefaultModal>
  </div>
</template>

<script>
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import Location from "@/assets/images/icons/location.svg?inline";
import DefaultModal from "@/components/molecules/DefaultModal.vue";

export default {
  name: "SubscriptionsDashboard",
  data() {
    return {
      activeCompany: false,
      activePrivate: true,
      subscriptionList: {},
      typePersone: "private_person",
      deleteSubscription: false,
    };
  },
  components: {
    DefaultButton,
    Location,
    DefaultModal,
  },
  mounted() {
    this.getSubscriptionList();
  },
  methods: {
    async getSubscriptionList() {
      try {
        await this.$axios
          .get("/getSubscriptionList", {
            params: {
              person_type: this.typePersone,
            },
          })
          .then((res) => {
            this.subscriptionList = res.data.data;
          });
      } catch (e) {
        this.error = e.response;
      }
    },
    getSubscriptionListCompany() {
      this.typePersone = "company";
      this.getSubscriptionList({
        params: {
          person_type: this.typePersone,
        },
      });
      this.activeCompany = true;
      this.activePrivate = false;
    },
    getSubscriptionListPrivetePerson() {
      this.typePersone = "private_person";
      this.getSubscriptionList({
        params: {
          person_type: this.typePersone,
        },
      });
      this.activeCompany = false;
      this.activePrivate = true;
    },
    async deleteSubscription(id) {
      let subscriptionId = [];
      subscriptionId.push(id);
      try {
        await this.$axios.delete("/deleteSubscription", {
          params: {
            subscription_ids: subscriptionId,
          },
        });
        this.getSubscriptionList();
      } catch (e) {
        this.error = e.response;
      }
    },
    deleteAllModalOpen() {
      this.deleteSubscription = true;
    },
    async deleteAllSubscription() {
      let subscriptionsId = [];
      for (let i = 0; i < this.subscriptionList.length; i++) {
        subscriptionsId.push(this.subscriptionList[i].subscription_id);
      }
      try {
        await this.$axios.delete("/deleteSubscription", {
          params: {
            subscription_ids: subscriptionsId,
          },
        });
        this.getSubscriptionList();
        this.deleteSubscription = false;
      } catch (e) {
        this.error = e.response;
      }
    },
    goToUser(id) {
      if (this.typePersone === "private_person") {
        this.$router.push(`/user-detail/${id}`);
      } else this.$router.push(`/company-detail/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.subscriptions-dashboard {
  padding: 30px 0 30px 30px;
  width: 80%;

  &__title {
    font-size: $g-second-title-size;
    padding-bottom: 25px;
  }

  .activePerson {
    background: #d4e3f6;
    color: $mainThirdColor;
  }

  &__nav-menu {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
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

  &__nav-menu-wrap {
    display: flex;
    justify-content: space-between;
  }

  &__nav-item {
    padding: 15px 30px;
    color: $mainColor;

    &:hover {
      cursor: pointer;
    }
  }

  &__subscription-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $mainSecondColor;
    padding: 30px 20px;
    margin-bottom: 20px;

    img {
      width: 44px;
      height: 44px;
      margin-right: 20px;
    }
  }

  &__subscription-title-block {
    display: flex;

    &:hover {
      cursor: pointer;
    }
  }

  &__social-block {
    display: flex;
    align-items: center;
    padding: 10px 0;

    img {
      width: 20px;
      height: 20px;
    }
  }

  &__social {
    padding-left: 80px;
  }

  &__button {
    background: $mainColor;
    width: 146px;
  }

  &__text {
    display: flex;
    align-items: center;
    font-size: $g-mobile-size;
    color: $mainFifthColor;
    padding-top: 5px;

    svg {
      margin-right: 5px;
    }
  }

  &__unsubscribe-all {
    color: $mainColor;

    &:hover {
      cursor: pointer;
    }
  }

  &__image-block {
    display: flex;
  }
}

@media (max-width: $break-xlg) {
  .subscriptions-dashboard {
    width: 100%;
    padding: 25px 5px;

    &__subscription-title-block {
      display: flex;

      img {
        margin: auto 20px auto 0;
      }
    }

    &__unsubscribe-all {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }
  }
}

@media (max-width: $break-sm) {
  .subscriptions-dashboard {
    &__title-header {
      display: flex;
      justify-content: space-between;
    }

    &__title {
      padding-bottom: 15px;
    }

    &__unsubscribe-all {
      padding-bottom: 15px;
    }

    &__nav-menu {
      width: 100%;
    }

    &__nav-item {
      width: 50%;
      text-align: center;
    }

    &__image-block {
      width: 100%;
    }

    &__subscription-block {
      flex-wrap: wrap;
      padding: 10px;
    }

    &__subscription-title-block {
      width: 50%;
      flex-direction: column;
      padding-top: 15px;
    }

    &__social {
      padding-left: 0;
      padding-top: 5px;
    }

    &__image-block_name {
      display: flex;
      align-items: center;
    }
  }
}
</style>
