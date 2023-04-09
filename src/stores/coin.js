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
            console.log(URL);

            try {
                const response = await fetch(URL);
                const api_data = await response.json();
                this.coin = api_data;
            } catch (error) {
                console.log(error);
            }
        },
    },
});
