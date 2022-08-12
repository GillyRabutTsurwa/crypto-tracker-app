<template>
  <div class="display">
    <h1>CryptoDex</h1>
    <h3 class="display__subtitle">Get All Information Regarding Your Favourite Crypto Currency</h3>
    <h4 class="display__subtitle--trending">List of Trending Coins</h4>
    <div class="display__carousel">
      <Vue3Marquee :pauseOnHover="true" id="marquee">
        <div v-for="currentCoin in store.allTrendingCoins" :key="currentCoin.id">
          <img :src="currentCoin.image" :alt="currentCoin.id">
          <p>
            <span>
              {{currentCoin.symbol}}
            </span>
            &nbsp;
            <span>{{currentCoin.price_change_percentage_24h_in_currency > 0 ? "+" : ""}}</span>
            <span> {{currentCoin.price_change_percentage_24h_in_currency.toFixed(2)}}% </span>
          </p>
        </div>
      </Vue3Marquee>
    </div>
    <div class="buttons">
      <a href="https://github.com/GillyRabutTsurwa/crypto-tracker-app" class="buttons__main" target="__blank" noopener noreferrer>
        <i class="devicon-github-original"></i>
        <span>GitHub</span>
      </a>
      <RouterLink to="/coins" class="buttons__main">
        <i class="fas fa-coins"></i>
        <span>All Coins</span>
      </RouterLink>
      <a href="https://www.linkedin.com/in/gilberttsurwa" class="buttons__main" target="__blank" noopener noreferrer>
        <i class="devicon-linkedin-plain"></i>
        <span>LinkedIn</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, computed } from "vue";
import { useTrendingCoinsStore } from "../store/trendingCoins";
const store = useTrendingCoinsStore();
store.fetchTrendingCoins();
console.log(store.allTrendingCoins);
</script>

<style lang="scss" scoped>
// TESTING
h1 {
  color: variables.$colour-primary;
}
img {
  width: 15rem;
  height: 15rem;
  margin: 0 3rem;
}

h3 {
  font-weight: normal;
  font-style: italic;
}

h4 {
  margin-top: 6rem;
  font-size: 3.5rem;
}

.display {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-top: 2.5rem;
  width: 100%;
  height: calc(100vh - 6.5rem); //NOTE: 6.5rem = le longeur de Header. le resultat c'est aucun defilement. comme voulu. OK
  overflow: hidden;
  background-image: url(../assets/top-banner.jpg);
  color: azure;

  &__carousel {
    width: 100%; //NOTE: this make things work perfectly. always define the width of the marquee parent
    margin-top: 8.5rem;
  }
}

#marquee {
  display: flex;
}

// ==================

.word {
  font-size: 30px;
  margin: 0 10px;
}
.odd {
  color: rgb(68, 77, 84);
}
.even {
  color: rgb(137, 147, 156);
}

.buttons {
  margin-top: auto;
  margin-bottom: 20rem;
  display: flex;
  width: 30%;
  justify-content: space-evenly;
}
// TESTING
.buttons__main {
  @include mixins.primaryBtnStyles(variables.$colour-primary, variables.$colour-secondary);
  font-weight: 800;

  i {
    margin-right: 0.5rem;
    font-size: 1.75rem;
  }
}
</style>