<template>
  <div class="history-section">
    <div class="history-section__title">Счет</div>
    <div class="history-section__nav-menu">
      <div class="history-section__nav-menu-history-block">
        История операций
      </div>
      <div>
        На вашем счету:
        <span class="history-section__nav-menu-balance"
          >{{ loggedInUser.balance }} ₽</span
        >
      </div>
      <div class="history-section__button">Пополнить счет</div>
    </div>
    <div class="history-section__nav-table">
      <div class="history-section__nav-table-namber">
        <div>№</div>
        <div>
          <SortArrow class="history-section__nav-sort-top" @click="sortIdTop" />
          <SortArrow class="history-section__nav-sort-bottom" @click="sortIdBottom" />
        </div>
      </div>
      <div class="history-section__nav-table-item">
        <div>Дата</div>
        <div>
          <SortArrow class="history-section__nav-sort-top" @click="sortCreatedAtTop" />
          <SortArrow class="history-section__nav-sort-bottom" @click="sortCreatedAtBottom" />
        </div>
      </div>
      <div class="history-section__nav-table-item">
        <div>Описание</div>
        <div>
          <SortArrow class="history-section__nav-sort-top" @click="sortTypeTop" />
          <SortArrow class="history-section__nav-sort-bottom" @click="sortTypeBottom" />
        </div>
      </div>
      <div class="history-section__nav-table-item">
        <div>Сумма, ₽</div>
        <div>
          <SortArrow class="history-section__nav-sort-top" @click="sortAmountTop" />
          <SortArrow class="history-section__nav-sort-bottom" @click="sortAmountBottom" />
        </div>
      </div>
    </div>
    <div class="history-section__nav-table-body" v-if="history.data">
      <div
        v-for="item in history.data"
        :key="item.id"
        class="history-section__table"
      >
        <div class="history-section__nav-table-namber">
          {{ item.id }}
        </div>
        <div>
          {{ item.created_at }}
        </div>
        <div>
          {{ item.type }}
        </div>
        <div>{{ item.amount }} ₽</div>
      </div>
    </div>
    <Pagination
      v-if="maxPage > 1"
      :max-page="maxPage"
      :page="page"
      :handle-page-change="handlePageChange"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import Pagination from "@/components/molecules/Pagination.vue";
import { DEFAULT_RESULTS_PER_PAGE } from "@/constants/pagination";
import SortArrow from "@/assets/images/arrow/sort.svg?inline";

export default {
  name: "History",
  data() {
    return {
      history: {},
      maxPage: null,
      page: 1,
      resultsPerPage: DEFAULT_RESULTS_PER_PAGE,
      sortType: 'ASC',
      sortColumnName: 'id'
    };
  },
  components: {
    DefaultButton,
    Pagination,
    SortArrow,
  },
  watch: {
    formDataToSend: {
      deep: true,
      immediate: true,
      handler() {
        this.page = 1;
        setTimeout(
          function () {
            this.getHistory();
          }.bind(this),
          1000
        );
      },
      page: {
        handler() {
          this.getHistory();
        },
      },
    },
  },
  mounted() {
    this.getHistory();
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
  methods: {
    async getHistory() {
      try {
        await this.$axios
          .get("/getTransactionBalanceForUser", {
            params: {
              page: this.page,
              sort_type: this.sortType,
              sort_column_name: this.sortColumnName,
            },
          })
          .then((res) => {
            this.history = res.data.data;
            this.maxPage = this.history.last_page;
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    sortIdTop() {
      this.sortType = 'DESC',
      this.sortColumnName = 'id',
      this.getHistory();
    },
    sortIdBottom() {
      this.sortType = 'ASC',
      this.sortColumnName = 'id',
      this.getHistory();
    },
    sortCreatedAtTop() {
      this.sortType = 'DESC',
      this.sortColumnName = 'created_at',
      this.getHistory();
    },
    sortCreatedAtBottom() {
      this.sortType = 'ASC',
      this.sortColumnName = 'created_at',
      this.getHistory();
    },
    sortTypeTop() {
      this.sortType = 'DESC',
      this.sortColumnName = 'type',
      this.getHistory();
    },
    sortTypeBottom() {
      this.sortType = 'ASC',
      this.sortColumnName = 'type',
      this.getHistory();
    },
    sortAmountTop() {
      this.sortType = 'DESC',
      this.sortColumnName = 'amount',
      this.getHistory();
    },
    sortAmountBottom() {
      this.sortType = 'ASC',
      this.sortColumnName = 'amount',
      this.getHistory();
    },
    handlePageChange(page) {
      this.page = page;
      this.$router.push({
        path: `/dashboard/history?${("page", page)}`,
      });
      this.getHistory({
        params: {
          page: this.page,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.history-section {
  min-height: 80vh;
  padding: 30px 0 30px 30px;
  width: 80%;

  &__title {
    font-size: $g-second-title-size;
    padding-bottom: 15px;
  }

  &__nav-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  &__nav-table {
    display: flex;
  }

  &__nav-table {
    display: grid;
    grid-template-columns: 1fr 1fr 3fr 1fr;
    background: #d4e3f6;
    padding: 15px 25px;
  }

  &__table {
    display: grid;
    grid-template-columns: 1fr 1fr 3fr 1fr;
    padding: 15px 25px;
    border-bottom: 1px solid $mainFourthColor;
  }

  &__nav-table-namber {
    display: flex;
    align-items: center;

    div {
      display: flex;
      justify-content: center;
      flex-direction: column;
    }

    svg {
      margin-left: 10px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  &__nav-table-item {
    display: flex;
    align-items: center;

    div {
      display: flex;
      justify-content: center;
      flex-direction: column;
    }

    svg {
      margin-left: 10px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 166px;
    height: 44px;
    background: $mainColor;
    color: $mainSecondColor;
  }

  &__nav-menu-history-block {
    width: 50%;
  }

  &__nav-menu-balance {
    font-weight: bold;
  }

  &__nav-sort-bottom {
    transform: rotate(180deg);
  }
}

@media (max-width: $break-xlg) {
  .history-section {
    width: 100%;
  }
}

@media (max-width: $break-sm) {
  .history-section {
    padding: 20px 7px;

    &__nav-menu {
      flex-wrap: wrap;
    }

    &__nav-menu-history-block {
      padding-top: 20px;
      order: 1;
    }

    &__nav-table {
      padding: 15px 7px;
      grid-template-columns: 0.7fr 1fr 2fr 1.5fr;
    }

    &__table {
      padding: 15px 7px;
      grid-template-columns: 0.7fr 1fr 2fr 1.5fr;

      div {
        padding-right: 5px;
      }
    }

    &__nav-table-namber {
      align-items: flex-start;
    }
  }
}
</style>
