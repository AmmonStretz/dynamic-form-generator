<template>
  <div class="child">
    <h2>Inner: {{status.value+''}}</h2>
    <input type="number" v-model="value" @change="statusChange"/>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Grandchild extends Vue {
  @Prop() status!: {value: number, valid: boolean};
  value: number = null;
  mounted() {
    this.value = this.status.value;
  }
  @Emit('statusChange')
  statusChange() {
    console.log('change');
    
    return { value: this.value, valid: this.status.valid};
  }
}
</script>

<style scoped lang="scss">
</style>
