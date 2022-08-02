<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <Header />
  <router-view />
</template>

<script setup>
import Header from "@/components/Header.vue";
</script>

<style lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
  // quand je verifie que je n'ai pas besoin de ces deux styles, je vais les debarasser
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
