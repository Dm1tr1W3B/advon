<template>
  <div class="social">
    <NuxtLink to="/">
    <Facebook />
    </NuxtLink>
    <NuxtLink to="/">
      <Vk />
    </NuxtLink>
    <NuxtLink to="/">
      <span class="social__svg-istagram">
        <Instagram />
      </span>
    </NuxtLink>
    <NuxtLink to="/">
      <Twiter />
    </NuxtLink>
    <NuxtLink to="/">
      <Odnoclasniki />
    </NuxtLink>
  </div>
</template>

<script>
import Facebook from "@/assets/images/social/facebook.svg?inline";
import Vk from "@/assets/images/social/vk.svg?inline";
import Instagram from "@/assets/images/social/instagram.svg?inline";
import Twiter from "@/assets/images/social/twiter.svg?inline";
import Odnoclasniki from "@/assets/images/social/odnoclasniki.svg?inline";

export default {
  name: "SocialLink",
  components: {
    Facebook,
    Vk,
    Instagram,
    Twiter,
    Odnoclasniki,
  },
}
</script>

<style lang="scss" scoped>
  .social {
    svg {
    width: 36px;
    height: 36px;
  }
  }
</style>
