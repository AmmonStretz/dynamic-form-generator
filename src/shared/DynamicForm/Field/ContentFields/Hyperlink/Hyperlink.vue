<template>
  <div class="link-list">
    <a v-for="(link, index) of config.links" :key="index" class="link" :href="'//' + link.url">
      {{ link.text }}
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { FinderConfig } from "../../../Finder/Finder.config";
import { HyperlinkFieldConfig } from "./Hyperlink.config";

@Component({
  name: "HyperlinkField",
})
export default class HyperlinkField extends Vue {
  @Prop() public config!: HyperlinkFieldConfig;
  @Prop() public root!: FinderConfig;
}
</script>

<style scoped lang="scss">
</style>
