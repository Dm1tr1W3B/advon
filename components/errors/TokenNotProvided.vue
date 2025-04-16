<template>
  <div v-if="errorComment">
    <div
      class="token-not-provided"
      v-if="errorComment.message == 'Token not provided' || errorComment.message == 'Token has expired'"
    >
      <div>Это действие доступно только для авторизированных пользователей</div>
      <div>
        <NuxtLink to="/login"> Войти</NuxtLink>
        <span>|</span>
        <NuxtLink to="/registration"> Зарегистрироваться </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TokenNotProvided",
  props: {
    errorComment: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style lang="scss" scoped>
.token-not-provided {
  color: #ff0303;
  border: 1px solid $mainFourthColor;
  padding: 10px;
  display: inline-block;

  a {
    color: $mainColor;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    color: $mainColor;
  }
}
</style>