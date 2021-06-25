<template>
  <p class="paragraph">
    {{config.text}}
  </p>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { FinderConfig } from "../../../Finder/Finder.config";
import { ParagraphFieldConfig } from "./Paragraph.config";
// Vue.component('FieldComponent')
@Component({
  name: "FieldComponent",
  components: {},
})
export default class ParagraphFieldComponent extends Vue {
  @Prop() private config!: ParagraphFieldConfig;
  @Prop() public root!: FinderConfig;
}
</script>

<style scoped lang="scss">
</style>
