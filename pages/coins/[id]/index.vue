<template>
  <div class="coin-page-container">
    <div class="coin-about">
      <div class="coin-about__img">
        <img :src="state.coinData.image.large" alt="state.coinData.name">
      </div>
      <h4>{{ state.coinData.name }}</h4>
      <p v-html="state.coinData.description.en.split('. ')[0]"></p>
      <ul class="coin-about__list">
        <li class="coin-about__list__item">
          <span>Rank: </span><span>{{state.coinData.market_cap_rank}}</span>
        </li>
        <li class="coin-about__list__item">
          <span>Current Price: </span><span></span>
        </li>
        <li class="coin-about__list__item">
          <span>Market Cap: </span><span></span>
        </li>
      </ul>
    </div>
    <div class="coin-chart">
      <LineChart :id="$route.params.id" :coinData="state.coinData" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const route = useRoute();
console.log(route);
const coinID = ref(route.params.id); // i do this because i get a warning that a watch value must be a ref, reactive, etc

const state = reactive({
  coinData: {},
});

const response = await useAsyncData("coin", () => $fetch(`https://api.coingecko.com/api/v3/coins/${coinID.value}`));
const { data } = response;

state.coinData = data;

/**
 *
 * @param {*} text = text we're triming
 * @param {*} symbol = after the occurence of this symbol, we're trimming the rest of the text
 */
function firstSentenceOnly(text, symbol) {
  return `${text.split(symbol)[0]}.`; // NOTE: add the fullstop at the end. this helper function doesn't include it
}
</script>

<style lang="scss" scoped>
.coin-page-container {
  display: grid;
  grid-template-columns: 30% 1fr;
  justify-content: space-around;
  color: #fff;
  padding: 2rem 4rem;
}
</style>