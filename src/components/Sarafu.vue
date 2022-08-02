<template>
  <RouterLink :to="`/coins/${currentCoin.id}`" class="coin__link">
    <div class="coins-list__coin">
      <div class="column-1">
        <img :src="currentCoin.image" alt="currentCoin.id" class="column-1__img">
        <div class="column-1__text">
          <p class="column-1__text--acronym">{{ currentCoin.symbol.toUpperCase() }}</p>
          <p class="column-1__text--name">{{ currentCoin.name }}</p>
        </div>
      </div>
      <div class="column-2">
        <span>{{ numberWithCommas(currentCoin.current_price) }}</span>
      </div>
      <div class="column-3">
        <span :class="redOrGreen">{{ currentCoin.price_change_percentage_24h.toFixed(2) }}%</span>
      </div>
      <div class="column-4">
        <span>{{ numberWithCommas(currentCoin.market_cap) }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  coinData: {
    type: Object,
    required: true,
  },
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const currentCoin = props.coinData;

// NOTE: render green or red color for percentage
const redOrGreen = computed(() => {
  return {
    rouge: currentCoin.price_change_percentage_24h < 0,
    vert: currentCoin.price_change_percentage_24h > 0,
  };
});
</script>

<style lang="scss" scoped>
// NOTE: dynamic classes
.rouge {
  color: rgb(236, 67, 67);
}
.vert {
  color: rgb(103, 255, 103);
}
a {
  all: unset; // enelver tout le style de defaut des liens
}

.coin {
  &__link {
    display: block;
    height: 100%;
    // margin: 0 3rem;
  }
}

.coins-list {
  // NOTE: actual selector styles in parent component. this is styling child elements only

  &__coin {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: center;
    align-items: center;
    padding: 1.6rem 0;
    border-bottom: 1px solid lightgray;
    cursor: pointer;

    &:hover,
    &:active {
      background-color: #111;
    }

    img {
      // // width: 6rem;
      // height: 6rem;
      // margin-left: 2rem;
    }

    .column-1 {
      display: flex;
      align-items: center;

      &__img {
        display: inline-block;
        height: 6rem; //NOTE: la largeur se gere automatiquement
        margin-left: 2rem;
      }

      &__text {
        margin-left: 1rem;
        text-align: left;

        &--acronym {
          font-weight: 800;
        }

        &--name {
          font-size: 1.35rem;
        }
      }
    }
  }
}
</style>