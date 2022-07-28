import { defineStore } from "pinia";
import axios from "axios";

export const useTrendingCoinsStore = defineStore("trendingCoins", {
  state: () => {
    return {
      trendingCoins: [],
    };
  },
  getters: {
    allTrendingCoins: (state) => state.trendingCoins,
  },
  actions: {
    async fetchTrendingCoins(currency = "usd") {
      const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

      try {
        const response = await axios.get(URL, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        const { data } = response;

        this.trendingCoins = data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
