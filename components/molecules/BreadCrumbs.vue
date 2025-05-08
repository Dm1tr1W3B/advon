<template>
  <div class="bread-crumbs">
    <div class="bread-crumbs__container">
      <p>
        <span class="bread-crumbs__name-route" @click="$router.push('/')"
          >Главная</span
        >
        <template v-if="secondItemName">
          <span> > </span>
          <span class="bread-crumbs__name-route" @click="$router.push(secondItemLink)">
              {{ secondItemName }}
          </span>
        </template>
        <template v-if="triggerStorage">
          <span> > </span>
          <span class="bread-crumbs__name-route" @click="$router.push(secondItemStorageLink)">
              {{ secondItemStorageName }}
          </span>
        </template>
        <template v-if="lastItemName">
          <span> > </span>
          <span class="bread-crumbs__name-route">
            {{ lastItemName }}
          </span>
        </template>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BreadCrumbs",
  components: {},
  data() {
    return {
      triggerStorage: false,
      secondItemStorageName: "",
      secondItemStorageLink: "",
    }
  },
  props: {
    secondItemName: {
      type: [String, Boolean],
      default: null,
    },
    secondItemLink: {
      type: String,
      default: "",
    },
    lastItemName: {
      type: [String, Boolean],
      default: null,
    },
    lastItemLink: {
      type: String,
      default: "",
    },
    secondItemStorage: {
      type: Boolean,
      default: null,
    }
  },
  methods: {
    handleGetBreadCrambs () {
      if(this.secondItemStorage) {
        const title = localStorage.getItem('BreadCrumbsTitle')
        const link = localStorage.getItem('BreadCrumbsLink')

        if (title != null && title != '' && link != null && link != '') {
          this.triggerStorage = true;
          this.secondItemStorageName = title;
          this.secondItemStorageLink = link;
        }
      }
    }
  },
  mounted() {
    this.handleGetBreadCrambs();
  }
};
</script>

<style lang="scss" scoped>
.bread-crumbs {
  &__container {
    display: inline-block;
    padding: 15px 0 10px 0;
  }
  &__name-route {
    color: $mainFifthColor;
    cursor: pointer;

    &:hover {
      color: $mainColor;
    }
  }
}
</style>
