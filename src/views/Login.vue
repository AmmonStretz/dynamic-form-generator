<template>
  <div class="login">
    <form>
      <input type="text" v-model="loginData.name" />
      <input type="password" v-model="loginData.password" />
      <button type="button" v-on:click="login()">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {},
})
export default class Login extends Vue {
  public loginData = { password: '', name: '' };
  public login() {
    console.log(this.loginData);
    axios.get('')
  }
}
</script>

<style scoped lang="scss">
</style>
