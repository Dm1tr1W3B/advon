<template>
  <div class="restore-msg">
    <div class="restore-msg__container">
      <h1>Восстановить пароль</h1>
      <p>
        На ваш адрес было отправлено письмо со ссылкой для подтверждения сброса пароля.
        Пожалуйста, перейдите по ссылке в письме и следуйте инструкциям
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RestoreMsg"
}
</script>

<style lang="scss" scoped>
  .restore-msg {
    min-height: 76vh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 77px;

    &__container {
      max-width: 590px;

      h1 {
        text-align: center;
        margin-bottom: 20px;
      }

      p {
        text-align: center;
      }
    }
  }

  @media (max-width: $break-xlg) {
    .restore-msg {
      min-height: 68vh;
    }
  }

  @media (max-width: $break-sm) {
    .restore-msg {
      padding-top: 40px;
      min-height: 53vh;
    }
  }
</style>
