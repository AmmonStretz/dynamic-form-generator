<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Finder</router-link> |
      <router-link to="/editor">Editor</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component  
export default class App extends Vue {
  constructor() {
    super();
    this.$store.commit("loadConfig");
  }
}
  </script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  position: absolute;
  padding: 10px;
  top: 0;
  left: 0;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
