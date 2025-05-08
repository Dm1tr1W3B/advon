<template>
  <div class="container home-page">
    <Home />
  </div>
</template>

<script>
import Home from '@/components/sections/user-sections/Home.vue';

export default {
  data() {
    return {
    }
  },
  components: {
    Home,
  },
  methods: {
  }
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 80vh;
}

.title {
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
