<template class="test">
  <div>
    <h6 v-if="pending">
      Fetching Coin Data
    </h6>
    <Line :chart-options="state.chartOptions" :chart-data="state.chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" class="chart-wrapper" />
  </div>
</template>

<script setup>
// NOTE: this chart component is more or less a composition API code translation of this code here:
// https://codesandbox.io/s/unruffled-forest-ojxcbb?file=/src/components/Line.vue
import { reactive, watch } from "vue";
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

const state = reactive({
  chartData: {},
  chartOptions: {},
  prices: [],
});

useHead({
  title: props.coinData.name, //will destructure later
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: props.coinData.image.thumb,
    },
  ],
});

// // Making the x AND Y axis labels for the chart
// const xAxisLabels = state.prices.map((currentPrice) => {
//   // this array contient un autre tableau avec deux chiffres
//   // premier signifier la date, deuxieme pour le prix
//   let date = new Date(currentPrice[0]);
//   // NOTE; formatting time to AM/PM format
//   let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` : `${date.getHours()}:${date.getMinutes()} AM`;
//   return days === 1 ? time : date.toLocaleDateString();
// });

// const yAxisLabels = state.prices.map((currentPrice) => {
//   return currentPrice[1];
// });

// state.chartData = {
//   // labels: ["January", "February", "March", "April", "May", "June", "July"],
//   labels: state.prices.map((currentPrice) => {
//     let date = new Date(currentPrice[0]);
//     let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` : `${date.getHours()}:${date.getMinutes()} AM`;
//     return props.days === 1 ? time : date.toLocaleDateString();
//   }),
//   datasets: [
//     {
//       label: "Data One",
//       backgroundColor: "gold",
//       borderColor: "gold",
//       // data: [40, 39, 10, 40, 39, 80, 40],
//       data: yAxisLabels,
//     },
//   ],
// };

// state.chartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
// };

const response = await useLazyFetch(
  `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=${props.currency}&days=${props.days}`
);
const { data, pending } = response;
const { prices } = data.value; //IMPORTANTNOTE: data c'est un ref donc pour obtenir notre data, faut ajouter .value
state.prices = prices;
console.log(state.prices);

onMounted(() => {
  const yAxisLabels = state.prices.map((currentPrice) => {
    return currentPrice[1];
  });

  state.chartData = {
    // labels: ["January", "February", "March", "April", "May", "June", "July"],
    labels: state.prices.map((currentPrice) => {
      let date = new Date(currentPrice[0]);
      let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` : `${date.getHours()}:${date.getMinutes()} AM`;
      return props.days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `Price of ${props.coinData.name} in a Year`,
        backgroundColor: "gold",
        borderColor: "gold",
        // data: [40, 39, 10, 40, 39, 80, 40],
        data: yAxisLabels,
      },
    ],
  };

  state.chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
});
// data() {
//   return {
//     chartData: {
//       labels: ["January", "February", "March", "April", "May", "June", "July"],
//       datasets: [
//         {
//           label: "Data One",
//           backgroundColor: "gold",
//           borderColor: "gold",
//           data: [40, 39, 10, 40, 39, 80, 40],
//         },
//       ],
//     },
//     chartOptions: {
//       responsive: true,
//       maintainAspectRatio: false,
//     },
//   };
// },
</script>

<style lang="scss" scoped>
.chart-wrapper {
  width: 100%;
  height: 70vh;
}

h6 {
  color: gold;
}
</style>