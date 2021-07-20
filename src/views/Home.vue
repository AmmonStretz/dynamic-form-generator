<template>
  <div class="home">
    <!-- <Child :status="status"  @statusChange="statusChange"/> -->
    <Finder
      v-if="!!config"
      v-bind:config="config"
      v-on:submit="submit"
      v-on:cancel="cancel"
    ></Finder>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FinderConfig, FinderStatus } from "../shared/DynamicForm/Finder/Finder.config";
// import { JsonParser } from "@/shared/DynamicForm/parser";
import Finder from "../shared/DynamicForm/Finder/Finder.vue";
import Child from './Child.vue';

@Component({
  components: {
    Finder,
    Child
  },
})
export default class Home extends Vue {
  public status: {value: number, outerValue: number, valid: boolean} = {value: 0, outerValue: 100, valid: false};
  statusChange(status: {value: number, outerValue: number, valid: boolean}) {
    this.status = status;
  }

  public $store: any;
  get config(): FinderConfig{
    return this.$store.getters.config;
  }
  constructor() {
    super();
    let c = this.config;
    c.createStatus(true);
    this.$store.commit("updateConfig", c);
  }
  
  cancel() {
    console.log('cancel');
    
  }
  submit(status: FinderStatus) {
    console.log('submit', status);
  }
}
</script>

<style scoped lang="scss">
</style>
