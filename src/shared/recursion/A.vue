<template>
  <div class="a">
    A<br>
    <div v-if="i>0">
    <C v-for="(field, index) in [0,0]"
      :key="index" v-bind:i="i-1"></C>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import C from './B.vue'

@Component({
  // name: 'A',
  components: {
    C
  },
})
export default class A extends Vue {
  @Prop() i!: number;
}
</script>

<style scoped lang="scss">
</style>
