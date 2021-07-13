<template>
  <div class="paragraph">
    <h3 v-if="config.settings.name">{{config.settings.name}}</h3>
    <p v-html="config.text"></p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FinderConfig } from "../../../Finder/Finder.config";
import { ParagraphConfig } from "./Paragraph.config";

@Component({
  name: "Paragraph",
  components: {},
})
export default class Paragraph extends Vue {
  @Prop() private config!: ParagraphConfig;
  @Prop() public root!: FinderConfig;
}
</script>

<style scoped lang="scss">
</style>
