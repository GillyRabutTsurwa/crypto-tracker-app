<template>
  <div class="coins-table">
    <div class="table-titles">
      <p v-for="(currentTitle, index) in state.tableTitles" :key="index">
        {{ currentTitle }}
      </p>
    </div>
    <div class="coins-list">
      <Sarafu v-for="currentCoin in store.allCoins" :key="currentCoin.id" :coinData="currentCoin" />
    </div>
  </div>
</template>

<script setup>
import Sarafu from "./Sarafu.vue";
import { ref, reactive, toRefs, computed } from "vue";
// import { useCoinsStore } from "~~/store/coins";
import { useCoinsStore } from "../store/coins";

const store = useCoinsStore();
console.log(store);

store.fetchAllCoins();

const state = reactive({
  tableTitles: ["Coin", "Price", "24h Change", "Market Cap"],
});
</script>

<style lang="scss" scoped>
.coins-table {
  color: azure;
}

.table-titles {
  width: 75%;
  // height: 5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;

  margin: 0 auto;
  padding: 2.5rem;
  background-color: gold;
  color: #333;
  font-weight: bold;

  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
}

.coins-list {
  width: 75%;
  display: grid;
  margin: 0 auto;
  grid-template-rows: 9rem;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);

  // row-gap: 4rem;
}
.coin-selection {
  // display: flex;
  // justify-content: space-around;
  // align-items: center;
}
</style>