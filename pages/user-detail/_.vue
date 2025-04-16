<template>
  <div class="user-detail l-wrap">
    <div>
      <UserDetailList />
    </div>
  </div>
</template>

<script>
import UserDetailList from '@/components/sections/user-sections/UserDetailList.vue'

export default {
  name: "UserDetail",
  data() {
    return {
    };
  },
  components: {
    UserDetailList,
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.user-detail {
}
</style>
