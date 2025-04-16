<template>
  <div class="registration-steps__step-block">
    <div class="registration-steps__step">
        1
      </div>
      <div class="registration-steps__dot"></div>
      <div class="registration-steps__dot"></div>
      <div class="registration-steps__dot"></div>
      <div class="registration-steps__step-2">
        2
      </div>
      <div class="registration-steps__dot"></div>
      <div class="registration-steps__dot"></div>
      <div class="registration-steps__dot"></div>
      <div class="registration-steps__step-3">
        3
      </div>
  </div>
</template>

<script>
export default {
  name: 'RegistrationSteps'
}
</script>

<style lang="scss" scoped>
.registration-steps {
  &__step-block {
      display: flex;
      align-items: center;
      margin-top: 30px;
      position: absolute;
      top: 0;
      right: 0;
    }

    &__step {
      border-radius: 50%;
      padding: 5px 10px;
      background: #50B889;
      color: white;
    }
    &__step-2, &__step-3 {
      border-radius: 50%;
      padding: 5px 10px;
      background: #D4E3F6;
      color: white;
    }

    &__dot {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #D4E3F6;
      margin: 0 5px;
    }
}
@media (max-width: $break-sm) {
  .registration-steps {
    &__step-block {
      width: 100%;
      justify-content: center;
      margin-top: 20px;
    }
  }
}
</style>
