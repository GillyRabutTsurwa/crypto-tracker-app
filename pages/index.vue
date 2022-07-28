<template>
  <div class="home">
    <Banner />
    <NuxtLink to="/coins">All Coins</NuxtLink>
  </div>
</template>

<script>
import Banner from "@/components/Banner.vue";
import Coins from "@/components/Coins.vue";

export default {
  name: "Home",
  components: {
    Banner: Banner,
    Coins: Coins,
  },
};
</script>
