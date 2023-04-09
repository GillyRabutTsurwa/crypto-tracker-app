<script setup>
import LineChart from "@/components/LineChart.vue";
import { onMounted, reactive, ref, toRefs, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
console.log(route);
const coinID = ref(route.params.id); // i do this because i get a warning that a watch value must be a ref, reactive, etc

const state = reactive({
  coinData: {},
});
const coin = toRefs(state);

/**
 *
 * @param {*} text = text we're triming
 * @param {*} symbol = after the occurence of this symbol, we're trimming the rest of the text
 */
function firstSentenceOnly(text, symbol) {
  return `${text.split(symbol)[0]}.`; // NOTE: add the fullstop at the end. this helper function doesn't include it
}

/**
 * IMPORTANT très IMPORTANT
 * this is a very important function that fixed my problem of not being able to render my object properties to the template
 * i had a problem accessing deeply properties deeply nested within multiple objects
 * i tried mixing the "dot" syntaxe with the "brackets" syntaxe for accessing object properties. didn't work
 * I tried using JSON.parse() because I thought it had something to do with it. didn't work
 * what DID work was using the code from this thread, which i will paste in the line below:
 * https://stackoverflow.com/questions/4255472/javascript-object-access-variable-property-by-name-as-string
 * i will also paste the jsfiddle, here
 * http://jsfiddle.net/amofb8xa/5/
 * IMPORTANTNOTE:
 * this function finds if a property exists in an object (regardless of how deeply nested it is) and returns its corresponding value
 * the function takes in 2 arguments:
 * the first one is the object in question
 * the second one is the property we are looking for within the object
 *
 * @param {*} obj
 * @param {*} prop
 *
 * i am then using this function to get the properties i need from my coin object, and putting them into their respective computed values
 * this function is very useful in working with API data with complicated object structures
 */
function fetchFromObject(obj, prop) {
  //property not found
  if (typeof obj === "undefined") return false;

  //index of next property split
  var _index = prop.indexOf(".");

  //property split found; recursive call
  if (_index > -1) {
    //get object at property (before split), pass on remainder
    return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
  }

  //no split; get property
  return obj[prop];
}

onMounted(async () => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinID.value}`);
  const data = await response.json();

  state.coinData = data;
  console.log(coin);
  console.log(coin.coinData);
  console.log(coin.coinData.value.image.large);
});

const image = computed(() => {
  return fetchFromObject(coin.coinData.value, "image.large");
});
const description = computed(() => {
  let text = fetchFromObject(coin.coinData.value, "description.en");
  // if (coinID.value === "ethereum") return `${text.toString().split(",")[0]}.`; //NOTE: i do this because ethereum's description is one long run-on sentence
  return text.toString().substring(0, 500) + "...";
});
const currentPrice = computed(() => {
  return fetchFromObject(coin.coinData.value, "market_data.current_price.usd"); //NOTE: usd sera bientôt dynamique
});
const rank = computed(() => {
  return coin.coinData.value.market_cap_rank; //NOTE; pas de soucis, car ce prop n'est pas nested. donc faut pas utiliser la fonction
});
const marketCap = computed(() => {
  return fetchFromObject(coin.coinData.value, "market_data.market_cap.usd"); //NOTE; ici aussi, usd sera dynamique
});
</script>

<template>
  <div class="coin-page-container">
    <div class="coin-about">
      <div class="coin-about__img">
        <img :src="image" :alt="coin.coinData.value.name">
      </div>
      <h4>{{ coin.coinData.value.name }}</h4>
      <p v-html="description" class="description"></p>
      <!-- <p v-html="coin.coinData.description.en" class="description"></p> -->
      <ul class="coin-about__list">
        <li class="coin-about__list__item">
          <span>Rank: </span><span>{{ rank }}</span>
        </li>
        <li class="coin-about__list__item">
          <span>Current Price: </span>{{ currentPrice }}<span></span>
        </li>
        <li class="coin-about__list__item">
          <span>Market Cap: </span>{{ marketCap }}<span></span>
        </li>
      </ul>
    </div>
    <div class="coin-chart">
      <LineChart :id="$route.params.id" :coinData="coin.coinData.value" />
    </div>
  </div>
</template>



<style lang="scss" scoped>
.coin-page-container {
  display: grid;
  grid-template-columns: 30% 1fr;
  justify-content: space-around;
  color: #fff;
  padding: 2rem 4rem;
}

img {
  height: 20rem;
}

h4 {
  font-weight: bolder;
  font-size: 6rem;
}

// NEWIMPORTANT: finally learnt how to style the links inside v-html text: 
:deep(.description a) {
  color: gold;
  font-weight: bold;
  font-style: italic;
}

.description {
  width: 80%;
  text-align: justify;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0.00938em;

  // NOTE: voici les liens dedans le text modifié par v-html. au moment, ce code marche pas
  a {
    color: unset;

    &:link,
    &:visited {
      color: gold;
    }

    &:hover,
    &:active {
      text-transform: uppercase;
    }
  }
}

ul {
  list-style: none;
  margin-top: 4rem;
  text-align: left;

  li {
    font-size: 3rem;
    margin-bottom: 2rem;

    span {
      &:first-of-type {
        font-weight: bold;
        margin-right: 1rem;
      }
    }
  }
}
</style>




