<template>
  <div class="child">
    <h2>Outer: {{status.outerValue+''}}</h2>
    <input type="number" v-model="value" @change="statusChange(status)"/>
    <Grandchild :status="childStatus" @statusChange="statusChange"/>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import Grandchild from './GrandChild.vue';

@Component({
  components: {
    Grandchild
  },
})
export default class Child extends Vue {
  @Prop() status!: {value: number, outerValue: number, valid: boolean};
  value: number = null;

  get childStatus() {
    return {value: this.status.value, valid: this.status.valid}
  }
  mounted() {
    this.value = this.status.outerValue;
  }

  @Emit('statusChange')
  statusChange(status: {value: number, outerValue: number, valid: boolean}) {
    return {value: status.value, outerValue: this.value, valid: status.valid};
  }
}
</script>

<style scoped lang="scss">
</style>
