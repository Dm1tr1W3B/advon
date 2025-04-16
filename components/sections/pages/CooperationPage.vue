<template>
  <div class="cooperation-page l-wrap">
    <div class="cooperation-page__title">Разместить рекламу на advon</div>
    <div class="cooperation-page__text">
      Lsed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
      sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum. Lsed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex Lsed do eiusmod tempor.
    </div>
    <ContactForm />
  </div>
</template>

<script>
import ContactForm from '@/components/forms/ContactForm.vue'

export default {
  name: "CooperationPage",
  data() {
    return {};
  },
  components: {
    ContactForm
  },
  methods: {},
};
</script>

<style lang="scss">
.cooperation-page {
  margin: 0 auto;
  min-height: 80vh;

  &__title {
    font-size: $g-second-title-size;
    padding: 10px 0 20px 0;
  }

  &__text {
    line-height: 20px;
    padding-bottom: 30px;
    width: 75%;
  }
}
</style>
