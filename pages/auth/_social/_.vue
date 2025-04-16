<template>
  <div class="auth l-wrap"></div>
</template>

<script>
export default {
  name: "Auth",
  data() {
    return {
      socialData: {},
      socialConnect: {},
    };
  },
  components: {},
  mounted() {
    this.getSocial();
  },
  methods: {
    async getSocial() {
      try {
        if (JSON.parse(localStorage.getItem("connect")) === 'true') {
          await this.$axios
            .post(
              `/social/${this.$route.params.social}/connect?code=${this.$route.query.code}`
            )
            .then((res) => {
              this.socialConnect = res.data.data;
            });
          this.$router.push("/dashboard/customization");
        } else {
          await this.$axios
            .post(
              `/auth/${this.$route.params.social}/callback?code=${this.$route.query.code}`
            )
            .then((res) => {
              this.socialData = res.data.data;
            });
          if (this.socialData.need_email === false) {
            this.login();
          } else {
            localStorage.setItem(
              "auth._token.local",
              "Bearer " + this.socialData.token
            );
            this.goToCreateEmail();
          }
        }
      } catch (e) {
        this.error = e.response;
      }
    },
    async getProfile() {
      let token = {
        headers: {
          Authorization: "Bearer " + this.socialData.token,
        },
      };
      try {
        await this.$axios.get("/getProfile", token).then((res) => {
          this.myProfileData = res.data.data;
        });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    goToCreateEmail() {
      this.$router.push("/create-email");
    },
    async login() {
      let token = {
        headers: {
          Authorization: "Bearer " + this.socialData.token,
        },
      };
      try {
        await this.$auth.loginWith("local", token);

        this.$router.push("/dashboard/profile");
      } catch (e) {
        this.error = e.response.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.auth {
  min-height: 80vh;
}
</style>
