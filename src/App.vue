<template>
  <div id="app">
    <router-view/>
    <nav id="nav">
      <router-link to="/">Finder</router-link> |
      <router-link to="/editor">Editor</router-link>
    </nav>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component  
export default class App extends Vue {
  $store: any;
  constructor() {
    super();
    this.$store.commit("loadConfig");
  }
}
  </script>

<style lang="scss">
@import './styles/index.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
