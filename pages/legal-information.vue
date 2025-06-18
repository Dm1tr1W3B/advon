<template>
  <div class="legal-information container">
    <LegalInformationPage />
  </div>
</template>

<script>
import LegalInformationPage from '@/components/sections/pages/LegalInformationPage.vue';

export default {
  name: 'legalInformation',
  data() {
    return {
    }
  },
  components: {
    LegalInformationPage,
  },
  methods: {
  }
}
</script>

<style lang="scss">
.legal-information {

}
</style>
