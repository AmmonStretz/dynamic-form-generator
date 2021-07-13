<template>
  <div class="home">
    <!-- <Child :status="status"  @statusChange="statusChange"/> -->
    <FinderComponent
      v-if="!!config"
      v-bind:config="config"
      v-on:submit="submit"
      v-on:cancel="cancel"
    ></FinderComponent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FinderConfig, FinderStatus } from "../shared/DynamicForm/Finder/Finder.config";
// import { JsonParser } from "@/shared/DynamicForm/parser";
import FinderComponent from "../shared/DynamicForm/Finder/Finder.vue";
import Child from './Child.vue';

@Component({
  components: {
    FinderComponent,
    Child
  },
})
export default class Home extends Vue {
  public status: {value: number, outerValue: number, valid: boolean} = {value: 0, outerValue: 100, valid: false};
  statusChange(status: {value: number, outerValue: number, valid: boolean}) {
    this.status = status;
  }
  mounted(){
    console.log(0, this.status);
    
  }

  public $store: any;
  get config(): FinderConfig{
    return this.$store.getters.config;
  }
  constructor() {
    super();
    let c = this.config;
    c.createStatus();
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
