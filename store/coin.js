import { defineStore } from "pinia";
import axios from "axios";

export const useCoinStore = defineStore("coin", {
  state: () => {
    return {
      coin: {},
    };
  },
  getters: {
    prices: (state) => state.coin.prices,
  },
  actions: {
    async fetchCoin(id, currency = "usd", days = 365) {
      const URL = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

      try {
        const response = await axios.get(URL, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        const { data } = response;

        this.coin = data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
