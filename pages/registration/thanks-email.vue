<template>
  <div class="thanks-email l-wrap">
    <RegistrationSteps />
    <div class="thanks-email__container">
      <Verification class="thanks-email__icon" />
      <div class="thanks-email__text">
        Спасибо за подтверждение email
      </div>
    </div>
  </div>
</template>

<script>
import RegistrationSteps from '@/components/molecules/RegistrationSteps.vue';
import Verification from '@/assets/images/good-verified.svg?inline';
export default {
  name: 'ThanksEmail',
  components: {
    RegistrationSteps,
    Verification
  }
}
</script>

<style lang="scss" scoped>
  .thanks-email {
    min-height: 75vh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 75px;

    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px 60px;
      margin-top: 20px;
      background: #EEEEEE;
    }

    &__text {
      padding-top: 35px;
      font-weight: 500;
      font-size: 24px;
    }

    /deep/.registration-steps__step-2 {
      background: #3B96BC;
    }

    /deep/.registration-steps__step-3 {
      background: #2677EB;
    }
  }

  @media (max-width: $break-xlg) {
    .thanks-email {
      min-height: 68vh;
    }
  }

  @media (max-width: $break-sm) {
    .thanks-email {
      min-height: 53vh;
      padding: 0 7px;

      &__container {
        margin-top: 70px;
        padding: 20px;
      }

      &__text {
        text-align: center;
      }
    }
  }
</style>
