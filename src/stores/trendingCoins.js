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
                const response = await fetch(URL);
                const api_data = await response.json();
                this.trendingCoins = api_data;
            } catch (error) {
                console.log(error);
            }
        },
    },
});
