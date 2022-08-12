<template class="test">
  <div>
    <Line ref="line" :chart-options="state.chartOptions" :chart-data="state.chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" class="chart-wrapper" />
    <div class="buttons__chart">
      <a @click="$router.go(-1)">Back</a>
      <!-- NOTE: je vais les rajouter une fois que je peux mettre à jour le chart -->
      <!-- <button @click="fetchDailyData">24 Hours</button> -->
      <!-- <button @click="fetchMonthlyData">30 Days</button>
      <button @click="fetchQuarterlyData">3 Months</button>
      <button @click="fetchAnnualData">1 YEar</button> -->
    </div>
  </div>
</template>

<script setup>
/**
 * NOTE: this chart component is more or less a composition API code translation of this code here:
 * https://codesandbox.io/s/unruffled-forest-ojxcbb?file=/src/components/Line.vue
 */
import { reactive, onMounted, toRef } from "vue";
import { Line } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement } from "chart.js";
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const props = defineProps({
  // NOTE: props defined by chartjs
  chartId: {
    type: String,
    default: "line-chart",
  },
  datasetIdKey: {
    type: String,
    default: "label",
  },
  width: {
    type: Number,
    default: 400,
  },
  height: {
    type: Number,
    default: 400,
  },
  cssClasses: {
    default: "",
    type: String,
  },
  styles: {
    type: Object,
    default: () => {},
  },
  plugins: {
    type: Array,
    default: () => [],
  },
  // NOTE: props defined by me
  id: {
    type: String,
  },
  days: {
    type: Number,
    default: 365,
  },
  currency: {
    type: String,
    default: "usd",
  },
  coinData: {
    type: Object,
    required: true,
  },
});

console.log(props);
console.log(props.id);

const state = reactive({
  chartData: {},
  chartOptions: {},
  prices: [],
  // NEW: sera notre chart Instance
  line: {},
});

const prix = toRef(state, "prices");
//NEWNOTE: changing our reactive value to a ref
const line = toRef(state, "line");

// NOTE: chart instance pour mettre a jour notre chart
// const chartInstance = this.$refs.line.chart;

/**
 * NOTE: voici les fonctions que je vais utiliser pour mettre à jour le chart une fois que je saurais le faire
 */

const fetchCoinPrices = async (coinID, currency, time) => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=${currency}&days=${time}`);
  const { prices } = await response.json(); // destructuring ce dont on a besoin: juste le tableau de prices. on n'a pas besoin d'autre chose
  return prices;
};

const fetchDailyData = async () => {
  console.log("button clicked");
  prix.value = await fetchCoinPrices(props.id, props.currency, 1);
  line.value.updateChart();
  console.log(prix.value);
};

const fetchMonthlyData = async () => {
  console.log("button clicked");
  prix.value = await fetchCoinPrices(props.id, props.currency, 30);
  console.log(prix.value);
};

onMounted(async () => {
  console.log(line);
  console.log(line.value);
  console.log({ ...line.value });

  prix.value = await fetchCoinPrices(props.id, props.currency, props.days);

  const xAxisLabels = prix.value.map((currentPrice) => {
    let date = new Date(currentPrice[0]);
    let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` : `${date.getHours()}:${date.getMinutes()} AM`;
    return props.days === 1 ? time : date.toLocaleDateString();
  });

  const yAxisLabels = prix.value.map((currentPrice) => {
    return currentPrice[1];
  });

  state.chartData = {
    labels: xAxisLabels,
    datasets: [
      {
        label: `Price Flow`,
        backgroundColor: "gold",
        borderColor: "gold",
        data: yAxisLabels,
      },
    ],
  };

  state.chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // NOTE: changing legend colour: thank you: https://stackoverflow.com/questions/67893757/in-chartjs-how-do-i-change-the-color-of-a-label-in-the-legend
    plugins: {
      legend: {
        labels: {
          color: "gold",
          font: {
            size: 16, //NOTE: changing legend font size: https://www.chartjs.org/docs/master/general/fonts.html
          },
        },
      },
    },

    //NOTE: changing colour of labels: thank you: https://masteringjs.io/tutorials/chartjs/axis-label-color
    scales: {
      x: {
        title: {
          display: true,
          text: "Dates (Times)",
          color: "gold",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          color: "gold",
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Price in $",
          color: "gold",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          font: {
            size: 14,
          },
          color: "gold",
        },
      },
    },
    elements: {
      point: {
        radius: 1,
      },
    },
  };
});
</script>

<style lang="scss" scoped>
.chart-wrapper {
  width: 100%;
  height: 65vh;
}

h6 {
  color: gold;
}

.buttons__chart {
  margin: 0 auto;
  margin-top: 7rem;
  width: 40%;
  // NOTE: j'ai pas décidé si je veux ajouter ces styles ou pas
  // display: flex;
  // justify-content: center;

  button {
    border: none;
  }
  & > * {
    @include mixins.primaryBtnStyles(variables.$colour-primary, variables.$colour-secondary);
    flex-grow: 1;
    flex-shrink: 0;
    margin-right: 3rem;
    font-weight: 800;
    cursor: pointer;

    &:not(a) {
      font-size: 1.6rem;
    }
  }
}
</style>