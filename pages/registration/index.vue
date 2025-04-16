<template>
  <div class="registration l-wrap">
    <div class="registration__title">
      Регистрация
    </div>
    <RegistrationForm />
  </div>
</template>

<script>
import RegistrationForm from '@/components/forms/RegistrationForm';
export default {
  name: 'Registrarion',
  layout: 'index',
  components: {
    RegistrationForm,
  },
}
</script>

<style lang="scss" scoped>
  .registration {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 75px 0;
    position: relative;
    min-height: 76vh;
    
    &__title {
      color: $mainThirdColor;
      font-size: $g-second-title-size;
      font-weight: 500;
      padding-bottom: 25px;
    }
  }
</style>
