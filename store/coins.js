import { defineStore } from "pinia";
import axios from "axios";

export const useCoinsStore = defineStore("coins", {
  state: () => {
    return {
      coins: [],
    };
  },
  getters: {
    allCoins: (state) => state.coins,
  },
  actions: {
    async fetchAllCoins(currency = "usd") {
      const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

      try {
        const response = await axios.get(URL, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        const { data } = response;

        this.coins = data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
