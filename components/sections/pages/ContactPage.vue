<template>
  <div class="contact-page l-wrap">
    <Search />
    <h1 class="contact-page__title">Контакты</h1>
    <ContactForm />
    <div v-if="$device.isDesktop" class="contact-page__social">
      <div class="contact-page__social-title">Мы в соцсетях</div>
      <SocialLink />
    </div>
  </div>
</template>

<script>
import Search from "@/components/molecules/Search.vue";
import SocialLink from "@/components/molecules/SocialLink.vue"
import ContactForm from "@/components/forms/ContactForm.vue";

export default {
  name: 'ContactPage',
  data() {
    return {
    }
  },
  components: {
    Search,
    ContactForm,
    SocialLink,
  },
  methods: {
  }
}
</script>

<style lang="scss">
.contact-page {
  margin: 0 auto;
  min-height: 74vh;

  &__title {
    padding: 12px 0 24px;
    font-weight: 400;
    font-size: 24px;
  }

  &__social {
    padding: 47px 0 100px;
  }

  &__social-title {
    font-size: 18px;
    padding-bottom: 16px;
  }
}

@media (max-width: $break-xlg) {
  .contact-page {
    padding: 0 5px;
    min-height: 66vh;
  }
}

@media (max-width: $break-sm) {
  .contact-page {
    padding: 0;

    &__title {
      padding: 13px 0 20px 7px;
    }
  }
}

</style>
