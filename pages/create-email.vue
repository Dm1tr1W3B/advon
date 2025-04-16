<template>
  <div class="create-email l-wrap">
    <div class="create-email__title">Создать email</div>
    <CreateEmailForm />
  </div>
</template>

<script>
import CreateEmailForm from "@/components/forms/CreateEmailForm";

export default {
  data() {
    return {};
  },

  components: {
    CreateEmailForm,
  },
  methods: {},
}; 
</script>

<style lang="scss">
.create-email {
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
</style>
