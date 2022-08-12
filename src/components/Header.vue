<template>
  <header :class="dynamicMargin" class="header">
    <div class="header__content">
      <h2 class="header__content--title">
        <RouterLink to="/">CryptoDex</RouterLink>
      </h2>
      <!-- NOTE: je vais le remettre apres avoir ajouté leur fonctionalités -->
      <!-- <nav class="header__content--nav">
        <span class="custom-dropdown">
          <select>
            <option>USD</option>
            <option>KSH</option>
          </select>
        </span>
        <a href="#" rel="noopener noreferrer" class="header__content--nav-login">Login</a>
      </nav> -->
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route.path);

const dynamicMargin = computed(() => {
  return {
    noMginBottom: route.path === "/",
  };
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.square {
  width: 0.7em;
  height: 0.7em;
  margin: 0.5em;
  display: inline-block;
}

/* Custom dropdown */
.custom-dropdown {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin: 10px; /* demo only */
}

.custom-dropdown select {
  // background-color: #1abc9c;
  background-color: gold;
  color: #333;
  font-size: inherit;
  padding: 1rem;
  border: 0;
  margin: 0;
  border-radius: 3px;
  text-indent: 0.01px;
  text-overflow: "";
  -webkit-appearance: button; /* hide default arrow in chrome OSX */
}

.custom-dropdown::before,
.custom-dropdown::after {
  content: "";
  position: absolute;
  pointer-events: none;
}

// .custom-dropdown::after {
//   /*  Custom dropdown arrow */
//   content: "\25BC";
//   height: 1em;
//   font-size: 0.625em;
//   line-height: 1;
//   right: 1.2em;
//   top: 50%;
//   margin-top: -0.5em;
// }

.custom-dropdown::before {
  /*  Custom dropdown arrow cover */
  width: 2em;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 0 3px 3px 0;
  margin-right: 2rem;
}

// =======
.header {
  width: 100%;
  height: 6.5rem;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  margin-bottom: 4rem;
  background-color: variables.$colour-primary;

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    height: 100%;
    margin: 0 auto;

    &--title {
      color: variables.$colour-secondary;

      a {
        all: unset; //NOTE: Love this piece of code
        cursor: pointer;
      }
    }

    &--nav {
      &-login {
        &:link,
        &:visited {
          @include mixins.primaryBtnStyles(variables.$colour-primary, variables.$colour-secondary);
        }
        // NOTE: will find out what i want to do with hover/active states
        // &:hover,
        // &:active {
        //   background-color: #333;
        //   color: gold;
        // }
      }
    }
  }
}

// class dynamique. un nom plus approprié a venir plus tard
.noMginBottom {
  margin-bottom: 0;
}
</style>