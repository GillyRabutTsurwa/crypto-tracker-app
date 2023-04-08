<template>
  <!-- NOTE: input event est bien transporté de l'enfant au parent (ici) -->
  <!-- maintenant, me faut que mettre a jour le tableau des monnaies -->
  <Search @testEvent="logKey($event)" />
  <div class="coins-table">
    <div class="table-titles">
      <p v-for="(currentTitle, index) in state.tableTitles" :key="index">
        {{ currentTitle }}
      </p>
    </div>
    <div class="coins-list">
      <Sarafu v-for="currentCoin in store.coins" :key="currentCoin.id" :coinData="currentCoin" />
      <!-- <Sarafu v-for="currentCoin in store.filteredCoins" :key="currentCoin.id" :coinData="currentCoin" /> -->
    </div>
  </div>
</template>

<script setup>
import Search from "./Search.vue";
import Sarafu from "./Sarafu.vue";
import { ref, reactive, onMounted, toRef, computed, onUpdated } from "vue";
import { useCoinsStore } from "../store/coins";

const store = useCoinsStore();
console.log(store);
console.log(store);

store.fetchAllCoins();
console.log(store.allCoins);

const state = reactive({
  tableTitles: ["Coin", "Price", "24h Change", "Market Cap"],
  // nouvelle donné qui va traquer nos coins par apport à notre "input" au forme
  coins: [],
  filteredCoins: [],
});

const logKey = (evt) => {
  // store.$patch({
  //   coins: coins.value.filter((currentCoin) => currentCoin.name.toLowerCase().includes(evt)),
  // });
  store.$patch((state) => {
    state.coins = state.coins.filter((currentCoin) => {
      // NOTE: form can accept coin name or coin abbreviation
      const listCriteria = currentCoin.name.toLowerCase().includes(evt) || currentCoin.symbol.toLowerCase().includes(evt);
      return listCriteria;
    });
  });
  console.log(evt);
  console.log(store.coins);

  // if (evt === "") return store.allCoins;

  // store.coins = store.coins.filter((currentCoin) => {
  //   currentCoin.name.toLowerCase().includes(evt);
  // });
  console.log(store.coins);
};
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