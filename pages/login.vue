<template>
  <div class="login" v-if="!this.isAuthenticated">
    <div class="login__title">Вход</div>
    <LogInForm />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LogInForm from "@/components/forms/LogInForm";
import modalsLogic from "@/helpers/constants/store/modalsLogic";
import authModule from "@/helpers/constants/store/authModule";

export default {
  name: "Login",
  layout: "index",
  components: {
    LogInForm,
    authModule,
    modalsLogic,
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  watch: {
    isAuthenticated: {
      deep: true,
      immediate: true,
      handler() {
        if (this.isAuthenticated) {
          this.$router.push('/dashboard/profile')
        }
      },
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 75px;
  min-height: 76vh;

  &__title {
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: #333333;
  }
}
@media (max-width: $break-sm) {
  .login {
    min-height: 58vh;
    padding-top: 25px;
    padding-bottom: 10px;
  }
}
</style>
