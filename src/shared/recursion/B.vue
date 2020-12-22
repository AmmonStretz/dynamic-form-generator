<template>
  <div class="b">
    B<br>
    <div v-if="i>0">
    <A v-bind:i="i-1"></A>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import A from "./A.vue";
@Component({
  // name: 'A',
  components: {
    A
  },
})
export default class B extends Vue {
  @Prop() i!: number;
}
</script>

<style scoped lang="scss">
</style>
