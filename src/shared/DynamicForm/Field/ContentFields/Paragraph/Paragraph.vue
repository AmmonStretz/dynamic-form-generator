<template>
  <div class="paragraph">
    <h3 v-if="config.settings.name">{{config.settings.name}}</h3>
    <p v-html="config.text"></p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
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
