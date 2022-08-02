<template>
  <div class="display">
    <h1>CryptoDex</h1>
    <h3 class="display__subtitle">Get All Information Regarding Your Favourite Crypto Currency</h3>
    <div class="display__carousel">
      <!-- <Vue3Marquee>
        <span v-for="(word, index) in ['hi', 'yo', 'salut', 'nihao']" :key="index" class="word-style" :class="{ word: true, odd: index % 2 === 0, even: index % 2 === 1 }">
          {{ word }}
        </span>
      </Vue3Marquee> -->
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
img {
  width: 15rem;
  height: 15rem;
  margin: 0 3rem;
}

h3 {
  font-weight: normal;
  font-style: italic;
}
.display {
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;
  align-items: center;
  padding-top: 2.5rem;
  width: 100%;
  height: 80vh;
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
</style>