<template>
  <div class="pagination">
    <div class="pagination__container" v-if="pages.length > 1">
      <div
        class="pagination__prev-page"
        v-if="page !== 1"
        @click="handlePageChange(page - 1)"
      >
        <div></div>
      </div>
      <span
        v-for="currentPage in pages"
        :key="currentPage"
        :class="[currentPage === page && 'active']"
        @click="handlePageChange(currentPage)"
      >
        {{ currentPage }}
      </span>
      <div
        class="pagination__next-page"
        v-if="page !== maxPage"
        @click="handlePageChange(page + 1)"
      >
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    maxPage: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 0,
    },
    handlePageChange: {
      type: Function,
      default() {
        return [];
      },
    },
  },
  computed: {
    pages() {
      const pagesArray = [
        this.page != 2 && this.page != 1 ? this.page - 2 : null,
        this.page != 1 ? this.page - 1 : null,
        this.page,
        this.page != this.maxPage ? this.page + 1 : null,
        this.page != this.maxPage - 1 && this.page != this.maxPage ? this.page + 2 : null,
      ];
      return pagesArray;
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  padding: 50px 0 100px 0;

  &__container {
    display: flex;
    align-items: center;
  }

  span {
    margin: 0 10px;
    cursor: pointer;
  }

  span.active {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background: $mainColor;
    border-radius: 100%;
    color: $mainSecondColor;
  }

  &__prev-page {
    display: inline-block;
    opacity: 0.85;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    :hover {
      cursor: pointer;
      box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
    }
    div {
      background-image: url("@/assets/images/icons/slick-prev.png");
      height: 30px;
      border-radius: 100%;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
  &__next-page {
    display: inline-block;
    opacity: 0.85;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    margin-left: 10px;
    :hover {
      cursor: pointer;
      box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
    }
    div {
      background-image: url("@/assets/images/icons/slick-next.png");
      height: 30px;
      border-radius: 100%;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
}

@media (max-width: $break-xlg) {
  .pagination {
    padding: 38px 0 50px;
  }
}

@media (max-width: $break-sm) {
  .pagination {
    padding: 38px 0 30px;
  }
}
</style>
